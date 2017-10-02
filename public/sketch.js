// TO DO:
	// When you eat a small blob, a newone is added
	// Change desing of blob. 
	// Change size of world 
	// Latency



var socket;


//main blob
var blob;
//little blobs
var blobs = [];
var zoom = 1;

function setup() {
	createCanvas(600,600);
	// Start a socket coonection to my server
	socket = io.connect('http://localhost:3000/');

	blob = new Blob(random(width), random(height), random(8, 24));


	// Make an object with x and y
	var data = {
		x: blob.pos.x,
		y: blob.pos.y,
		r: blob.r
	};
	// Send that object to the socket	
	socket.emit('start', data);





	// The server needs to keep track of all the clients connected


	// There's no point to this anymore b/c blobs should only exist 
	// if theres people playing the
	// for (var i = 0; i < 200; i++) {
	// 	// Larger space for the blobs to live in
	// 	var x = random(-width,width);
	// 	var y = random(-height,height);
	// 	blobs[i] = new Blob(x, y, 16);
	// }

	socket.on('heartbeat', heartBeats);
	function heartBeats(data) {
		//console.log(data);
		blobs = data;
	}
}

function draw() {
	background(0);

	// Take the origin (the top left corner of canvas) and subtract it
	// to the center of the blob to create a moving effect of the canvas
	// or the camera if so to speak.
	// Always do things relative to the blobs positon (0, 0)
	// When the blob eats, the view "zooms out" relative to the blobs center
	translate(width / 2, height / 2);
	// Lets smooth thing out by using p5 function lerp to "massage things into existence"
	// Interpolate the zoom?
	var newzoom = 64 / blob.r;
	zoom = lerp(zoom, newzoom, 0.1);
	scale(zoom);
	translate(-blob.pos.x, -blob.pos.y);


	// If i am removing this from the array, as I move forwards in the 
	// array I could skip one by accident because the elements slide backwards. 
	// Therefore looping backwards helps to avoid this.

	for (var i = blobs.length - 1; i >= 0; i--) {
		var id = blobs[i].id;
		if (id.substring(2, id.length) !== socket.id) {
		  fill(0, 0, 255);
		  ellipse(blobs[i].x, blobs[i].y, blobs[i].r * 2, blobs[i].r * 2);

		  fill(255);
		  textAlign(CENTER);
		  textSize(4);
		  text(blobs[i].id, blobs[i].x, blobs[i].y + blobs[i].r);
		}
	// blobs[i].show();
	// if (blob.eats(blobs[i])) {
	//   blobs.splice(i, 1);
	// }
	}


	blob.show();
	if (mouseIsPressed) {
		blob.update();
	}
	blob.constrain();

	// send to server where I am every time draw()!
	// Make an object with x and y
	var data = {
		x: blob.pos.x,
		y: blob.pos.y,
		r: blob.r
	};
	// Update on every draw()	
	socket.emit('update', data);
}

