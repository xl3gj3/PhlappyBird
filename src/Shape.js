/***************************************************
 *                Obstacle Factory
 **************************************************/
var ObstacleFactory = function(wallOptions) {
    // Brick settings
    this.brickConfig = {
        height : 15,
        width : 45
    }
    // wall settings
    this.x = wallOptions.x;
    this.y = wallOptions.y;
    this.dx = wallOptions.dx;
    this.dy = wallOptions.dy;
    this.height = wallOptions.height
    this.numberPerLayer = 4;
    this.wallColor = 'rgb(119, 54, 14)';
}

ObstacleFactory.prototype.draw = function(ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.rect(this.x, this.y, 135, this.brickConfig.height * this.height);
    ctx.clip();
    this.drawrWall(ctx);
    ctx.restore();
    // ctx.stroke();
}

ObstacleFactory.prototype.drawrWall = function(ctx) {
    let y = this.y;
    for (let index = 0; index < this.height; index++) {
        if (index % 2 === 0) {
            this.drawOneLayerOfBricks(true,ctx,y);

        } else {
            this.drawOneLayerOfBricks(false,ctx,y);
        }
        y  += this.brickConfig.height
    }
    // this.drawBrick(ctx);

}

ObstacleFactory.prototype.drawOneLayerOfBricks = function(offset, ctx, y) {
    let x = this.x;
    if (offset) {
        x = this.x - this.brickConfig.width/2;
    }
    for (let index = 0; index < this.numberPerLayer; index++) {
        this.drawBrick(ctx,x,y);
        x += this.brickConfig.width;
    }
}

ObstacleFactory.prototype.drawBrick = function(ctx, x, y) {
    ctx.save();
    ctx.beginPath();
    ctx.rect(x, y, this.brickConfig.width, this.brickConfig.height);
    ctx.fillStyle = this.wallColor;
    ctx.fillRect(x, y, this.brickConfig.width, this.brickConfig.height);
    ctx.stroke();
    ctx.restore();
}

ObstacleFactory.prototype.move = function(curPosition, actionType) {
    // update x and y
    const canvas = document.querySelector('canvas');
    // console.log(actionType);
    // console.log(curPosition);
    switch(actionType) {
        case 'constantMovement':
            this.x = curPosition.x
            this.dx = curPosition.dx;
            break;
        default:
            break;
    }
}

/***************************************************
 *                 Bird Factory
 **************************************************/

var BirdFactory = function(avatarOptions) {
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

BirdFactory.prototype.move = function(curPosition, actionType) {
    // update x and y
    const canvas = document.querySelector('canvas');
    switch(actionType) {
        case 'gravity':
            if (this.y + this.avatarheight < canvas.height) {
                this.x = curPosition.x;
                this.y = curPosition.y;
                this.dx = curPosition.dx;
                this.dy = curPosition.dy;
            }
            break;
        case 'moveup':
            if (this.y > 0) {
                this.dy = curPosition.dy;
            }
            break;
        default:
            break;
    }

}


BirdFactory.prototype.draw = function(currentTime, ctx) {
    ctx.save();

    let frame = 0;
    if (this.startTime === 0) {
        this.startTime = currentTime;
    } else {
        frame = Math.floor( (currentTime - this.startTime ) / this.frameTick ) % 2;
    }

    if (this.dy > 0) {
        // Normal state, use the same frame as the bird is not flying
        switch(frame) {
            case 0:
                ctx.drawImage(this.avatarImage[1], this.x, this.y, this.avatarWidth, this.avatarheight);
                break;
            case 1:
                ctx.drawImage(this.avatarImage[1], this.x, this.y, this.avatarWidth, this.avatarheight);
                break;
            default:
                break;
        }
    } else {
        // speed up state
        switch(frame) {
            case 0:
                ctx.drawImage(this.avatarImage[2], this.x, this.y, this.avatarWidth, this.avatarheight);
                break;
            case 1:
                ctx.drawImage(this.avatarImage[3], this.x, this.y, this.avatarWidth, this.avatarheight);
                break;
            default:
                break;
        }
    }

    ctx.restore();
}
