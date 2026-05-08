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
			<div className="card m-3" style={{ "width": "36rem" }} >
				<div className="card-body">
					<h5 className="card-title">{taskName}</h5>
					<h6 className="card-subtitle mb-2 text-body-secondary">{taskDuration} min focus</h6>
					<h6 className="card-subtitle mb-2 text-body-secondary">{taskBreakDuration} min break</h6>
					<i className="bi bi-pencil-square"></i>
					<i className="bi bi-trash" onClick={onDelete}></i>
				</div>
			</div >
		</>
	);
}
