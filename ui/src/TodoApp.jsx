import { useState } from "react";
import TodoItem from "./TodoItem";

const TODOS = [
	{
		id: 1,
		name: "Sample task",
		duration: 25,
		breakDuration: 5
	}
];

let lastId = 1;

export default function TodoApp() {
	const [todoItems, setTodoItems] = useState(TODOS);
	const [todoInput, setTodoInput] = useState('');
	const [itemToEdit, setItemToEdit] = useState(null);

	const output = todoItems.map((todo) => {
		return (
			<li key={todo.id}>
				<TodoItem
					name={todo.name}
					duration={todo.duration}
					breakDuration={todo.breakDuration}
					onDelete={() => handleDelete(todo.id)}
					onEdit={() => handleEdit(todo.id)}
					isEditable={itemToEdit === todo.id}
				/>
			</li>
		);
	});

	function handleDelete(id) {
		const newItems = todoItems.filter(item => item.id !== id);
		setTodoItems(newItems);
	}

	function handleEdit(id) {
		setItemToEdit(id);
	}

	function handleAdd() {
		if (todoInput) {
			const newTodo = {
				id: ++lastId,
				name: todoInput,
				duration: 25,
				breakDuration: 5
			};

			setTodoItems([...todoItems, newTodo]);
			setTodoInput('');
		} else {
			alert('Please enter a todo name');
		}
	}

	function handleOnInputChange(value) {
		setTodoInput(value);
	}

	return (
		<>
			<div>
				<input
					onChange={(e) => handleOnInputChange(e.target.value)}
					value={todoInput}
					type="text" />
				<button onClick={handleAdd}>Add</button>
			</div>
			<ul>
				{output}
			</ul>
		</>
	);
}

