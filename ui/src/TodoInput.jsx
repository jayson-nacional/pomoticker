import { useState } from "react";
import * as bootstrap from "bootstrap"

const focusDurations = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50];
const breakDurations = [5, 10, 15, 20];

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

	function handleModalButton() {
		const modal = document.getElementById('taskFormModal');
		const bootstrapModal = new bootstrap.Modal(modal);
		bootstrapModal.show();
	}

	return (
		<>
			<div>
				<button
					onClick={handleModalButton}
					type="button"
					className="btn btn-success">
					<i className="bi bi-plus-lg"> </i>
					Add
				</button>
			</div>
			<div className="modal" tabIndex="-1" id="taskFormModal">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">Add/Edit</h5>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div className="modal-body">
							<div className="input-group mb-3">
								<span className="input-group-text" id="task">I will</span>
								<input
									value={todoName}
									onChange={(e) => handleTodoNameChange(e.target.value)}
									type="text"
									className="form-control"
									aria-label="todo"
									aria-describedby="basic-addon1" />
							</div>
							<div className="input-group mb-3">
								<label className="input-group-text" htmlFor="focus">and focus for</label>
								<select
									value={taskDuration}
									onChange={(e) => handleTaskDurationChange(e.target.value)}
									className="form-select"
									id="focus">
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
								<select
									value={breakDuration}
									onChange={(e) => handleBreakDurationChange(e.target.value)}
									className="form-select"
									id="break">
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
								<button
									onClick={handleAdd}
									type="button"
									className="btn btn-outline-success">
									Commit!
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
