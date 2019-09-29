var ProcessorFactory = function(model) {
    const localData = {};
    const processor = {};

    processor.process = function(model, period) {
        // calculate all the physics logic here
        // - calculate velocity
        processor.physics(model, period);
        // - detect unit collision
        // - read user control

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
