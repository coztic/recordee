var socket = io.connect();

socket.on('info-request', function (data) {

	// send user agent info to server
	var userInfo = { userAgent: navigator.userAgent };
	socket.emit('info-response', userInfo);
});