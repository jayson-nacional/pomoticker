export default function Task({
	id,
	name,
	taskDuration,
	breakDuration,
	status,
	onEdit,
	onDelete,
}) {
	function renderStatus() {
		switch (status) {
			case "completed":
				return <span className="badge bg-success">{status}</span>;
			case "in progress":
			case "break in progress":
				return <span className="badge bg-warning text-dark">{status}</span>;
			default:
				return <span className="badge bg-secondary">{status}</span>;
		}
	}

	function renderTaskName() {
		if (status === "completed") {
			return <h5 className="card-title text-secondary text-decoration-line-through">{name}</h5>
		}

		return <h5 className="card-title text-secondary">{name}</h5>
	}

	return (
		<>
			<div key={id} className="card m-3" style={{ "width": "36rem" }} >
				<div className="card-body">
					<div className="text-end">
						{renderStatus()}
					</div>
					{renderTaskName()}
					<h6 className="card-subtitle mb-2 text-body-secondary">{taskDuration} min focus</h6>
					<h6 className="card-subtitle mb-2 text-body-secondary">{breakDuration} min break</h6>
					<div className="">
						<i className="bi bi-pencil-square me-1 text-success" onClick={() => onEdit(id)}></i>
						<i className="bi bi-trash text-danger" onClick={() => onDelete(id)}></i>
					</div>
				</div>
			</div >
		</>
	);
}
