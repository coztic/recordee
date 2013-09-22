var request = require('request');
var l = console.info;
var flag_sendToBackend = true;

var encodeURLQuery = function (obj) {
	var str = [];
	for(var p in obj)
		str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
	return str.join("&");
};
var sendToBackend = function (command) {

	var url = 'http://localhost:8000/?' + encodeURLQuery(command);

	if (flag_sendToBackend) {
		request(url, function (err, res, content) {
			if (err) l('Error', err.message);
			if (res.statusCode !== 200) l('Got response code:', res.statusCode);
		});
	} else {
		l(url);
	}
};

var IoSocketServer = function(io){ this._io = io; };

IoSocketServer.onInfoResponse = function (data) {
	l('userInfo:', data);

	var cmd = {
		command: 'connect',
		data: data.userAgent
	};
	sendToBackend(cmd);
};
IoSocketServer.onDisconnect= function (data) {
	l('userInfo:', data);

	var cmd = {
		command: 'disconnect'
	};
	sendToBackend(cmd);
};

IoSocketServer.prototype.setup = function () {
	var io  = this._io;

	io.sockets.on('connection', function (socket) {

		// Handle info response with user agent data
		socket.on('info-response', IoSocketServer.onInfoResponse);
		socket.on('disconnect', IoSocketServer.onDisconnect);

		// Request user agent data from the client
		socket.emit('info-request', {});
	});

};

module.exports = IoSocketServer;