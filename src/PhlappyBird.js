var MainFactory = function() {
    // global model
    const phlappyBird = {
        metaData: {},
        viewObject : {
            bird : {
                // shape object
            },
            rect: {
                // shape object
                // Array <Array<Object>>
            },
        },
        userControl: {},
    };
    // const defaultConfig = {
    //     // has something
    // };
    // let config = {};

    const main = {};

    // define canvas object
    var canvas = document.querySelector('canvas');
    // hardcode canvas dimension
    canvas.width = 600;
    canvas.height = 800;

    var ctx = canvas.getContext('2d');

    // const processor = ProcessorFactory(phlappyBird);
    // const userInput = UserInputFactory(phlappyBird);

    // const renderer = RendererFactory(phlappyBird, c);

    // processor.process();
    // main.config = function(userConfig) {
    //     // do some config
    //     let config = {
    //         ...defaultConfig,
    //         ...userConfig
    //     };
    // };

    main.start = function () {
        // while(true) {
        //     // a timer to track period
        //     processor.process(); // for example, 5t
        //     renderer.render();// for example, 10t
        // }
        let obstacle = new ObstacleFactory({x:100,y:100,height:450,width:180})
        let bird = new BirdFactory({x: 10, y: 10});
        bird.draw(0, ctx, canvas);
        obstacle.draw(ctx, canvas);
    }

    return main;
}


// index.html
var myGame = MainFactory();
// myGame.config({});
myGame.start();
