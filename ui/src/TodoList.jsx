import TodoItem from "./TodoItem";

export default function TodoList({
	todos,
	onDelete,
	onUpdate
}) {
	const output = todos.map((todo) => {
		return (
			<TodoItem
				key={todo.id}
				id={todo.id}
				name={todo.name}
				duration={todo.duration}
				breakDuration={todo.breakDuration}
				onDelete={onDelete}
				onUpdate={onUpdate}
			/>
		);
	});

	return (
		<>
			{output}
		</>
	);
}

