onmessage = (e) => {
	let durationInSeconds = e.data.duration;
	let intervalId = null;
	console.log('Instance Id: ' + this.id);

	if (e.data.action === 'start') {
		intervalId = setInterval(function() {
			--durationInSeconds;
			self.postMessage(durationInSeconds);
		}, 1000);
	} else if (e.data.action === 'pause') {
		console.log('pause was initiated');
		clearInterval(intervalId);
		self.postMessage(durationInSeconds);
	}
}
