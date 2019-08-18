var ObstacleFactory = function(wallOptions){
	/*cosnt */
	const separateLineWidthRatio = 0.03;
	const segmentMaxWdithRatio = 0.4;
	const segmentMinWdithRatio = 0.05;

	/*Obeject Params*/
	this.wallHeight = 400;
	this.wallWidth = 100;
	this.separateLine = this.wallWidth * separateLineWidthRatio;
	this.segmentMaxHeight = 10;
	this.segmentMaxWdith = this.wallWidth * segmentMaxWdithRatio;
	this.segmentMinWdith = this.wallWidth * segmentMinWdithRatio;
	this.maxSegmentNumber = 6;
	this.minSegmentNumber = 3;
	this.segmentNumber = Math.round(this.minSegmentNumber+ Math.random()*(this.maxSegmentNumber-this.minSegmentNumber));;
	this.numberLayers = this.wallHeight/(this.separateLine + this.segmentMaxHeight);;
	this.startPointY = wallOptions.y;
	this.startPointX = wallOptions.x;
	this.originPostionX = wallOptions.x;
	this.rgbArray = ['rgb(119, 54, 14)','rgb(140, 74, 13)','rgb(159, 91, 26)','rgb(119, 54, 14)','rgb(140, 74, 13)','rgb(159, 91, 26)','rgb(119, 54, 14)','rgb(140, 74, 13)','rgb(159, 91, 26)'];

}
ObstacleFactory.prototype.draw = function(ctx,canvas){
	for (var i = 0; i < this.numberLayers; i++) {
		// console.log("layer number ", i+1);
		this.startPointX= this.originPostionX;
		let segmentXPostion = this.startPointX;
		let actualWallLength = 0;
		let lastPieceWidth = this.wallWidth;
		// if (i === 0) {
		//   ctx.fillStyle = 'rgb(128,128,128)';
		//   ctx.fillRect(startPointX, startPointY, actualWallLength, separateLine);
		//   startPointY += separateLine;
		// }
		// render each block
			for (var j = 0; j < this.segmentNumber; j++) {

				// console.log("j ", j);

				if (j === this.segmentNumber -1) {
				// if this piece is the last pice of the current layer, we use the lasePieceWidth to render
				if (lastPieceWidth < 0) {
				  continue;
				}

				ctx.fillStyle = this.rgbArray[Math.floor(Math.random() * Math.floor(this.rgbArray.length-1))];
				ctx.fillRect(this.startPointX , this.startPointY, lastPieceWidth, this.segmentMaxHeight+this.separateLine);
				this.startPointX += this.segmentMaxWdith;
				actualWallLength += lastPieceWidth;
				}else {
					// we we generate random width of each segments
					let actualSegmentWidth = Math.floor(this.segmentMinWdith+Math.random() * Math.floor(this.segmentMaxWdith - this.segmentMinWdith));
					if ((lastPieceWidth - actualSegmentWidth) < 0) {
						// console.log("segment number ", j+1);
						// console.log("lastPieceWidth will be", lastPieceWidth - actualSegmentWidth);
						actualSegmentWidth += ( lastPieceWidth - actualSegmentWidth);
					}
					ctx.fillStyle = this.rgbArray[Math.floor(Math.random() * Math.floor(this.rgbArray.length-1))];
					ctx.fillRect(this.startPointX , this.startPointY, actualSegmentWidth, this.segmentMaxHeight+this.separateLine);
					this.startPointX += actualSegmentWidth;
					actualWallLength += actualSegmentWidth;
					lastPieceWidth = lastPieceWidth - actualSegmentWidth;
					// console.log("draw segement number", j+1, " x posion ",this.startPointX," Y posion ",this.startPointY, " Last piece width" ,lastPieceWidth ," actual segment width", actualSegmentWidth);

				}
				if ( j+1 < this.segmentNumber ) {
					// if the segment we just render last piece, we draw the sapearte line
					// console.log("print the saperate line, x is ", startPointX , " y is ",startPointY);
					// console.log("lastPieceWidth will be", lastPieceWidth);

					if (lastPieceWidth <= this.separateLine) {

						continue;

					}
					ctx.fillStyle = 'rgb(128,128,128)';
					ctx.fillRect(this.startPointX, this.startPointY, this.separateLine, this.segmentMaxHeight+this.separateLine);
					actualWallLength += this.separateLine;
					lastPieceWidth = lastPieceWidth - this.separateLine;

					this.startPointX += this.separateLine;
				}
			}
			this.startPointY += this.segmentMaxHeight;
			if (i+1 < this.numberLayers ) {
				ctx.fillStyle = 'rgb(128,128,128)';
				ctx.fillRect(segmentXPostion, this.startPointY, actualWallLength, this.separateLine);
				this.startPointY += this.separateLine;
			}
			// console.log("\n\n\n");
	}
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
