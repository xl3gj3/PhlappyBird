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
                        model.viewObject.bird.config,
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
                        model.viewObject.bird.config,
                        currTS);
                    break;
                default:
                    break;
            }
        }
    }

    renderer.renderBird = function(birdFactory, config, currTS) {
        birdFactory.draw(currTS, renderer.ctx);
    }

    return renderer;
}