import { useState } from "react";
import "./App.css";
import { data } from "./data";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [todos, setTodos] = useState(data);
  const [newTodo, setNewTodo] = useState("");
  const [editTodoId, setEditTodoId] = useState("");
  const [editTodoText, setEditTodoText] = useState("");

  const handleAddTodo = (event) => {
    event.preventDefault();

    if (newTodo.trim()) {
      setTodos((prevTodos) => [
        ...prevTodos,
        { title: newTodo, id: Date.now() },
      ]);
      setNewTodo("");
      toast.success("Successfully added!");
    } else {
      toast.error("Please enter a task!");
    }
  };

  const handleDeleteTodo = (id) => {
    const filteredTodos = todos.filter(todo => todo.id !== id);
    setTodos(filteredTodos);
    toast.success("Todo deleted!");
  };

  const handleEditTodo = (id) => {
    const todoToEdit = todos.find(todo => todo.id === id);
    setEditTodoId(id);
    setEditTodoText(todoToEdit.title);
  };

  const handleSaveEdit = (id) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, title: editTodoText } : todo
    );
    setTodos(updatedTodos);
    setEditTodoId(null);
    setEditTodoText("");
    toast.success("Successfully updated!");
  };

  const handleCancelEdit = () => {
    setEditTodoId(null);
    setEditTodoText("");
  };

  return (
    <div className="todos">
      <div className="todos__block">
        <ToastContainer />
        <h1 className="todo__title">Todo List</h1>
        <form className="todoForm" onSubmit={handleAddTodo}>
          <input
            type="text"
            className="todo_input"
            placeholder="Enter the tasks"
            value={newTodo}
            onChange={(evt) => setNewTodo(evt.target.value)}
          />
          <button type="submit" className="todo_btn">
            Add Task
          </button>
        </form>
        <ul className="todos__data">
          {todos.map((todo) => (
            <li className="todos_item" key={todo.id}>
              {editTodoId === todo.id ? (
                <>
                  <input
                    type="text"
                    value={editTodoText}
                    onChange={(e) => setEditTodoText(e.target.value)}
                  />
                  <button
                    onClick={() => handleSaveEdit(todo.id)}
                    className="todos__btn save"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="todos__btn cancel"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleEditTodo(todo.id)}
                    className="todos__btn edit"
                  >
                    <img
                      className="btn"
                      src="https://img.icons8.com/?size=100&id=MsQIVqWh2kj2&format=png&color=000000"
                      alt="Edit"
                    />
                  </button>
                  <button
                    onClick={() => handleDeleteTodo(todo.id)}
                    className="todos__btn delete"
                  >
                    <img
                      className="btn"
            src="https://img.icons8.com/?size=100&id=Ak1nWJFsk3c7&format=png&color=000000"
                      alt="Delete"
                    />
                  </button>
                  {todo.title}
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
