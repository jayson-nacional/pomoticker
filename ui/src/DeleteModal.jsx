import { useEffect, useRef } from "react";
import { Modal } from "bootstrap"

export default function DeleteModal({
	shouldDelete,
	onConfirm,
	onCancel
}) {
	const modalRef = useRef(null);
	const bsModal = useRef(null);

	if (bsModal.current && shouldDelete)
		bsModal.current.show();

	useEffect(() => {
		bsModal.current = new Modal(modalRef.current);
		// if (shouldDelete) {
		// 	bsModal.current.show();
		// }

		return () => {
			bsModal.current.hide();
		};
	}, []);


	function handleConfirmDelete() {
		/* TODO implement delete logic */
		console.log('delete was clicked');
		onConfirm();
		bsModal.current.hide();
	}

	function handleCancelDelete() {
		console.log('cancel delete was clicked');
		onCancel();
		bsModal.current.hide();
	}

	if (shouldDelete) {
		bsModal.current.show();
	}

	return (
		<>
			<div className="modal" tabIndex="-1" ref={modalRef}>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-body">
							<p>Are you sure you want to delete?</p>
						</div>
						<div className="modal-footer">
							<button
								onClick={handleCancelDelete}
								type="button"
								className="btn btn-outline-secondary"
								data-bs-dismiss="modal"
							>
								Cancel
							</button>
							<button
								onClick={handleConfirmDelete}
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
