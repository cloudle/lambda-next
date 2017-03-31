const express = require('express'),
	path = require('path'),
	production = process.env.NODE_ENV === 'production',
	port = process.env.PORT || 2017,
	app = express();

if (!production) {
	const chokidar = require('chokidar');
	const watcher = chokidar.watch('./emulator');

	watcher.on('ready', function() {
		watcher.on('all', function() {
			Object.keys(require.cache).forEach(function(id) {
				if (/[\/\\]emulator[\/\\]/.test(id)) {
					delete require.cache[id];
				}
			});

			console.log("Server hot updated..");
		})
	});
}

app.use(function (req, res, next) {
	require('./emulator/index')(req, res, next)
});

app.listen(port, '0.0.0.0', function (err, result) {
	if (err) return console.log(err);
	console.log(`Server is up in port ${port}`);
});