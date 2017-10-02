// TO DO:
	// Dictonary lookup for updataMsg
	

// ALl the blobs that are currently connected
var blobs = []

// Constructor to build blobs
function Blob(id, x, y, r) {
	this.id = id;
	this.x = x;
	this.y = y;
	this.r = r;
}

// Import the important stuff
var express = require('express');
var socket = require('socket.io');

// // Make it an application
var app = express();

// Listening and server
var server = app.listen(process.env.PORT || 3000, listen);

// This call back just tells us that the server has started
function listen() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://' + host + ':' + port);
}

//Host everything in that directory (public)
app.use(express.static('public'));

// Create an actual socket that is part of ^ server
// IO keeps track of inputs and outputs
// WebSocker Portion
// WebSockets work with the HTTP server
var io = socket(server);

// Heart beating. 30 frames per second. 33 miliseconds
setInterval(heartBeats, 33);

function heartBeats() {
	io.sockets.emit('heartbeat', blobs);
} 

// Deal with a new connection event.
io.sockets.on('connection', newConnection);

function newConnection(socket) {
	// New connection gets assign a new id
	console.log("new connection" + socket.id);


	// If there's a message called start, trigger the function.
	socket.on('start', startMsg);
	socket.on('update', updateMsg);
	socket.on('disconnect', disconnect);


	// start message
	function startMsg(data) {
		console.log(socket.id + " " + data.x + " " + data.y + " " + data.r)
		var blob = new Blob(socket.id, data.x, data.y, data.r);
		blobs.push(blob);
	}

	// update message
	function updateMsg(data) {
		// console.log(socket.id + " " + data.x + " " + data.y + " " + data.r);
		// Brute force it by array loop. 
		var blob;
        for (var i = 0; i < blobs.length; i++) {
          if (socket.id == blobs[i].id) {
            blob = blobs[i];
          }
		}
		// I am updating that array. As the blob update location, array is also keeping up
		blob.x = data.x;
		blob.y = data.y;
		blob.r = data.r;
	}


    function disconnect() {
      console.log("Client has disconnected");
    }
}
