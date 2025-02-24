import React from 'react';
import Tree from './components/Tree/Tree';
import useTreeApi from './hooks/useTreeApi';
import './App.scss';

const App: React.FC = () => {
  const { treeData, addNode, updateNode, removeNode } = useTreeApi();

  return (
    <div className="app-container">
      {treeData && (
        <Tree
          data={treeData}
          addNode={addNode}
          updateNode={updateNode}
          removeNode={removeNode}
        />
      )}
    </div>
  );
};

export default App;
