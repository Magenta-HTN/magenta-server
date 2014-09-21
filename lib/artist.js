
var socketio = require('socket.io');

exports.listen = function(server) {
	var io = socketio(server);
}
