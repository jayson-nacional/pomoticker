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
		breakDuration: 5
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
				breakDuration: task.breakDuration
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
