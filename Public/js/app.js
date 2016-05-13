var socket = io();
var name = getQueryVariable('name') || 'Anonymous';
var room = getQueryVariable('room');

socket.on('connect', function() {
	console.log('Connected to socket.io server');
//	jQuery('.messages').append('<p>' + moment().format('h:mma') + ': ' + name + ' has joined the room ' + room + '</p>');
});

socket.on('message', function(message) {
	console.log('Mensaje recibido: ' + message.text);
	var timestampMoment = moment.utc(message.timestamp);
	jQuery('.messages').append('<p>' +  message.name + ': ' + timestampMoment.format('h:mma') + ': ' + message.text + '</p>');
});

// Handles submitting of new message
var $form = jQuery('#message-form');

$form.on('submit', function(event) {
	event.preventDefault();
	socket.emit('message', {
		text: $form.find('input[name=message]').val(),
		name: name
	});

	$form.find('input[name=message]').val('');
});