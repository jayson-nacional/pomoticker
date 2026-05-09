export default function Task({
	id,
	name,
	taskDuration,
	breakDuration,
	onEdit,
	onDelete,
}) {
	return (
		<>
			<div key={id} className="card m-3" style={{ "width": "36rem" }} >
				<div className="card-body">
					<h5 className="card-title">{name}</h5>
					<h6 className="card-subtitle mb-2 text-body-secondary">{taskDuration} min focus</h6>
					<h6 className="card-subtitle mb-2 text-body-secondary">{breakDuration} min break</h6>
					<i className="bi bi-pencil-square" onClick={() => onEdit(id)}></i>
					<i className="bi bi-trash" onClick={() => onDelete(id)}></i>
				</div>
			</div >
		</>
	);
}
