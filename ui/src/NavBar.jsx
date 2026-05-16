export default function NavBar({ onLogin }) {
	function renderDate() {
		const formatter = new Intl.DateTimeFormat('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			weekday: 'long'
		});

		return formatter.format(new Date());
	}

	return (
		<>
			<nav className="navbar bg-body-tertiary">
				<div className="container-fluid">
					<div className="">
						<div className="card-body">
							<figure>
								<blockquote className="blockquote">
									<p>Thursday</p>
								</blockquote>
								<div className="blockquote-footer">
									May 14, 2026
								</div>
							</figure>
						</div>
					</div>
					<form className="d-flex">
						<button onClick={onLogin} className="btn btn-outline-success" type="button">Login</button>
					</form>
				</div>
			</nav>
		</>
	);
}
