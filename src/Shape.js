var ObstacleFactory = function(wallOptions){
    // shape.prototype.draw()

}

var BirdFactory = function(avatarOptions){
    // shape.prototype.draw()
    this.x = avatarOptions.x;
    this.y = avatarOptions.y;
    this.dx = avatarOptions.dx;
    this.dy = avatarOptions.dy;
    this.ddx = avatarOptions.ddx;
    this.ddy = avatarOptions.ddy;

    this.avatarImage = avatarOptions.avatarImage;
    this.avatarOriWidth = avatarOptions.avatarImage[0].width;
    this.avatarOriheight = avatarOptions.avatarImage[0].height;

    this.avatarWidth = this.avatarOriWidth * 0.3;
    this.avatarheight = this.avatarOriheight * 0.3;
    this.startTime = 0;
    this.frameTick = 100; // ms
};

BirdFactory.prototype.move = function(curPosition) {
    // update x and y
    const canvas = document.querySelector('canvas');
    if (this.y + this.avatarheight < canvas.height) {
        this.x = curPosition.x;
        this.y = curPosition.y;
        this.dx = curPosition.dx;
        this.dy = curPosition.dy;
    }

}

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
            ctx.drawImage(this.avatarImage[0], this.x, this.y, this.avatarWidth, this.avatarheight);
            break;
        case 1:
            ctx.drawImage(this.avatarImage[1], this.x, this.y, this.avatarWidth, this.avatarheight);
            break;
        case 2:
            ctx.drawImage(this.avatarImage[2], this.x, this.y, this.avatarWidth, this.avatarheight);
            break;
        case 3:
            ctx.drawImage(this.avatarImage[3], this.x, this.y, this.avatarWidth, this.avatarheight);
            break;
        case 4:
            ctx.drawImage(this.avatarImage[4], this.x, this.y, this.avatarWidth, this.avatarheight);
            break;
        case 5:
            ctx.drawImage(this.avatarImage[5], this.x, this.y, this.avatarWidth, this.avatarheight);
            break;
        case 6:
            ctx.drawImage(this.avatarImage[6], this.x, this.y, this.avatarWidth, this.avatarheight);
            break;
        case 7:
            ctx.drawImage(this.avatarImage[7], this.x, this.y, this.avatarWidth, this.avatarheight);
            break;
        default:
            break;
    }

    ctx.restore();
}
