import { useState } from "react";
import "./App.css";
import {data} from "./data"

function App() {
  const [todos,setTodos]=useState(data);
  const [newTodo, setNewTodo] = useState("");

  const handleAddTodo = (event) => {
    event.preventDefault();
    if (newTodo.trim()) {
      setTodos((prevTodos) => [
        ...prevTodos,
        { title: newTodo, id: Date.now() },
      ]);
      setNewTodo("");
    }
  };

  return (
    <div className="todos__block">
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
          <li key={todo.id}>
            {todo.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
