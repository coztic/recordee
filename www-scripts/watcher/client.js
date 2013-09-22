/*

 ##      ##    ###    ########  ######  ##     ## ######## ########
 ##  ##  ##   ## ##      ##    ##    ## ##     ## ##       ##     ##
 ##  ##  ##  ##   ##     ##    ##       ##     ## ##       ##     ##
 ##  ##  ## ##     ##    ##    ##       ######### ######   ########
 ##  ##  ## #########    ##    ##       ##     ## ##       ##   ##
 ##  ##  ## ##     ##    ##    ##    ## ##     ## ##       ##    ##
 ###  ###  ##     ##    ##     ######  ##     ## ######## ##     ##

 */

console.log('socket.io is not enabled.');

function x_connectClient (id) {
	x_addCursor(id);
}
function x_disconnectClient (id) {
	x_removeCursor(id);
}

// Add cursor
function x_addCursor (id) {
	try {
		var style = 'position: absolute; left: 0px; top: 0px;';
		var img = '<img id="' + id + '" class="cursor" src="/index_files/cursor.png" style="' + style + '" />';
		$('#content').append(img);
		return true;
	} catch(err) {
		return false;
	}
}
function x_moveCursor(id, left, top, interval) {
	$('.cursor#' + id).animate({left: left + 'px', top: top + 'px'}, interval);
	return true;
}
function x_removeCursor (id) {
	$('.cursor#' + id).remove();
	return true;
}
