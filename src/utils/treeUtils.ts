import { TreeNode } from 'types';

export const updateNodeName = (nodes: TreeNode[], id: number, newName: string): TreeNode[] => {
  return nodes.map((node) => {
    if (node.id === id) {
      return { ...node, name: newName };
    }
    if (node.children) {
      return { ...node, children: updateNodeName(node.children, id, newName) };
    }
    return node;
  });
};

export const deleteNode = (nodes: TreeNode[], id: number): TreeNode[] => {
  return nodes
    .map((node) => {
      if (node.id === id) return null;
      if (node.children) {
        return { ...node, children: deleteNode(node.children, id) };
      }
      return node;
    })
    .filter(Boolean) as TreeNode[];
};
