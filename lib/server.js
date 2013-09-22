
var l = console.info;

var IoSocketServer = function(io){
	this._io = io;
};

IoSocketServer.prototype.setup = function () {
	var io  = this._io;

	io.sockets.on('connection', function (socket) {

		// Handle info response with user agent data
		socket.on('info-response', function (data) {
			l('userInfo:', data);
		});

		// Request user agent data from the client
		socket.emit('info-request', {});
	});

};

module.exports = IoSocketServer;