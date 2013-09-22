var request = require('request');
var l = console.info;
var flag_sendToBackend = true;

var sendToBackend = function (query) {

	var url = 'http://localhost:8000/?q=' + encodeURIComponent(JSON.stringify(query));

	if (flag_sendToBackend) {
		request(url, function (err, res, content) {
			if (err) l('Error', err.message);
			else if (res.statusCode !== 200) l('Got response code:', res.statusCode);
		});
	} else {
		l(url);
	}
};

var IoSocketServer = function(io){ this._io = io; };

IoSocketServer.relay = function (data) {
	sendToBackend(data);
};
IoSocketServer.onDisconnect= function (data) {
	l('userInfo:', data);

	var cmd = {
		command: 'disconnect',
		data: ''
	};
	sendToBackend(cmd);
};

IoSocketServer.prototype.setup = function () {
	var io  = this._io;

	io.sockets.on('connection', function (socket) {

		// Handle info response with user agent data
		socket.on('info-response', IoSocketServer.relay);
		socket.on('mousemove', IoSocketServer.relay);
		socket.on('disconnect', IoSocketServer.onDisconnect);

		// Request user agent data from the client
		socket.emit('info-request', {});
	});

};

module.exports = IoSocketServer;