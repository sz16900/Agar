function Blob(x, y, r) {
	this.pos = createVector(x, y);
	this.r = r
	this.vel = createVector(0,0);
	
	this.show = function() {
	fill(255);
	ellipse(this.pos.x, this.pos.y, this.r*2, this.r*2);
	}

	this.update = function() {
		// Sub the center of window bc user interaction is relative to center of window
		var newvel = createVector(mouseX-width/2, mouseY-height/2);
		// Takes vector, however long it is and set it to that magnitude (speed?)
		newvel.setMag(3);
		// Lerp to the new velocity to create smoother turns (change 0.2 to see sharper turns)
		this.vel.lerp(newvel, 0.2);
		// set the velocity and position
		this.pos.add(this.vel);
	}

	// Reeceives another blob (other) and chec dist bethween this blob and other
	this.eats = function(other) {
		var d = p5.Vector.dist(this.pos, other.pos);
		// If the vector between the two blobs is less than the sum of the two radius
		// then we've eaten the blob (that is to say, if the radius of the two blobs overlap)
		if (d < this.r + other.r) {

			// Do no increase circle by radius.
			//this.r += other.r * 0.2;

			// But, rather, incrase by the area of the circle. Use this formula: A = Pi * r^2
			var sum = PI * this.r * this.r + PI * other.r * other.r;
			this.r = sqrt(sum / PI);
			return true;
		}
		else {
			return false;
		}
	}
}

