var ProcessorFactory = function(model) {
    const localData = {};
    const processor = {};
    const utilityFunction = new Utilities();
    const wallSpawn = function (model,canvas) {
        const minNumRect = 2;
        const NumberOfBrick = utilityFunction.randomIntGenerator(2,3);
        // console.log("initializeRect",NumberOfBrick);
        const listRects = [];
        const rectWidth = utilityFunction.randomIntGenerator(90,60);
        let rectHeight = utilityFunction.randomIntGenerator(200,300);
        let obstacle = new ObstacleFactory( {x : 1024, y : 0,height:rectHeight,width:rectWidth,dx:model.wallMovingVelocity.dx})
        listRects.push(obstacle);
        rectHeight = utilityFunction.randomIntGenerator(200,300);
        obstacle = new ObstacleFactory( {x : 1024, y : canvas.height - rectHeight,height:rectHeight,width:rectWidth,dx:model.wallMovingVelocity.dx})
        listRects.push(obstacle);
        for (var i = 0; i < NumberOfBrick-minNumRect; i++) {
            obstacle = new ObstacleFactory( {x : 1024, y : canvas.height - rectHeight,height:rectHeight,width:rectWidth,dx:model.wallMovingVelocity.dx})
            listRects.push(obstacle);
        }
        model.viewObject['rect'].push(listRects);
    }
    processor.process = function(model, period,canvas) {
        // calculate all the physics logic here
        // - calculate velocity
        processor.movingObstacle(model, period,canvas);
        processor.physics(model, period);
        // - detect unit collision
        // - read user control

    }
    processor.movingObstacle = function (model, period,canvas){
        for (const type in model.viewObject) {
            if (type === "rect") {
                for (var i = 0; i <  model.viewObject[type].length; i++) {
                    for (const rect of model.viewObject[type][i]) {
                        // all the rects in the same wall share the same x position and samd width, so if one is out of range, pop whole array
                        if (rect.x + rect.width < 0) {
                            model.viewObject[type].shift();
                            wallSpawn(model,canvas);

                            break;
                        }else {
                            rect.move({x:rect.dx});
                        }
                        // calculate the new x position, if it will out of boundary, pop it from the array, and add the new one

                        // else, update the position
                    }
                }

            }
        }
        // console.log("model.viewObject[type]",model.viewObject["rect"]);
    }

    processor.physics = function(model, period) {
        for (const type in model.viewObject) {
            if (model.viewObject[type].factory) {
                const factory = model.viewObject[type].factory;
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

                model.viewObject[type].factory.move({
                    'x': shape.x,
                    'y': shape.y,
                    'dx': shape.dx,
                    'dy': shape.dy,
                });
            }
        }
    }

    return processor;
}
