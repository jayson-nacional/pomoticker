import { useEffect, useRef, useState } from "react";

export default function Timer() {
	const [timeInSeconds, setTimeInSeconds] = useState(25 * 60);
	const [isRunning, setIsRunning] = useState(false);
	const workerRef = useRef();
	const intervalId = useRef();

	useEffect(() => {
		const worker = new Worker(new URL('worker.js', import.meta.url));
		workerRef.current = worker;

		workerRef.current.onmessage = (e) => {
			setTimeInSeconds(e.data.duration);
			intervalId.current = e.data.intervalId;
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
	}

	function handleReset() {
		if (intervalId.current) {
			workerRef.current?.postMessage({
				action: 'reset',
				intervalId: intervalId.current
			});

			setTimeInSeconds(25 * 60);
		}
	}

	function renderTimeDisplay() {
		const seconds = timeInSeconds % 60;
		const minutes = (timeInSeconds - seconds) / 60;

		const formattedMinutes = minutes ? minutes : '00';
		const formattedSeconds = seconds ? seconds : '00';

		return formattedMinutes + ':' + formattedSeconds;
	}

	return (
		<>
			<div className="timer">
				<div>
					{renderTimeDisplay()}
				</div>
				<div>
					<button onClick={handleStartPause}>{isRunning ? 'Pause' : 'Start'}</button>
					<button onClick={handleReset}>Reset</button>
				</div>
			</div>
		</>
	);
}
