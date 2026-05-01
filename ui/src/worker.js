onmessage = (e) => {
	let durationInSeconds = e.data.duration;
	let action = e.data.action;
	let intervalId = e.data.intervalId;

	if (action === 'start') {
		intervalId = setInterval(function() {
			self.postMessage({
				intervalId: intervalId,
				duration: --durationInSeconds
			});
		}, 1000);
	} else if (action === 'pause' || action === 'reset') {
		clearInterval(intervalId);
	}
}
