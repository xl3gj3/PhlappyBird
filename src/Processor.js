var ProcessorFactory = function(model) {
	const localData = {};
	const processor = {};
    let topWallLayers = 0;
    processor.calculate = function (element,type,period,actionTypes) {
        if (element.factory) {
            const factory = element.factory;
            const shape = {};
            shape.y = factory.y || 0;
            shape.dy = factory.dy || 0;
            shape.x = factory.x || 0;
            shape.dx = factory.dx || 0;

            const accelerationX = factory.ddx || 0;
            const accelerationY = factory.ddy || 0;
            const velocityY = shape.dy || 0;
            const velocityX = shape.dx || 0;


            shape.y += velocityY * period / 10;
            shape.dy += accelerationY * period / 100;
            shape.x += velocityX * period / 100;
            shape.dx += accelerationX * period / 100;
            element.factory.move({
                'x': shape.x,
                'y': shape.y,
                'dx': shape.dx,
                'dy': shape.dy,
            }, actionTypes[type]);
            if (type === "obstacle") {
                if (Math.floor(shape.x + 135) < 0) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    }
	processor.process = function(model, period, canvas) {
		// calculate all the physics logic here
		// - calculate velocity
		processor.physics(model, period, canvas);
		// - detect unit collision
		// - read user control

	}
	processor.addWall = function(model, wallPosition, canvas){
        const { wallMovingSpeed, minimunLayers, maximunLayers, brickHeight, totalLayers, wallGap } = model;
        let layers = 0;
        let initY = 0
		const testIndex = model.viewObject.obstacle[wallPosition].length - 1;
		let lastWallPosition = model.viewObject.obstacle[wallPosition][testIndex].factory.x;
        if (wallPosition === "top") {
            layers = mathUtilities.randomIntGenerator(minimunLayers, maximunLayers);
            topWallLayers = layers;
            initY = 0;
        } else if (wallPosition === "bottom") {
            layers = totalLayers - topWallLayers;

            initY = canvas.height - brickHeight * layers;
        } else {
            initY = canvas.height * 0.5 ;
        }
        const obstacleConfig = {
            x: lastWallPosition + 200 + wallGap,
            y: initY,
            dx: wallMovingSpeed,
            dy: 0,
            height : layers
        }
        const obstacleFactory = {
            factory : new ObstacleFactory(obstacleConfig)
        }
        model.viewObject.obstacle[wallPosition].push(obstacleFactory);
		// const lastIndex = model.viewObject[type].length - 1;
		// let x = model.viewObject[type][lastIndex].factory.x + model.wallGap
		// // if (positionY > 0) {
        //
		// // 	x = model.viewObject[type][lastIndex].factory.x + model.wallGap
		// // } else {
		// // 	x = model.viewObject[type][lastIndex].factory.x + model.wallGap
		// // }
		// const obstacleConfig = {
		// 	x: x,
		// 	y: positionY,
		// 	dx: -3,
		// 	dy: 0,
		// 	height : 10
		// }
		// const obstacleFactory = {
		// 	factory : new ObstacleFactory(obstacleConfig)
		// }
		// model.viewObject[type].push(obstacleFactory);

	}
	processor.physics = function(model, period, canvas) {
        const { viewObject } = model;
		const actionTypes = {
			'bird': 'gravity',
			'obstacle': 'constantMovement',
		}
		/*
		// model.viewObject[type] = [
		[
		{
		factory : {}
	}
]
,[{facatory:{}}]]

*/
	for (const type in model.viewObject) {
        if (Array.isArray(model.viewObject[type])) {
            for (let index = 0; index < model.viewObject[type].length; index++) {
                const element = model.viewObject[type][index];
                processor.calculate(element,type,period,actionTypes);
            }
        } else {
            for (const wallPosition in viewObject[type]) {
                if (viewObject[type].hasOwnProperty(wallPosition)) {
                    viewObject[type][wallPosition].map(element=>{
                        const removeFlag = processor.calculate(element,type,period,actionTypes);
                        if (removeFlag) {
                            viewObject[type][wallPosition].shift();
                            processor.addWall(model,wallPosition, canvas);
                            // console.log("removeFlag",removeFlag,"wallPosition",wallPosition);
                        }
                    })
                }
            }
            // console.log("type object",type);
        }


	}
}



return processor;
}
