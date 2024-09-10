import { useState, useEffect } from "react";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
	const [todos, setTodos] = useState([]);
	const [newTodo, setNewTodo] = useState("");
	const [editTodoId, setEditTodoId] = useState("");
	const [editTodoText, setEditTodoText] = useState("");

	useEffect(() => {
		fetch("https://jsonplaceholder.typicode.com/todos")
			.then((response) => response.json())
			.then((json) => setTodos(json));
	}, []);

	const handleAddTodo = (evt) => {
		evt.preventDefault();
		if (newTodo) {
			const newTodoItem = { title: newTodo, id: Date.now(), completed: false };
			setTodos((prevTodos) => [...prevTodos, newTodoItem]);
			setNewTodo("");
			toast.success("Ma'lumot muvofaqqiyatli qo'shildi!");
		} else {
			toast.error("Joy bo'lishi mumkin emas!");
		}
	};

	const handleDeleteTodo = (id) => {
		fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
			method: "DELETE",
		}).then((response) => {
			const filteredTodos = todos.filter((todo) => todo.id !== id);
			setTodos(filteredTodos);
			toast.error("Ma'lumot o'chirildi!");
		});
	};

	const handleEditTodo = (id) => {
		const todoToEdit = todos.find((todo) => todo.id === id);
		setEditTodoId(id);
		setEditTodoText(todoToEdit.title);
	};

	const handleSaveEdit = (id) => {
		const updatedTodos = todos.map((todo) =>
			todo.id === id ? { ...todo, title: editTodoText } : todo
		);
		setTodos(updatedTodos);
		setEditTodoId();
		setEditTodoText("");
		toast.success("Ma'lumot yangilandi!");
	};

	const handleCancelEdit = () => {
		setEditTodoId();
		setEditTodoText("");
	};

	const handleCheckboxChange = (id) => {
		const updatedTodos = todos.map((todo) =>
			todo.id === id ? { ...todo, completed: !todo.completed } : todo
		);
		setTodos(updatedTodos);
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
						<li
							className="todos_item"
							key={todo.id}
							style={{ textDecoration: todo.completed ? "line-through" : "none" }}
						>
							<input
								className="checkbox_input"
								type="checkbox"
								checked={todo.completed}
								onChange={() => handleCheckboxChange(todo.id)}
							/>
							{editTodoId === todo.id ? (
								<>
									<input
										className="edit_modal"
										type="text"
										value={editTodoText}
										onChange={(evt) => setEditTodoText(evt.target.value)}
									/>
									<button onClick={() => handleSaveEdit(todo.id)} className="edit_btn_save">
										Save
									</button>
									<button onClick={handleCancelEdit} className="edit_btn_cancel">
										Cancel
									</button>
								</>
							) : (
								<>
									<button onClick={() => handleEditTodo(todo.id)} className="todos__btn edit">
										<img
											className="btn"
											src="https://img.icons8.com/?size=100&id=MsQIVqWh2kj2&format=png&color=000000"
											alt="Edit"
										/>
									</button>
									<button onClick={() => handleDeleteTodo(todo.id)} className="todos__btn delete">
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
