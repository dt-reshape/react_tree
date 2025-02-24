const ApiPath = 'https://test.vmarmysh.com';
const postRequest = async (url: string, params: Record<string, string>) => {
  const queryString = new URLSearchParams(params).toString();
  const response = await fetch(`${ApiPath}${url}?${queryString}`, {
    method: 'POST'
  });
  if (!response.ok) {
    throw new Error(`Request to ${url} failed with status ${response.status}`);
  }

  const text = await response.text();
  return text ? JSON.parse(text) : null;
};

export const getTree = (treeName: string) => {
  return postRequest('/api.user.tree.get', { treeName });
};

export const createNode = (treeName: string, parentNodeId: number, nodeName: string) => {
  return postRequest('/api.user.tree.node.create', { treeName, parentNodeId: String(parentNodeId), nodeName });
};

export const deleteNode = (treeName: string, nodeId: number) => {
  return postRequest('/api.user.tree.node.delete', { treeName, nodeId: String(nodeId) });
};

export const renameNode = (treeName: string, nodeId: number, newNodeName: string) => {
  return postRequest('/api.user.tree.node.rename', { treeName, nodeId: String(nodeId), newNodeName });
};
