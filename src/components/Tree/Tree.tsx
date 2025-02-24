import React, { useState } from 'react';
import TreeNode from '../TreeNode/TreeNode';
import { TreeNode as TreeNodeType } from '../../types';
import './Tree.scss';

interface TreeProps {
  data: TreeNodeType;
  addNode: (parentId: number, newName: string) => Promise<void>;
  updateNode: (id: number, newName: string) => Promise<void>;
  removeNode: (id: number) => Promise<void>;
}

const Tree: React.FC<TreeProps> = ({ data, addNode, updateNode, removeNode }) => {
  const [selectedNodeId, setSelectedNodeId] = useState<number | null>(null);
  const [expandedNodes, setExpandedNodes] = useState<Set<number>>(new Set());

  const handleSelect = (id: number) => {
    setSelectedNodeId(id);
  };

  return (
    <div className="tree-container">
      <TreeNode
        node={data}
        selectedNodeId={selectedNodeId}
        onSelect={handleSelect}
        onAddNode={addNode}
        onUpdateNode={updateNode}
        onRemoveNode={removeNode}
        expandedNodes={expandedNodes}
        setExpandedNodes={setExpandedNodes}
      />
    </div>
  );
};

export default Tree;
