var RendererFactory = function(model, ctx){
    const renderer = {
        ctx: ctx
    };

    renderer.init = function(model) {
        for (shape in model.viewObject) {
            // get individual shapeObj
            switch(shape) {
                case 'bird':
                    renderer.renderBird(
                        model.viewObject.bird.factory,
                        0);
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
                    renderer.renderBird(
                        model.viewObject.bird.factory,
                        currTS);
                    break;
                default:
                    break;
            }
        }
    }

    renderer.renderBird = function(birdFactory, currTS) {
        birdFactory.draw(currTS, renderer.ctx);
    }

    return renderer;
}