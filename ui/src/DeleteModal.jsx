import { useEffect, useRef } from "react";
import { Modal } from "bootstrap"

export default function DeleteModal({
	taskName,
	onConfirm,
	onCancel
}) {
	const modalRef = useRef(null);
	const bsModal = useRef(null);

	useEffect(() => {
		bsModal.current = new Modal(modalRef.current);
		bsModal.current.show();

		return () => {
			bsModal.current.hide();
		};
	}, []);

	return (
		<>
			<div
				className="modal"
				data-bs-backdrop="static"
				data-bs-keyboard="false"
				tabIndex="-1"
				ref={modalRef}>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-body">
							<p>Are you sure you want to delete task '{taskName}'?</p>
						</div>
						<div className="modal-footer">
							<button
								onClick={onCancel}
								type="button"
								className="btn btn-outline-secondary"
								data-bs-dismiss="modal"
							>
								Cancel
							</button>
							<button
								onClick={onConfirm}
								type="button"
								className="btn btn-outline-danger"
							>
								Delete
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
