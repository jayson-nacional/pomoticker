import { useEffect, useRef, useState } from "react";

export default function Timer() {
	const [timeInSeconds, setTimeInSeconds] = useState(25 * 60);
	const workerRef = useRef();

	useEffect(() => {
		const worker = new Worker(new URL('worker.js', import.meta.url));
		workerRef.current = worker;

		workerRef.current.onmessage = (e) => {
			setTimeInSeconds(e.data);
		};

		return () => workerRef.current.terminate();
	}, []);

	function handleStart() {
		workerRef.current?.postMessage(timeInSeconds);
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
					<button onClick={handleStart}>Start</button>
					<button>Reset</button>
				</div>
			</div>
		</>
	);
}
