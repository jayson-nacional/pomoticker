import { useState } from "react";

export default function TodoInput({ onAdd }) {
	const [todoName, setTodoName] = useState('');

	function handleAdd() {
		if (!todoName) {
			alert('Please enter a todo name');
			return;
		}

		onAdd({
			name: todoName
		});

		setTodoName('');
	}

	function handleTodoNameChange(value) {
		setTodoName(value);
	}

	return (
		<>
			<div className="todo-input">
				<input
					type="text"
					value={todoName}
					onChange={(e) => handleTodoNameChange(e.target.value)}
				/>
				<button onClick={handleAdd}>Add</button>
			</div>
		</>
	);
}
