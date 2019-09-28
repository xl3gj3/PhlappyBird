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
                case 'rect':
                    renderer.renderRect(model.viewObject.rect);
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
                case 'rect':
                    renderer.renderRect(model.viewObject.rect);
                    break;
                default:
                    break;
            }
        }
    }

    renderer.renderBird = function(birdFactory, currTS) {
        birdFactory.draw(currTS, renderer.ctx);
    }
    renderer.renderRect = function(rectArray) {
        // console.log("rect factory");
        for (let wall of rectArray) {
            for (let rect of wall) {
                rect.draw(renderer.ctx);

            }
        }

    }
    return renderer;
}
