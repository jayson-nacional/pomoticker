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
	const [taskDuration, setTaskDuration] = useState(duration);
	const [taskBreakDuration, setTaskBreakDuration] = useState(breakDuration);
	const [isEditable, setIsEditable] = useState(false);

	function handleTodoChange(value) {
		setTaskName(value);
	}

	function handleTaskDurationChange(value) {
		setTaskDuration(value);
	}

	function handleTaskBreakDurationChange(value) {
		setTaskBreakDuration(value);
	}

	function handleEditSave() {
		if (isEditable) {
			onUpdate({
				id: id,
				name: taskName,
				taskDuration: taskDuration,
				breakDuration: taskBreakDuration
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
				<div>
					<label>Duration: </label>
					<input value={taskDuration}
						type="number"
						disabled={!isEditable}
						onChange={(e) => handleTaskDurationChange(e.target.value)}
					/>
				</div>
				<div>
					<label>Break: </label>
					<input value={taskBreakDuration}
						type="number"
						disabled={!isEditable}
						onChange={(e) => handleTaskBreakDurationChange(e.target.value)}
					/>
				</div>
				<div>
					<button onClick={handleEditSave}>{isEditable ? 'Save' : 'Edit'}</button>
					<button onClick={() => onDelete(id)}>Delete</button>
				</div>
			</div>
		</>
	);
}
