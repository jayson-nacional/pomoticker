import Task from "./Task";

export default function TaskList({
	tasks,
	onEdit,
	onDelete,
}) {
	const output = tasks.map((task) => {
		return (
			<Task
				key={task.id}
				id={task.id}
				name={task.name}
				taskDuration={task.taskDuration}
				breakDuration={task.breakDuration}
				onEdit={onEdit}
				onDelete={onDelete}
			/>
		);
	});

	return (
		<>
			{output}
		</>
	);
}

