var RendererFactory = function(model, ctx){
    const renderer = {
        ctx: ctx
    };

    renderer.init = function(model) {
        for (shape in model.viewObject) {
            // get individual shapeObj
            switch(shape) {
                case 'bird':
                    renderer.renderBird(model.viewObject.bird, 0);
                    break;
                case 'obstacle':
                    renderer.renderObstable(model.viewObject.obstacle);
                    break;
                default:
                    break;
            }
        }
    }

    renderer.render = function(model, currTS) {
        // loop through
        for (shape in model.viewObject) {
            // get individual shapeObj
            switch(shape) {
                case 'bird':
                    renderer.renderBird(model.viewObject.bird, currTS);
                    break;
                case 'obstacle':
                    renderer.renderObstable(model.viewObject.obstacle);
                    break;
                default:
                    break;
            }
        }
    }

    renderer.renderBird = function(bird, currTS) {
        for (let index = 0; index < bird.length; index++) {
            bird[index].factory.draw(currTS, renderer.ctx);
        }
    }

    renderer.renderObstable = function(obstableFactory) {
        for (const wallPosition in obstableFactory) {
            if (obstableFactory.hasOwnProperty(wallPosition)) {
                obstableFactory[wallPosition].map(wall=>{
                    wall.factory.draw(renderer.ctx)
                });
            }
        }
    }


    return renderer;
}
