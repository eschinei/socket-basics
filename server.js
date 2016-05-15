var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var moment = require('moment');

// built-in node module http
// Comienza un servidor
var http = require('http').Server(app);

var io = require('socket.io')(http);
var clientInfo = {};

io.on('connection', function(socket) {
	console.log('User connected via socket.io');

	socket.on ('joinRoom', function (req){
		clientInfo[socket.id] = req;
		socket.join(req.room);
		socket.broadcast.to(req.room).emit ('message', {
			name: 'System',
			text: req.name + ' has joined!',
			timestamp: moment().valueOf()
		});
	});

	socket.on('message', function(message) {
		console.log('Message received: ' + message.text);
		//socket.broadcast.emit ('message', message);
		message.timestamp = moment().valueOf();
		io.to(clientInfo[socket.id].room).emit('message', message);
	});

	socket.emit('message', {
		name: 'System',
		text: 'Welcome to the chat application',
		timestamp: moment().valueOf()
	});
});

app.use(express.static(__dirname + '/public'));

http.listen(PORT, function() {
	console.log('Server started at port: ' + PORT);
});