import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import { v4 as uuidv4 } from 'uuid';

const App = () => {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [finished, setfinished] = useState([])
  // ✅ Load from localStorage once on first render
  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos!=='[]') {
      try {
        setTodos(JSON.parse(storedTodos));
      } catch (err) {
        console.error('Failed to parse todos from localStorage:', err);
        setTodos([]);
      }
    }
  }, []);

  // ✅ Save to localStorage whenever todos changes
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleAdd = () => {
    if (todo.trim() === '') {
      alert("Todo can't be empty");
      return;
    }
    const newTodo = {
      id: uuidv4(),
      todo: todo.trim(),
      isCompleted: false,
    };
    setTodos([...todos, newTodo]);
    setTodo('');
  };

  const handleDelete = (itemtodo) => {
    const ch = window.confirm(`Are you sure you want to delete "${itemtodo.todo}"?`);
    if (ch) {
      const updated = todos.filter(item => item.id !== itemtodo.id);
      setTodos(updated);
    }
  };

  const handleEdit = (itemtodo) => {
    const newTodo = prompt("Enter the new Todo:", itemtodo.todo);
    if (newTodo && newTodo.trim() !== '') {
      const updated = todos.map(item =>
        item.id === itemtodo.id ? { ...item, todo: newTodo.trim() } : item
      );
      setTodos(updated);
    }
  };

  const handleCheckbox = (id) => {
    const updated = todos.map(item =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    );
    setTodos(updated);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto bg-blue-100 rounded-2xl m-4 p-5">
        <div className="addTodo">
          <h2 className="text-lg">Add a todo</h2>
          <input
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            className="text-black bg-white m-4 px-2 py-1 rounded-lg w-1/3"
          />
          <button
            onClick={handleAdd}
            className="border-[2px] bg-red-400 m-4 px-5 py-1 rounded-lg"
          >
            Add
          </button>
        </div>
        <h1 className="text-2xl font-bold">Your Todos</h1>
        <div className="todos">
          {todos.length === 0 && <div className="m-5">No todos to display</div>}
          {todos.map(item => (
            <div className="todo flex justify-between border p-2 rounded-2xl m-2" key={item.id}>
              <div className="flex gap-4 mx-3">
                <input
                  type="checkbox"
                  checked={item.isCompleted}
                  onChange={() => handleCheckbox(item.id)}
                />
                <div className={`mx-5 ${item.isCompleted ? 'line-through' : ''}`}>
                  {item.todo}
                </div>
              </div>
              <div className="btn gap-10">
                <button
                  onClick={() => handleEdit(item)}
                  className="border-[2px] bg-red-400 mx-2 px-4 rounded-lg"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item)}
                  className="border-[2px] bg-red-400 mx-2 px-4 rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default App;