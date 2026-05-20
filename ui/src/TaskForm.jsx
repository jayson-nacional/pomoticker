import { useEffect, useRef, useState } from "react"
import { Modal } from "bootstrap"

const focusDurations = [1, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50];
const breakDurations = [1, 5, 10, 15, 20];

export default function TaskForm({
	action,
	task,
	onSave,
	onCancel
}) {
	const [taskName, setTaskName] = useState(task.name);
	const [taskDuration, setTaskDuration] = useState(task.taskDuration ?? 25);
	const [breakDuration, setBreakDuration] = useState(task.breakDuration ?? 5);

	const modalRef = useRef(null);
	const bsModal = useRef(null);

	useEffect(() => {
		if (modalRef.current) {
			bsModal.current = new Modal(modalRef.current);
			bsModal.current.show();
		}

		return () => {
			bsModal.current.hide();
		};
	}, []);

	function handleSave() {
		if (!taskName) {
			alert('Please identify what you need to do.');
			return;
		}

		onSave(action, {
			id: task.id,
			name: taskName,
			taskDuration: taskDuration,
			breakDuration: breakDuration
		});

		setTaskName('');
		bsModal.current.hide();
	}

	function handleTaskNameChange(value) {
		setTaskName(value);
	}

	function handleTaskDurationChange(value) {
		setTaskDuration(value);
	}

	function handleBreakDurationChange(value) {
		setBreakDuration(value);
	}

	return (
		<>
			<div
				className="modal"
				tabIndex="-1"
				id="taskFormModal"
				data-bs-backdrop="static"
				data-bs-keyboard="false"
				ref={modalRef}>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							{
								action === 'create' ?
									<h5 className="modal-title">Add Task</h5>
									:
									<h5 className="modal-title">Edit Task</h5>
							}
							<button
								onClick={onCancel}
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close">
							</button>
						</div>
						<div className="modal-body">
							<div className="input-group mb-3">
								<span className="input-group-text" id="task">I will</span>
								<input
									value={taskName}
									onChange={(e) => handleTaskNameChange(e.target.value)}
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
									onClick={handleSave}
									type="button"
									className="btn btn-outline-success">
									{action === 'create' ? 'Commit!' : 'Save'}
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
