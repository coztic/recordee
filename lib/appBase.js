var AppBase = function (port, setupIoServer) {

	var path = require('path');
	var express = require('express');
	var app = express.createServer();

	app.configure(function () {
		app.use(
			'/',
			express.static(path.join(__dirname, '..', '..', 'www'))
		);
		app.use(
			'/scripts/',
			express.static(__dirname)
		);
	});

	// Setup the frontend with specified port (default port 80)
	app.listen(port || 80);

	// Setup ioServer if specified
	if (setupIoServer === true) {

		var io = require('socket.io').listen(app);
		var IoServer = require(path.join(__dirname, 'server'));
		var ioServer = new IoServer(io);
		ioServer.setup();
	}
};

AppBase.setup = function (port, setupIoServer) {
	return new AppBase(port, setupIoServer);
};

module.exports = AppBase;