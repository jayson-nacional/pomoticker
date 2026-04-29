import { useState } from "react";

export default function TodoItem({
	id,
	name,
	duration,
	breakDuration,
	onDelete,
	onEdit,
	onSave,
	isEditable,
	timerWorker
}) {
	const [taskName, setTaskName] = useState(name);
	const [remainingTimeInSeconds, setRemainingTimeInSeconds] = useState(duration * 60);
	const [isRunning, setIsRunning] = useState(false);

	function handleTodoChange(value) {
		setTaskName(value);
	}

	function handleSave() {
		onSave(id, taskName);
	}

	function handleStartPauseButton() {
		/* TODO: handle worker */

		setIsRunning(!isRunning);
	}

	function formatTimeDisplay() {
		const seconds = remainingTimeInSeconds % 60;
		const minutes = (remainingTimeInSeconds - seconds) / 60;

		const formattedMinutes = minutes === 0 ? '00' : minutes;
		const formattedSeconds = seconds === 0 ? '00' : seconds;

		return formattedMinutes + ':' + formattedSeconds;
	}

	return (
		<>
			<div className="todo-item">
				<div className="todo-info">
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
				<div className="todo-timer">
					<div>
						{formatTimeDisplay()}
					</div>
					<div>
						<button onClick={() => handleStartPauseButton()}>{isRunning ? 'Pause' : 'Start'}</button>
						<button>Reset</button>
					</div>
				</div>
			</div>
		</>
	);
}
