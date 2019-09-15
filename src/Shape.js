var ObstacleFactory = function(wallOptions){
    // shape.prototype.draw();
    this.x = wallOptions.x;
    this.y = wallOptions.y;
    this.height = wallOptions.height;
    this.width = wallOptions.width;
    this.rgbArray = ['rgb(119, 54, 14)','rgb(140, 74, 13)','rgb(159, 91, 26)',
                    'rgb(119, 54, 14)','rgb(140, 74, 13)','rgb(159, 91, 26)','rgb(119, 54, 14)',
                    'rgb(140, 74, 13)','rgb(159, 91, 26)'];
}

ObstacleFactory.prototype.draw = function (ctx,canvas){
    // the bricks config will determined by
    const brickConfig = {
        height : 15,
        width : 45,
    };
    ctx.fillStyle = this.rgbArray[Math.floor(Math.random() * Math.floor(this.rgbArray.length-1))];
    ctx.fillRect(this.x , this.y, brickConfig.width,brickConfig.height);
    ctx.strokeStyle = "rgb(0,0,0)";
    ctx.strokeRect(this.x, this.y, brickConfig.width, brickConfig.height);
    // TEMP: we fix the number of layer and brick first, this will be determined by the given height and width
    const NumberOfLayer = Math.round(this.height/brickConfig.height);
    const NumberOfBrick = Math.round(this.width/brickConfig.width);
    // an obstacle is build by layers of bricks;
    // each brick has same height and width
    // trick is offset will start with "full bricks" and "half brick"
    /*
            ---*------*------*---
            ------*------*------
    */
    for (var i = 0; i < NumberOfLayer; i++) {
        let originX = this.x;
        if (i%2 === 1) {
            for (var k = 0; k < NumberOfBrick+1; k++) {
                if (k===0 || k===NumberOfBrick) {
                    ctx.fillStyle = this.rgbArray[Math.floor(Math.random() * Math.floor(this.rgbArray.length-1))];
                    ctx.fillRect(originX , this.y, brickConfig.width/2,brickConfig.height);
                    ctx.strokeStyle = "rgb(0,0,0)";
                    ctx.strokeRect(originX, this.y, brickConfig.width/2, brickConfig.height);
                    originX +=brickConfig.width/2;
                } else {
                    ctx.fillStyle = this.rgbArray[Math.floor(Math.random() * Math.floor(this.rgbArray.length-1))];
                    ctx.fillRect(originX , this.y, brickConfig.width,brickConfig.height);
                    ctx.strokeStyle = "rgb(0,0,0)";
                    ctx.strokeRect(originX, this.y, brickConfig.width, brickConfig.height);
                    originX +=brickConfig.width;
                }
            }
        } else {
            for (var j = 0; j < NumberOfBrick; j++) {
                ctx.fillStyle = this.rgbArray[Math.floor(Math.random() * Math.floor(this.rgbArray.length-1))];
                ctx.fillRect(originX , this.y, brickConfig.width,brickConfig.height);
                ctx.strokeStyle = "rgb(0,0,0)";
                ctx.strokeRect(originX, this.y, brickConfig.width, brickConfig.height);
                originX +=brickConfig.width;
            }
        }
        this.y += brickConfig.height;
        console.log("final x , the width" , originX-this.x);
    }
    console.log("final y , the height" , this.y-100);
    console.log(" given the height" , this.height);
    console.log(" givven width" , this.width);
    ctx.fillStyle = this.rgbArray[Math.floor(Math.random() * Math.floor(this.rgbArray.length-1))];

    ctx.fillRect(300, 100, this.width,this.height);
    ctx.fillRect(100, 600, this.width,this.height);




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
