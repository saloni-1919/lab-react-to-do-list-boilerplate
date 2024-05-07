import { useState } from 'react';
import PropTypes from 'prop-types';
import './App.css';

function TodoItem({ todo, index, onDelete, onUpdate }) {
  const [text, setText] = useState(todo);
  const [editing, setEditing] = useState(false);

  const handleDelete = () => {
    onDelete(index);
  };

  const handleUpdate = () => {
    if (text.trim() !== '') {
      onUpdate(index, text.trim());
      setEditing(false);
    }
  };

  return (
    <li>
      {editing ? (
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={handleUpdate}
          autoFocus
        />
      ) : (
        <span onClick={() => setEditing(true)}>{todo}</span>
      )}
      <button onClick={handleDelete}>Del</button>
    </li>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

function App() {
  const [list, setList] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const add = () => {
    if (newTodo.trim() !== '') {
      setList([...list, newTodo.trim()]);
      setNewTodo('');
    }
  };

  const del = (index) => {
    const newList = [...list];
    newList.splice(index, 1);
    setList(newList);
  };

  const upd = (index, newText) => {
    const newList = [...list];
    newList[index] = newText;
    setList(newList);
  };

  return (
    <div className="container">
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add new item"
      />
      <button onClick={add}>Add</button>
      <ul>
        {list.map((item, index) => (
          <TodoItem key={index} todo={item} index={index} onDelete={del} onUpdate={upd} />
        ))}
      </ul>
    </div>
  );
}

export default App;
