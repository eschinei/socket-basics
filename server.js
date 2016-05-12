var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var moment = require('moment');

// built-in node module http
// Comienza un servidor
var http = require('http').Server(app);

var io = require('socket.io')(http);

io.on('connection', function(socket) {
	console.log('User connected via socket.io');

	socket.on('message', function(message) {
		console.log('Message received: ' + message.text);
		//socket.broadcast.emit ('message', message);
		message.timestamp = moment().valueOf();
		io.emit('message', message);
	});

	socket.emit('message', {
		text: 'Welcome to the chat application',
		timestamp: moment().valueOf()
	});
});

app.use(express.static(__dirname + '/public'));

http.listen(PORT, function() {
	console.log('Server started at port: ' + PORT);
});