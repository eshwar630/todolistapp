import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import { HiArrowUturnRight } from "react-icons/hi2";
const App = () => {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [finished, setfinished] = useState([])
  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    const storedfinished=localStorage.getItem('finished');
    if (storedTodos !== '[]') {
      try {
        setTodos(JSON.parse(storedTodos));
      } catch (err) {
        console.error('Failed to parse todos from localStorage:', err);
        setTodos([]);
      }
    }
    if (storedfinished !== '[]') {
      try {
        setfinished(JSON.parse(storedfinished));
      } catch (err) {
        console.error('Failed to parse completed todos from localStorage:', err);
        setfinished([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);
  useEffect(() => {
    localStorage.setItem('finished', JSON.stringify(finished));
  }, [finished]);

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

  const handleDeletetodos = (itemtodo) => {
    const ch = window.confirm(`Are you sure you want to delete "${itemtodo.todo}"?`);
    if (ch) {
      const updated = todos.filter(item => item.id !== itemtodo.id);
      setTodos(updated);
    }
  };
  const handleDeletefinished = (itemtodo) => {
    const ch = window.confirm(`Are you sure you want to delete "${itemtodo.todo}"?`);
    if (ch) {
      const updated = finished.filter(item => item.id !== itemtodo.id);
      setfinished(updated);
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
    const updated=todos.filter(item=>item.id!==id);
    const completion=todos.find(item=>item.id===id);
    if(completion){
      setTodos(updated);
      setfinished([...finished,{...completion,isCompleted:true}]);
    }
  };
  const handleRevert = (id) => {
    const completion=finished.find(item=>item.id===id);
    const updated=finished.filter(item=>item.id!==id);
    if(completion){
      setfinished(updated);
      setTodos([...todos,{...completion,isCompleted:false}]);
    }
  };

  return (
    <>
      <div className="container mx-auto bg-blue-100 rounded-2xl m-4 p-5 w-screen lg:w-2/3">
        <div className="addTodo">
          <h2 className="text-lg">Add a todo</h2>
          <input
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            className="text-black bg-white m-4 px-2 py-1 rounded-lg w-9/10 lg:w-1/3"
          />
          <button
            onClick={handleAdd}
            className="border-[2px] bg-red-400 m-4 p-2 rounded-lg"
          >
           <IoIosAdd />
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
                <div className={`mx-5 w-9/10 lg:w-1/3`}>
                  {item.todo}
                </div>
              </div>
              <div className="btn gap-10">
                <button
                  onClick={() => handleEdit(item)}
                  className="border-[2px] bg-red-400 mx-2 p-2 rounded-lg"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDeletetodos(item)}
                  className="border-[2px] bg-red-400 mx-2 p-2 rounded-lg"
                >
                  <MdDelete />
                </button>
              </div>
            </div>
          ))}
        </div>
        <h1 className="text-2xl font-bold">Completed Todos</h1>
        <div className="finished">
          {finished.length === 0 && <div className="m-5">No todos Completed</div>}
          {finished.map(item => (
            <div className="finish flex justify-between border p-2 rounded-2xl m-2" key={item.id}>
              <div className={`mx-5`}>
                {item.todo}
              </div>
              <div className="btn gap-10">
                <button
                  onClick={() => handleRevert(item.id)}
                  className="border-[2px] bg-red-400 mx-2 p-2 rounded-lg"
                >
                  <HiArrowUturnRight />
                </button>
                <button
                  onClick={() => handleDeletefinished(item)}
                  className="border-[2px] bg-red-400 mx-2 p-2 rounded-lg"
                >
                  <MdDelete />
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
