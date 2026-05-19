import Task from "./Task";

export default function TaskList({
	tasks,
	onEdit,
	onDelete,
}) {
	const notCompletedTasks = tasks
		.filter(task => task.status !== "completed")
		.map((task) => {
			return (
				<Task
					key={task.id}
					id={task.id}
					name={task.name}
					taskDuration={task.taskDuration}
					breakDuration={task.breakDuration}
					status={task.status}
					onEdit={onEdit}
					onDelete={onDelete}
				/>
			);
		});

	const completedTasks = tasks
		.filter(task => task.status === "completed")
		.map((task) => {
			return (
				<Task
					key={task.id}
					id={task.id}
					name={task.name}
					taskDuration={task.taskDuration}
					breakDuration={task.breakDuration}
					status={task.status}
					onEdit={onEdit}
					onDelete={onDelete}
				/>
			);
		});

	return (
		<>
			<div className="m-3">
				<div>Tasks ({notCompletedTasks.length})</div>
				{notCompletedTasks}
			</div>
			<div className="m-3">
				<div>Completed ({completedTasks.length})</div>
				{completedTasks}
			</div>
		</>
	);
}

