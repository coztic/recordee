var path = require('path');
var express = require('express');
var app = express.createServer();
var io = require('socket.io').listen(app);
var IoServer = require(path.join(__dirname, 'lib', 'server'));
var ioServer = new IoServer(io);

app.configure(function () {
	app.use(
		'/',
		express.static(path.join(__dirname, '..', 'www'))
	);
	app.use(
		'/scripts/',
		express.static(path.join(__dirname, 'lib'))
	);
});

app.listen(80);
ioServer.setup();
