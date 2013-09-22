var express = require('express');
var app = express.createServer();
var io = require('socket.io').listen(app);
var path = require('path');

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
//io.sockets.on('connection', function (socket) {
//	socket.on('setPseudo', function (data) {
//		socket.set('pseudo', data);
//	});
//	socket.on('message', function (message) {
//		socket.get('pseudo', function (error, name) {
//			var data = { 'message' : message, pseudo : name };
//			socket.broadcast.emit('message', data);
//			console.log("user " + name + " send this : " + message);
//		})
//	});
//});