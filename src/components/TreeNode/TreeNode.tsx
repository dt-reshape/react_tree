import React, { useState, useCallback } from 'react';
import { TreeNode as TreeNodeType } from '../../types';
import { IconButton } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditNodeDialog from '../EditNodeDialog/EditNodeDialog';
import DeleteNodeDialog from '../DeleteNodeDialog/DeleteNodeDialog';
import AddNodeDialog from '../AddNodeDialog/AddNodeDialog';
import './TreeNode.scss';

interface TreeNodeProps {
  node: TreeNodeType;
  selectedNodeId: number | null;
  onSelect: (id: number) => void;
  onAddNode: (parentId: number, newName: string) => void;
  onUpdateNode: (id: number, newName: string) => void;
  onRemoveNode: (id: number) => void;
  expandedNodes: Set<number>;
  setExpandedNodes: React.Dispatch<React.SetStateAction<Set<number>>>;
}

const TreeNode: React.FC<TreeNodeProps> = ({
                                             node,
                                             selectedNodeId,
                                             onSelect,
                                             onAddNode,
                                             onUpdateNode,
                                             onRemoveNode,
                                             expandedNodes,
                                             setExpandedNodes
                                           }) => {
  const isSelected = node.id === selectedNodeId;
  const hasChildren = node.children && node.children.length > 0;
  const isExpanded = expandedNodes.has(node.id);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const handleNodeClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isSelected) {
      onSelect(node.id);
    }
    if (hasChildren) {
      setExpandedNodes((prev) => {
        const newExpanded = new Set(prev);
        newExpanded.has(node.id) ? newExpanded.delete(node.id) : newExpanded.add(node.id);
        return newExpanded;
      });
    }
  }, [isSelected, onSelect, node, hasChildren, setExpandedNodes]);

  const handleAdd = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAddOpen(true);
  }, []);

  const handleEdit = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditOpen(true);
  }, []);

  const handleDelete = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDeleteOpen(true);
  }, []);

  const dialogs = (
    <>
      <EditNodeDialog
        isOpen={isEditOpen}
        nodeName={node.name}
        nodeId={node.id}
        onSave={(id, newName) => {
          onUpdateNode(id, newName);
          setIsEditOpen(false);
        }}
        onClose={() => setIsEditOpen(false)}
      />
      <DeleteNodeDialog
        isOpen={isDeleteOpen}
        nodeName={node.name}
        nodeId={node.id}
        onConfirm={(id) => {
          onRemoveNode(id);
          setIsDeleteOpen(false);
        }}
        onClose={() => setIsDeleteOpen(false)}
      />
      <AddNodeDialog
        isOpen={isAddOpen}
        parentId={node.id}
        onAdd={(parentId, newName) => {
          onAddNode(parentId, newName);
          setExpandedNodes((prev) => new Set(prev).add(parentId));
          setIsAddOpen(false);
        }}
        onClose={() => setIsAddOpen(false)}
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      />
    </>
  );

  return (
    <div className="fx-tree-node" onClick={handleNodeClick}>
      <div className="fx-tree-node-node">
        <div className="fx-tree-node-icon">
          {hasChildren && (
            <ChevronRightIcon fontSize="small" className={isExpanded ? 'rotated' : ''}/>
          )}
        </div>
        <div className={isSelected ? 'fx-tree-node-label-selected' : 'fx-tree-node-label-regular'}>
          <label>{node.id === 1 ? 'Root' : node.name}</label>
          {isSelected && (
            <>
              <IconButton onClick={handleAdd} style={{ padding: '0px 3px' }} color="primary" size="small">
                <AddCircleOutlineOutlinedIcon fontSize="medium"/>
              </IconButton>
              {node.id !== 1 && (
                <>
                  <IconButton onClick={handleEdit} style={{ padding: '0px 3px' }} color="primary" size="small">
                    <EditOutlinedIcon fontSize="medium"/>
                  </IconButton>
                  <IconButton onClick={handleDelete} style={{ padding: '0px 3px' }} color="secondary" size="small">
                    <DeleteForeverIcon fontSize="medium" style={{ color: 'red' }}/>
                  </IconButton>
                </>
              )}
            </>
          )}
        </div>
      </div>
      {hasChildren && isExpanded && (
        <div className="fx-tree-node-children">
          {node.children!.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              selectedNodeId={selectedNodeId}
              onSelect={onSelect}
              onAddNode={onAddNode}
              onUpdateNode={onUpdateNode}
              onRemoveNode={onRemoveNode}
              expandedNodes={expandedNodes}
              setExpandedNodes={setExpandedNodes}
            />
          ))}
        </div>
      )}
      {dialogs}
    </div>
  );
};

export default React.memo(TreeNode);
