export default function TodoItem({
	name,
	duration,
	breakDuration,
	onDelete,
	onEdit,
	isEditable
}) {
	function handleTodoChange() {
		console.log('todo change handler clicked');
	}

	function handleSave() {
		console.log('handle save is clicked');
	}

	return (
		<>
			<div className="todo-item">
				<div>
					<input value={name}
						disabled={!isEditable}
						onChange={handleTodoChange}
					/>
				</div>
				<div>Duration: {duration}</div>
				<div>Break: {breakDuration}</div>
				<div>
					<button onClick={isEditable ? handleSave : onEdit}>{isEditable ? 'Save' : 'Edit'}</button>
					<button onClick={onDelete}>Delete</button>
				</div>
			</div>
		</>
	);
}
