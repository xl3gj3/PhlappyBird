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
    this.startTime = 0;
    this.frameTick = 50; // ms
};

BirdFactory.prototype.draw = function(currentTime, ctx, canvas) {
    ctx.save();
    ctx.arc(this.x, this.y, 10, 0, Math.PI * 2, false);
    ctx.fillStyle = 'blue';
    ctx.fill();

    // let frame = 1;
    // if (this.startTime === 0) {
    //     this.startTime = currentTime;
    // } else {
    //     frame = Math.floor( (currentTime - this.startTime ) / this.frameTick ) % 6;
    // }

    // switch(frame) {
    //     case 1:
    //         this.drawFrame1(currentTime, ctx, canvas);
    //         break;
    //     default:
    //         break;
    // }

    ctx.restore();
}
