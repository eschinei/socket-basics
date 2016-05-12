var socket = io();

socket.on ('connect', function(){
	console.log('Connected to socket.io server');
});

socket.on ('message', function(message){
	console.log('Mensaje recibido: ' + message.text);
	var timestampMoment = moment.utc(message.timestamp); 
	jQuery('.messages').append('<p>' + timestampMoment.format('h:mma') +': ' + message.text + '</p>');	
});

// Handles submitting of new message
var $form = jQuery('#message-form');

$form.on('submit', function (event){
	event.preventDefault();  
	socket.emit ('message', {
		text: $form.find('input[name=message]').val()
	});

	$form.find('input[name=message]').val('');	
});
