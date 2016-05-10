var PORT = process.env.PORT || 3000;
var express = require ('express');
var app = express();

// built-in node module http
// Comienza un servidor
var http = require('http').Server(app);

app.use(express.static(__dirname + '/public'));

http.listen(PORT, function (){
	console.log('Server started');
})