
try {
	var socket = io.connect();

	socket.on('info-request', function (data) {

		// send user agent info to server
		var userInfo = { userAgent: navigator.userAgent };
		socket.emit('info-response', userInfo);
	});


	// SETUP MOUSE MOVE LISTENER

	$('body').mousemove(function ( event ) {
		var pageCoords = "( " + event.pageX + ", " + event.pageY + " )";
		var clientCoords = "( " + event.clientX + ", " + event.clientY + " )";
		console.log( "( event.pageX, event.pageY ) : " + pageCoords );
	});

} catch (ex) {
	console.log('socket.io is not enabled.')
}

