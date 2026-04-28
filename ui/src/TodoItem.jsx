import { useState } from "react";

export default function TodoItem({
	id,
	name,
	duration,
	breakDuration,
	onDelete,
	onEdit,
	onSave,
	isEditable
}) {
	const [taskName, setTaskName] = useState(name);

	function handleTodoChange(value) {
		setTaskName(value);
	}

	function handleSave() {
		onSave(id, taskName);
	}

	return (
		<>
			<div className="todo-item">
				<div>
					<input value={taskName}
						disabled={!isEditable}
						onChange={(e) => handleTodoChange(e.target.value)}
					/>
				</div>
				<div>Duration: {duration}</div>
				<div>Break: {breakDuration}</div>
				<div>
					<button onClick={isEditable ? handleSave : onEdit}>{isEditable ? 'Save' : 'Edit'}</button>
					<button onClick={onDelete}>Delete</button>
				</div>
			</div>
		</>
	);
}
