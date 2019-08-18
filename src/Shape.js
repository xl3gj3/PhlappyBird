var ObstacleFactory = function(wallOptions){
	// shape.prototype.draw()

}

var BirdFactory = function(avatarOptions){
	// shape.prototype.draw()
	this.x = avatarOptions.x;
	this.y = avatarOptions.y;
	this.startTime = 0;
	this.frameTick = 50; // ms
};

BirdFactory.prototype.draw = function(currentTime, ctx, canvas) {
	ctx.save();
	ctx.arc(this.x, this.y, 10, 0, Math.PI * 2, false);
	ctx.fillStyle = 'blue';
    ctx.fill();

    let frame = 1;
    if (this.startTime === 0) {
    	this.startTime = currentTime;
    } else {
    	frame = Math.floor( (currentTime - this.startTime ) / this.frameTick ) % 6;
    }

    switch(frame) {
    	case 1:
    		this.drawFrame1(currentTime, ctx, canvas);
    		break;
    	default:
    		break;
    }

	ctx.restore();
}
