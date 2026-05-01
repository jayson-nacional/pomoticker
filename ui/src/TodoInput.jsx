import { useState } from "react";

export default function TodoInput({ onAdd }) {
	const [todoName, setTodoName] = useState('');
	const [taskDuration, setTaskDuration] = useState(25);
	const [breakDuration, setBreakDuration] = useState(5);

	function handleAdd() {
		if (!todoName) {
			alert('Please enter a todo name');
			return;
		}

		onAdd({
			name: todoName,
			taskDuration: taskDuration,
			breakDuration: breakDuration
		});

		setTodoName('');
		setTaskDuration(null);
		setBreakDuration(null);
	}

	function handleTodoNameChange(value) {
		setTodoName(value);
	}

	function handleTaskDurationChange(value) {
		setTaskDuration(value);
	}

	function handleBreakDurationChange(value) {
		setBreakDuration(value);
	}

	return (
		<>
			<div className="todo-input">
				<div>
					<label>Task</label>
					<input
						type="text"
						placeholder="Task name..."
						value={todoName}
						onChange={(e) => handleTodoNameChange(e.target.value)}
					/>
				</div>
				<div>
					<label>Duration</label>
					<input
						type="number"
						value={taskDuration}
						onChange={(e) => handleTaskDurationChange(e.target.value)}
					/>
				</div>
				<div>
					<label>Break</label>
					<input
						type="number"
						value={breakDuration}
						onChange={(e) => handleBreakDurationChange(e.target.value)}
					/>
				</div>
				<button onClick={handleAdd}>Add</button>
			</div>
		</>
	);
}
