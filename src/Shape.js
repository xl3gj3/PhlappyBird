var ObstacleFactory = function(wallOptions){
    // shape.prototype.draw()

}

var BirdFactory = function(avatarOptions){
    // shape.prototype.draw()
    this.x = avatarOptions.x;
    this.y = avatarOptions.y;
    this.avatarImage = avatarOptions.avatarImage;
    this.avatarOriWidth = avatarOptions.avatarImage[0].width;
    this.avatarOriheight = avatarOptions.avatarImage[0].height;

    this.avatarWidth = this.avatarOriWidth * 0.3;
    this.avatarheight = this.avatarOriheight * 0.3;
    this.startTime = 0;
    this.frameTick = 100; // ms
};

BirdFactory.prototype.draw = function(currentTime, ctx) {
    ctx.save();

    let frame = 0;
    if (this.startTime === 0) {
        this.startTime = currentTime;
    } else {
        frame = Math.floor( (currentTime - this.startTime ) / this.frameTick ) % 8;
    }
    switch(frame) {
        case 0:
            ctx.drawImage(this.avatarImage[0], 50, 50, this.avatarWidth, this.avatarheight);
            break;
        case 1:
            ctx.drawImage(this.avatarImage[1], 50, 50, this.avatarWidth, this.avatarheight);
            break;
        case 2:
            ctx.drawImage(this.avatarImage[2], 50, 50, this.avatarWidth, this.avatarheight);
            break;
        case 3:
            ctx.drawImage(this.avatarImage[3], 50, 50, this.avatarWidth, this.avatarheight);
            break;
        case 4:
            ctx.drawImage(this.avatarImage[4], 50, 50, this.avatarWidth, this.avatarheight);
            break;
        case 5:
            ctx.drawImage(this.avatarImage[5], 50, 50, this.avatarWidth, this.avatarheight);
            break;
        case 6:
            ctx.drawImage(this.avatarImage[6], 50, 50, this.avatarWidth, this.avatarheight);
            break;
        case 7:
            ctx.drawImage(this.avatarImage[7], 50, 50, this.avatarWidth, this.avatarheight);
            break;
        default:
            break;
    }

    ctx.restore();
}
