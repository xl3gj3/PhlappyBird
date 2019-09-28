var ObstacleFactory = function(wallOptions){
    // shape.prototype.draw();
    this.brickConfig = {
        height : 7,
        width : 21,
    };
    this.x = wallOptions.x;
    this.y = wallOptions.y;
    this.height = wallOptions.height;
    this.width = wallOptions.width;
    this.dx = wallOptions.dx;
    this.rgbArray = ['rgb(119, 54, 14)','rgb(140, 74, 13)','rgb(159, 91, 26)',
                    'rgb(119, 54, 14)','rgb(140, 74, 13)','rgb(159, 91, 26)','rgb(119, 54, 14)',
                    'rgb(140, 74, 13)','rgb(159, 91, 26)'];
    this.NumberOfLayer = Math.round(this.height/this.brickConfig.height);
    this.NumberOfBrick = Math.round(this.width/this.brickConfig.width);
    this.rgbPerLayer = [];

    for (var i = 0; i < this.NumberOfLayer; i++) {
        const layerrgbArray = this.rgbArray.sort(function(a, b){return 0.5 - Math.random()});
        const layerColor = []
        for (var j = 0;j < this.NumberOfBrick; j++) {
            layerColor.push(layerrgbArray[j]);
        }
        this.rgbPerLayer.push(layerColor);
    }
}
ObstacleFactory.prototype.move = function(curPosition){
  // update x only
  this.x = this.x - curPosition.x;
}
ObstacleFactory.prototype.draw = function (ctx){
    // the bricks config will determined by
    // const brickConfig = {
    //     height : 7,
    //     width : 21,
    // };
    // console.log("this.rgbPerLayer",this.rgbPerLayer);
    // let originRGBArray = this.rgbArray;
    // ctx.fillStyle = this.rgbArray[Math.floor(Math.random() * Math.floor(this.rgbArray.length-1))];
    // ctx.fillRect(this.x , this.y, brickConfig.width,brickConfig.height);
    // ctx.strokeStyle = "rgb(0,0,0)";
    // ctx.strokeRect(this.x, this.y, brickConfig.width, brickConfig.height);
    // TEMP: we fix the number of layer and brick first, this will be determined by the given height and width
    // const NumberOfLayer = Math.round(this.height/brickConfig.height);
    // const NumberOfBrick = Math.round(this.width/brickConfig.width);
    // an obstacle is build by layers of bricks;
    // each brick has same height and width
    // trick is offset will start with "full bricks" and "half brick"
    /*
            ---*------*------*---
            ------*------*------
    */
    let originY = this.y;
    for (var i = 0; i < this.NumberOfLayer; i++) {
        let originX = this.x;
        if (i%2 === 1) {
            for (var k = 0; k < this.NumberOfBrick+1; k++) {
                if (k===0 || k===this.NumberOfBrick) {
                    ctx.fillStyle = this.rgbPerLayer[i][k];
                    ctx.fillRect(originX , this.y, this.brickConfig.width/2,this.brickConfig.height);
                    ctx.strokeStyle = "rgb(0,0,0)";
                    ctx.strokeRect(originX, this.y, this.brickConfig.width/2, this.brickConfig.height);
                    originX +=this.brickConfig.width/2;
                    // this.rgbArray.push(firstBrickColor);
                } else {
                    ctx.fillStyle = this.rgbPerLayer[i][k];
                    ctx.fillRect(originX , this.y, this.brickConfig.width,this.brickConfig.height);
                    ctx.strokeStyle = "rgb(0,0,0)";
                    ctx.strokeRect(originX, this.y, this.brickConfig.width, this.brickConfig.height);
                    originX +=this.brickConfig.width;
                    // this.rgbArray.push(firstBrickColor);
                }
                let firstBrickColor = this.rgbArray.shift();
                this.rgbArray.push(firstBrickColor);

            }
        } else {
            for (var j = 0; j < this.NumberOfBrick; j++) {
                ctx.fillStyle = this.rgbPerLayer[i][j];
                ctx.fillRect(originX , this.y, this.brickConfig.width,this.brickConfig.height);
                ctx.strokeStyle = "rgb(0,0,0)";
                ctx.strokeRect(originX, this.y, this.brickConfig.width, this.brickConfig.height);
                originX +=this.brickConfig.width;
                let firstBrickColor = this.rgbArray.shift();
                this.rgbArray.push(firstBrickColor);
            }
        }
        this.y += this.brickConfig.height;
        // console.log("final x , the width" , originX-this.x);
    }
     this.y = originY;
     // this.rgbArray = originRGBArray;

    // console.log("this.y",this.y);
    // console.log("final y , the height" , this.y-100);
    // console.log(" given the height" , this.height);
    // console.log(" givven width" , this.width);
    // ctx.fillStyle = this.rgbArray[Math.floor(Math.random() * Math.floor(this.rgbArray.length-1))];
    //
    // ctx.fillRect(300, 100, this.width,this.height);
    // ctx.fillRect(100, 600, this.width,this.height);




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
