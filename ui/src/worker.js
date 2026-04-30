onmessage = (e) => {
	let durationInSeconds = e.data;
	setInterval(function() {
		self.postMessage(--durationInSeconds);
	}, 1000);
}
