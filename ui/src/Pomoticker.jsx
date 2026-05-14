import { useEffect, useRef, useState } from "react";
import Timer from "./Timer";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import DeleteModal from "./DeleteModal";
import NavBar from "./NavBar";


const Status = Object.freeze({
	TODO: 'to do',
	IN_PROGRESS: 'in progress',
	TASK_PAUSED: 'task paused',
	TASK_COMPLETED: 'task completed',
	BREAK: 'break',
	BREAK_IN_PROGRESS: 'break in progress',
	BREAK_PAUSED: 'break paused',
	COMPLETED: 'completed'
});

const TODOS = [
	{
		id: 1,
		name: "Plan my day",
		taskDuration: 25,
		breakDuration: 5,
		status: Status.TODO
	}
];

let currentId = 1;
export default function Pomoticker() {
	const [tasks, setTasks] = useState(TODOS);
	const [shouldOpenTaskForm, setShouldOpenTaskForm] = useState(false);
	const [taskFormAction, setTaskFormAction] = useState('');
	const [taskToEdit, setTaskToEdit] = useState(null);
	const [shouldConfirmDelete, setShouldConfirmDelete] = useState(false);
	const [taskToDelete, setTaskToDelete] = useState(null);
	const [timerDuration, setTimerDuration] = useState(tasks[0].taskDuration);
	const [timerStatus, setTimerStatus] = useState(Status.TODO);

	const startPauseHandlerRef = useRef(null);
	startPauseHandlerRef.current = () => handleStartPause(timerStatus);

	const timerCompleteHandlerRef = useRef(null);
	timerCompleteHandlerRef.current = () => handleComplete(timerStatus);

	const resetHandlerRef = useRef(null);
	resetHandlerRef.current = () => handleReset(timerStatus);

	function handleReset(status) {
		let newStatus = "";
		switch (status) {
			case Status.TODO:
			case Status.IN_PROGRESS:
			case Status.TASK_PAUSED:
				newStatus = Status.TODO;
				break;
			case Status.BREAK:
			case Status.BREAK_IN_PROGRESS:
			case Status.BREAK_PAUSED:
				newStatus = Status.BREAK;
				break;
		}

		if (newStatus) {
			const updatedTasks = tasks.map((item, index) => {
				if (index === 0) {
					return {
						...item,
						status: newStatus
					};
				}

				return item;
			});

			setTimerStatus(newStatus);
			setTasks(updatedTasks);
		}
	}

	function handleComplete(status) {
		let newStatus = "";
		switch (status) {
			case Status.IN_PROGRESS:
				newStatus = Status.BREAK;
				break;
			case Status.BREAK_IN_PROGRESS:
				newStatus = Status.COMPLETED;
				break;
		}

		const updatedTasks = tasks.map((item, index) => {
			if (index === 0) {
				return {
					...item,
					status: newStatus
				};
			}

			return item;
		});


		if (newStatus === Status.BREAK)
			setTimerDuration(updatedTasks[0].breakDuration);

		setTimerStatus(newStatus);
		setTasks(updatedTasks);

	}

	function handleStartPause(status) {
		let newStatus = "";
		switch (status) {
			case Status.TODO:
			case Status.TASK_PAUSED:
				newStatus = Status.IN_PROGRESS;
				break;
			case Status.IN_PROGRESS:
				newStatus = Status.TASK_PAUSED;
				break;
			case Status.BREAK:
			case Status.BREAK_PAUSED:
				newStatus = Status.BREAK_IN_PROGRESS;
				break;
			case Status.BREAK_IN_PROGRESS:
				newStatus = Status.BREAK_PAUSED;
				break;
		}

		const updatedTasks = tasks.map((item, index) => {
			if (index === 0) {
				return {
					...item,
					status: newStatus
				};
			}

			return item;
		});

		setTimerStatus(newStatus);
		setTasks(updatedTasks);
	}

	useEffect(() => {
		startPauseHandlerRef.current = () => handleStartPause(timerStatus);
		timerCompleteHandlerRef.current = () => handleComplete(timerStatus);
		resetHandlerRef.current = () => handleReset(timerStatus);
	}, [timerStatus]);

	function handleAddClick() {
		setTaskFormAction('create');
		setShouldOpenTaskForm(true);
		setTaskToEdit(null);
	}

	function handleSaveTask(action, task) {
		if (action === 'create') {
			setTasks([...tasks, {
				id: ++currentId,
				name: task.name,
				taskDuration: task.taskDuration,
				breakDuration: task.breakDuration,
				status: "to do"
			}]);
		} else if (action === 'update') {
			const updatedTasks = tasks.map(item => {
				if (item.id === task.id)
					return {
						...item,
						name: task.name,
						taskDuration: task.taskDuration,
						breakDuration: task.breakDuration
					};

				return item;
			});

			setTasks(updatedTasks);
			setTimerDuration(updatedTasks[0].taskDuration);
		}

		setTaskFormAction('');
		setShouldOpenTaskForm(false);
		setTaskToEdit(null);
	}

	function handleCancelTask() {
		setTaskFormAction('');
		setShouldOpenTaskForm(false);
		setTaskToEdit(null);
	}

	function handleEdit(id) {
		setTaskFormAction('update');
		setShouldOpenTaskForm(true);
		setTaskToEdit(id);
	}

	function handleCancelDelete() {
		setShouldConfirmDelete(false);
	}

	function handleDelete(id) {
		setTaskToDelete(id);
		setShouldConfirmDelete(true);
	}

	function handleConfirmDelete() {
		const newTodos = tasks.filter(todo => todo.id !== taskToDelete);
		setTasks(newTodos);
		setShouldConfirmDelete(false);
		setTimerDuration(newTodos[0].taskDuration);
	}


	return (
		<>
			{
				shouldConfirmDelete &&
				<DeleteModal
					taskName={tasks.find(task => task.id === taskToDelete).name}
					taskToDelete={taskToDelete}
					onCancel={handleCancelDelete}
					onConfirm={handleConfirmDelete}
				/>
			}
			<NavBar />
			<Timer
				key={tasks[0].id + ':' + timerDuration}
				name={tasks[0].name}
				duration={timerDuration}
				onStartPause={() => startPauseHandlerRef.current()}
				onReset={() => resetHandlerRef.current()}
				onComplete={() => timerCompleteHandlerRef.current()}
			/>
			<div className="m-3">
				<button
					onClick={handleAddClick}
					type="button"
					className="btn btn-success">
					<i className="bi bi-plus-lg"> </i>
					Add
				</button>
			</div>
			{
				shouldOpenTaskForm &&
				<TaskForm
					action={taskFormAction}
					task={taskToEdit ? tasks.find(task => task.id === taskToEdit) : {
						name: '',
						taskDuration: 25,
						breakDuration: 5
					}}
					onSave={handleSaveTask}
					onCancel={handleCancelTask}
				/>
			}
			<TaskList
				tasks={tasks}
				onEdit={handleEdit}
				onDelete={handleDelete}
			/>
		</>
	);
}
