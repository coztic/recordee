/*

 ##     ##  ######  ######## ########
 ##     ## ##    ## ##       ##     ##
 ##     ## ##       ##       ##     ##
 ##     ##  ######  ######   ########
 ##     ##       ## ##       ##   ##
 ##     ## ##    ## ##       ##    ##
 #######   ######  ######## ##     ##

 */

var socket = io.connect();
var data = {
	mouse: {
		interval: 125,
		timer: null,
		left: '0px',
		top: '0px'
	}
};

socket.on('info-request', function (data) {

	// send user agent info to server
	var userInfo = { command: 'connect', data: navigator.userAgent };
	socket.emit('info-response', userInfo);
});

// SETUP MOUSE MOVE LISTENER
$('body').mousemove(function (event) {
	data.mouse.left = event.pageX;
	data.mouse.top = event.pageY;
	//console.log( "Set new mouse coords" );

	var fn = function() {
		var m = data.mouse;
		var query = { command: 'mousemove', data: {left: m.left, top: m.top, interval: m.interval} };
		socket.emit('mousemove', query);
		data.mouse.timer = null;
		console.log( "Emitted mousemove, cleared timer" );
	};

	if (!data.mouse.timer) {
		data.mouse.timer = setTimeout(fn, data.mouse.interval);
		//console.log( "Set new timer" );
	}
});