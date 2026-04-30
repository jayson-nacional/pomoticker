import { useState } from "react";

export default function TodoItem({
	id,
	name,
	duration,
	breakDuration,
	onDelete,
	onUpdate
}) {
	const [taskName, setTaskName] = useState(name);
	const [isEditable, setIsEditable] = useState(false);

	function handleTodoChange(value) {
		setTaskName(value);
	}

	function handleEditSave() {
		if (isEditable) {
			onUpdate({
				id: id,
				name: taskName
			});
		}

		setIsEditable(!isEditable);
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
					<button onClick={handleEditSave}>{isEditable ? 'Save' : 'Edit'}</button>
					<button onClick={() => onDelete(id)}>Delete</button>
				</div>
			</div>
		</>
	);
}
