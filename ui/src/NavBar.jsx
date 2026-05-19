export default function NavBar({ onLogin }) {
	function renderDate() {
		const formatter = new Intl.DateTimeFormat('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
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
									<p>{new Date().toLocaleDateString('en-US', { weekday: 'long' })}</p>
								</blockquote>
								<div className="blockquote-footer">{renderDate()}</div>
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
