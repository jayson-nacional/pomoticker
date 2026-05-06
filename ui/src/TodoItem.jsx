import { useState } from "react";

const focusDurations = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50];
const breakDurations = [5, 10, 15, 20];

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
			<div className="input-group mb-3">
				<span className="input-group-text" id="task">I will</span>
				<input type="text" className="form-control" aria-label="Username" aria-describedby="basic-addon1" />
			</div>
			<div className="input-group mb-3">
				<label className="input-group-text" htmlFor="focus">and focus for</label>
				<select className="form-select" id="focus" defaultValue={25}>
					{
						focusDurations.map(value => {
							return (
								<option
									key={value}
									value={value}>
									{value}
								</option>
							);
						})
					}
				</select>
			</div>
			<div className="input-group mb-3">
				<label className="input-group-text" htmlFor="break">then rest for</label>
				<select className="form-select" id="break" defaultValue={5}>
					{
						breakDurations.map(value => {
							return (
								<option
									key={value}
									value={value}>
									{value}
								</option>
							);
						})
					}
				</select>
			</div>
			<div>
				<button type="button" className="btn btn-outline-success">Commit!</button>
			</div>
			<div className="card" style={{ "width": "18rem" }} >
				<div className="card-body">
					<h5 className="card-title">{taskName}</h5>
					<h6 className="card-subtitle mb-2 text-body-secondary">{taskDuration} min focus</h6>
					<h6 className="card-subtitle mb-2 text-body-secondary">{taskBreakDuration} min break</h6>
					<i className="bi bi-pencil-square"></i>
					<i className="bi bi-trash"></i>
				</div>
			</div >
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
