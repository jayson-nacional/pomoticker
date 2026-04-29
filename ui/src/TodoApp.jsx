import { useEffect, useRef, useState } from "react";
import TodoItem from "./TodoItem";

const TODOS = [
	{
		id: 1,
		name: "Sample task",
		duration: 25,
		breakDuration: 5
	}
];

let lastId = 1;
let instanceCount = 0;

export default function TodoApp() {
	++instanceCount;
	console.log('Todo App instance count: ' + instanceCount);

	const workerRef = useRef();
	useEffect(() => {
		workerRef.current = new Worker(new URL('worker.js', import.meta.url));

		workerRef.current.onmessage = function(event) {
			setRemainingTimeInSeconds(event.data);
		}

		return () => {
			workerRef.current.terminate();
		};
	}, []);

	const [todoItems, setTodoItems] = useState(TODOS);
	const [todoInput, setTodoInput] = useState('');
	const [itemToEdit, setItemToEdit] = useState(null);

	const output = todoItems.map((todo) => {
		return (
			<li key={todo.id}>
				<TodoItem
					id={todo.id}
					name={todo.name}
					duration={todo.duration}
					breakDuration={todo.breakDuration}
					onDelete={() => handleDelete(todo.id)}
					onEdit={() => handleEdit(todo.id)}
					onSave={handleOnSave}
					isEditable={itemToEdit === todo.id}
					timerWorker={workerRef.current}
				/>
			</li>
		);
	});

	function handleDelete(id) {
		const newItems = todoItems.filter(item => item.id !== id);
		setTodoItems(newItems);
	}

	function handleEdit(id) {
		setItemToEdit(id);
	}

	function handleOnSave(id, value) {
		const updatedItems = todoItems.map((item) => {
			if (item.id === id) {
				return { ...item, name: value };
			}

			return item;
		});

		setTodoItems(updatedItems);
		setItemToEdit(null);
	}

	function handleAdd() {
		if (todoInput) {
			const newTodo = {
				id: ++lastId,
				name: todoInput,
				duration: 25,
				breakDuration: 5
			};

			setTodoItems([...todoItems, newTodo]);
			setTodoInput('');
		} else {
			alert('Please enter a todo name');
		}
	}

	function handleOnInputChange(value) {
		setTodoInput(value);
	}

	return (
		<>
			<div>
				<input
					onChange={(e) => handleOnInputChange(e.target.value)}
					value={todoInput}
					type="text" />
				<button onClick={handleAdd}>Add</button>
			</div>
			<ul>
				{output}
			</ul>
		</>
	);
}

