import { useEffect, useRef, useState } from "react";

export default function Timer({
	currentTask,
	onStartPause,
	onReset,
	onComplete
}) {
	const [timeInSeconds, setTimeInSeconds] = useState(currentTask.taskDuration * 60);
	const [isRunning, setIsRunning] = useState(false);
	const workerRef = useRef();
	const intervalId = useRef();

	useEffect(() => {
		const worker = new Worker(new URL('worker.js', import.meta.url));
		workerRef.current = worker;

		workerRef.current.onmessage = (e) => {
			setTimeInSeconds(e.data.duration);
			intervalId.current = e.data.intervalId;

			if (e.data.duration === 0) {
				onComplete();
			}
		};

		return () => workerRef.current.terminate();
	}, []);

	function handleStartPause() {
		workerRef.current?.postMessage({
			duration: timeInSeconds,
			action: isRunning ? 'pause' : 'start',
			intervalId: intervalId.current
		});
		setIsRunning(!isRunning);
		onStartPause();
	}

	function handleReset() {
		if (intervalId.current) {
			workerRef.current?.postMessage({
				action: 'reset',
				intervalId: intervalId.current
			});

			setTimeInSeconds(currentTask.taskDuration * 60);
		}

		setIsRunning(false);
		onReset();
	}

	function renderTimeDisplay() {
		const seconds = timeInSeconds % 60;
		const minutes = (timeInSeconds - seconds) / 60;

		const formattedMinutes = minutes ? minutes : '00';
		let formattedSeconds = '00';
		if (seconds) {
			if (seconds < 10) {
				formattedSeconds = '0' + seconds;
			} else {
				formattedSeconds = seconds;
			}
		}

		return formattedMinutes + ':' + formattedSeconds;
	}

	function calculateProgress() {
		const percentage = (timeInSeconds / (currentTask.taskDuration * 60)) * 100;

		return (100 - percentage) + "%";
	}

	return (
		<>
			<div className="card text-center m-3">
				<div className="card-header">
					{currentTask.name}
				</div>
				<div className="card-body">
					<h1 className="card-title display-1">
						{renderTimeDisplay()}
					</h1>
					<div
						className="progress mb-3"
						role="progressbar"
						aria-label="Basic example"
						aria-valuenow="25"
						aria-valuemin="0"
						aria-valuemax="100"
					>
						<div
							className="progress-bar bg-success"
							style={{ "width": calculateProgress() }}></div>
					</div>
					<div>
						<button
							type="button"
							className="btn m-1 btn-outline-success"
							onClick={handleStartPause}>
							{isRunning ? <i className="bi bi-pause-circle"></i> : <i className="bi bi-play-fill"></i>}
						</button>
						<button
							type="button"
							className="btn m-1 btn-outline-secondary"
							onClick={handleReset}>
							<i className="bi bi-arrow-counterclockwise"></i>
						</button>
					</div>
				</div>
			</div>
		</>
	);
}
