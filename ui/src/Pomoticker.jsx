import { useState } from "react";
import Timer from "./Timer";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import DeleteModal from "./DeleteModal";

const TODOS = [
	{
		id: 1,
		name: "Sample task",
		taskDuration: 25,
		breakDuration: 5,
		status: "to do"
	}
];

let currentId = 1;
export default function Pomoticker() {
	const [tasks, setTasks] = useState(TODOS);
	const [shouldOpenTaskForm, setShouldOpenTaskForm] = useState(false);
	const [taskFormAction, setTaskFormAction] = useState('');
	const [currentTask, setCurrentTask] = useState(tasks[0]);
	const [taskToEdit, setTaskToEdit] = useState(null);
	const [shouldConfirmDelete, setShouldConfirmDelete] = useState(false);
	const [taskToDelete, setTaskToDelete] = useState(null);

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
			setCurrentTask(updatedTasks[0]);
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
		setCurrentTask(newTodos[0]);
		setShouldConfirmDelete(false);
	}

	function handleStartPause() {
		let newStatus = "";
		switch (currentTask.status) {
			case "to do":
				newStatus = "task in progress";
				break;
			case "task in progress":
				newStatus = "task paused";
				break;
			case "task paused":
				newStatus = "task in progress";
				break;
			case "task completed":
				newStatus = "break";
				break;
			case "break":
				newStatus = "break in progress";
				break;
			case "break in progress":
				newStatus = "break paused";
				break;
			case "break paused":
				newStatus = "break in progress";
				break;
			case "break completed":
				console.log("complete the whole task block");
				break;
		}

		const updatedTasks = tasks.map(task => {
			if (task.id === currentTask.id) {
				return {
					...currentTask,
					status: newStatus
				}
			}

			return task;
		});

		setTasks(updatedTasks);
		setCurrentTask(updatedTasks[0]);
	}

	function handleReset() {
		let newStatus = "";
		switch (currentTask.status) {
			case "task in progress":
			case "task paused":
				newStatus = "to do";
				break;

			case "break in progress":
			case "break paused":
				newStatus = "break";
				break;
		}

		const updatedTasks = tasks.map(task => {
			if (task.id === currentTask.id) {
				return {
					...currentTask,
					status: newStatus
				}
			}

			return task;
		});

		setTasks(updatedTasks);
		setCurrentTask(updatedTasks[0]);
	}

	function getCurrentTask() {
		return currentTask;
	}

	function handleComplete() {
		console.log("complete was triggered");
		let newStatus = "";
		console.log(currentTask.status);
		switch (getCurrentTask().status) {
			case "task in progress":
				newStatus = "break";
				break;
			case "break in progress":
				newStatus = "completed";
				break;
			default:
				newStatus = "test status";
				break;
		}

		const updatedTasks = tasks.map(task => {
			if (task.id === currentTask.id) {
				return {
					...currentTask,
					status: newStatus
				}
			}

			return task;
		});

		setTasks(updatedTasks);
		setCurrentTask(updatedTasks[0]);
	}

	return (
		<>
			{
				shouldConfirmDelete &&
				<DeleteModal
					taskToDelete={taskToDelete}
					onCancel={handleCancelDelete}
					onConfirm={handleConfirmDelete}
				/>
			}
			<Timer
				currentTask={currentTask}
				onStartPause={handleStartPause}
				onReset={handleReset}
				onComplete={handleComplete}
				key={currentTask.taskDuration + ":" + currentTask.breakDuration}
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
