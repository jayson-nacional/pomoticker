import { useState } from "react";
import Timer from "./Timer";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import DeleteModal from "./DeleteModal";

const TODOS = [
	{
		id: 1,
		name: "Sample task",
		duration: 25,
		breakDuration: 5
	}
];

let currentId = 1;
export default function Pomoticker() {
	const [todos, setTodos] = useState(TODOS);
	const [shouldShowDeleteModal, setShouldShowDeleteModal] = useState(false);
	const [currentTask, setCurrentTask] = useState(todos[0]);

	function handleAddTodo(todo) {
		setTodos([...todos, {
			id: ++currentId,
			name: todo.name,
			duration: todo.taskDuration,
			breakDuration: todo.breakDuration
		}]);
	}

	function handleUpdate(todo) {
		const updatedTodos = todos.map(item => {
			if (item.id === todo.id)
				return {
					...item,
					name: todo.name,
					duration: todo.taskDuration,
					breakDuration: todo.breakDuration
				};

			return item;
		});

		setTodos(updatedTodos);
		setCurrentTask(updatedTodos[0]);
	}

	function handleConfirmDelete(id) {
		const newTodos = todos.filter(todo => todo.id !== id);
		setTodos(newTodos);
		setCurrentTask(newTodos[0]);
		setShouldShowDeleteModal(false);
	}

	function handleCancelDelete() {
		setShouldShowDeleteModal(false);
	}

	function handleClickOnDelete() {
		console.log('clicked delete button');
		setShouldShowDeleteModal(true);
	}

	return (
		<>
			<DeleteModal
				onCancel={handleCancelDelete}
				onConfirm={() => handleConfirmDelete(1)}
				shouldDelete={shouldShowDeleteModal}
			/>
			<Timer
				currentTask={currentTask}
				key={currentTask.duration}
			/>
			<TodoInput
				onAdd={handleAddTodo}
			/>
			<TodoList
				todos={todos}
				onDelete={handleClickOnDelete}
				onUpdate={handleUpdate}
			/>
		</>
	);
}
