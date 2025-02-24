import { useState, useEffect, useRef } from 'react';
import { createNode, deleteNode, renameNode, getTree } from 'api';
import { TreeNode } from '../types';

const TREE_NAME = '{C9232B85-AD10-459C-A44F-70CA30C60E5F}';

const useTreeApi = () => {
  const [treeData, setTreeData] = useState<TreeNode | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const isFetched = useRef(false);

  const fetchTree = async () => {
    setLoading(true);
    try {
      const data = await getTree(TREE_NAME);
      setTreeData(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Error fetching tree data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isFetched.current) {
      isFetched.current = true;
      fetchTree();
    }
  }, []);

  const addNode = async (parentNodeId: number, nodeName: string) => {
    setLoading(true);
    try {
      await createNode(TREE_NAME, parentNodeId, nodeName);
      await fetchTree();
    } catch (err) {
      console.error(err);
      setError('Error adding node');
    } finally {
      setLoading(false);
    }
  };

  const updateNode = async (nodeId: number, newName: string) => {
    setLoading(true);
    try {
      await renameNode(TREE_NAME, nodeId, newName);
      await fetchTree();
    } catch (err) {
      console.error(err);
      setError('Error updating node');
    } finally {
      setLoading(false);
    }
  };

  const removeNode = async (nodeId: number) => {
    setLoading(true);
    try {
      await deleteNode(TREE_NAME, nodeId);
      await fetchTree();
    } catch (err) {
      console.error(err);
      setError('Error removing node');
    } finally {
      setLoading(false);
    }
  };

  return { treeData, loading, error, fetchTree, addNode, updateNode, removeNode };
};

export default useTreeApi;
