// Import necessary React libraries
import './App.css'
import React, { useState } from 'react';

const TreeNode = ({ node }) => {
  const [nodeText, setNodeText] = useState(node.text);

  const handleTextChange = (e) => {
    setNodeText(e.target.value);
  };

  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="tree-node">
      <strong>
        <input type="text" value={nodeText} onChange={handleTextChange} />
      </strong>
      {hasChildren && (
        <div style={{ marginLeft: '20px' }}>
          {node.children.map((child) => (
            <TreeNode key={child.id} node={child} />
          ))}
        </div>
      )}
    </div>
  );
};

const App = () => {
  const [tree, setTree] = useState({
    id: 1,
    type: 'Parent Node',
    text: 'Root Node',
    children: [],
  });

  const [selectedNode, setSelectedNode] = useState(tree);
  const [newNodeType, setNewNodeType] = useState('Single Node');
  const [customText, setCustomText] = useState('');

  const handleTypeChange = (e) => {
    setNewNodeType(e.target.value);
  };

  const handleTextChange = (e) => {
    setCustomText(e.target.value);
  };

  const addNode = () => {
    const newNode = {
      id: Date.now(),
      type: newNodeType,
      text: customText || `${newNodeType} ${Date.now()}`,
      children: [],
    };

    if (newNodeType === 'Single Node') {
      setSelectedNode((prev) => {
        prev.children.push(newNode);
        return { ...prev };
      });
    } else if (newNodeType === 'Child Node') {
      setSelectedNode((prev) => {
        prev.children.push(newNode);
        return { ...prev };
      });
    } else if (newNodeType === 'Parent Node') {
      const newText = customText || `${newNodeType} ${Date.now()}`;
      const newTree = {
        id: Date.now(),
        type: newNodeType,
        text: newText,
        children: [selectedNode],
      };
      setTree(newTree);
      setSelectedNode(newTree);
    }
  };

  return (
    <div>
      <h1>Hierarchical Tree Formation</h1>
      <div>
        <label>Select Node Type: </label>
        <select value={newNodeType} onChange={handleTypeChange}>
          <option value="Single Node">Single Node</option>
          <option value="Child Node">Child Node</option>
          <option value="Parent Node">Parent Node</option>
        </select>
        <label>Add Custom Text: </label>
        <input type="text" value={customText} onChange={handleTextChange} />
        <button onClick={addNode}>Add Node</button>
      </div>
      <div>
        <h2>Selected Node: {selectedNode.text}</h2>
        <TreeNode node={tree} />
      </div>
    </div>
  );
};

export default App;
