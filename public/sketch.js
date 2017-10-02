// TO DO:
	// When you eat a small blob, a newone is added
	// Change desing of blob. 
	// Change size of world 

//main blob
var blob;
//little blobs
var blobs = [];
var zoom = 1;

function setup() {
	createCanvas(600,600);
	blob = new Blob(0, 0, 64);
	for (var i = 0; i < 200; i++) {
		// Larger space for the blobs to live in
		var x = random(-width,width);
		var y = random(-height,height);
		blobs[i] = new Blob(x, y, 16);
	}
}

function draw() {
	background(0);

	// Take the origin (the top left corner of canvas) and subtract it
	// to the center of the blob to create a moving effect of the canvas
	// or the camera if so to speak.
	// Always do things relative to the blobs positon (0, 0)
	// When the blob eats, the view "zooms out" relative to the blobs center
	translate(width/2, height/2);
	// Lets smooth thing out by using p5 function lerp to "massage things into existence"
	// Interpolate the zoom?
	var newzoom = 64 / blob.r;
	zoom = lerp(zoom, newzoom, 0.1);
	scale(zoom);
	translate(-blob.pos.x, -blob.pos.y);


	// If i am removing this from the array, as I move forwards in the 
	// array I could skip one by accident because the elements slide backwards. 
	// Therefore looping backwards helps to avoid this.
	for (var i = blobs.length-1; i >=0; i--) {
		blobs[i].show();
		if (blob.eats(blobs[i])) {
			// remove here (been eating!)
			blobs.splice(i, 1);
		}
	}

	blob.show();
	blob.update();
}

