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
    canvas.width = 1024;
    canvas.height = 800;

    var ctx = canvas.getContext('2d');

    // const userInput = UserInputFactory(phlappyBird);

    const renderer = new RendererFactory(phlappyBird, ctx);
    const processor = new ProcessorFactory(phlappyBird);
    const utilityFunction = new Utilities();
    const NUM_OF_WALL = 10;

    const inputConfig = {
        'uiType': 'COMPUTER',
    };
    const userInput = new UserInputFactory(phlappyBird, inputConfig);

    const processT = 25;
    const renderT = 50;

    // processor.process();
    // main.config = function(userConfig) {
    //     // do some config
    //     let config = {
    //         ...defaultConfig,
    //         ...userConfig
    //     };
    // };

    main.loadImage = function(callback) {
        const NUM_OF_FRAMES = 8;
        let frameImage = [];

        let loaded = 0;
        let _log = {
            success: [],
            error: []
        };

        let verifier = function() {
            loaded++;

            if (loaded == NUM_OF_FRAMES) {
                console.log('All the images are loaded.');
                console.log(_log);
                callback(frameImage);
            }
        };

        for (var i = 0; i < NUM_OF_FRAMES; i++) {
            let imgSrc = './assets/avatar/frame_trans_' + i + '.png';
            frameImage[i] = document.createElement("img");
            frameImage[i].setAttribute('id', 'avatar-frame-' + i);
            frameImage[i].setAttribute('src', imgSrc);
            frameImage[i].addEventListener('load', function() {
                _log.success.push(imgSrc);
                verifier();
            });
            frameImage[i].addEventListener('error', function() {
                _log.error.push(imgSrc);
                verifier();
            });
        }
    }

    main.start = function(frameImage) {
        // while(true) {
        //     // a timer to track period
        //     processor.process(); // for example, 5t
        //     renderer.render();// for example, 10t
        // }
        let start = Date.now(); // remember start time   
        const birdConfig = {
            x: 10,
            y: 10,
            dx: 0,
            dy: 1,
            ddx: 0,
            ddy: 0.5,
            avatarImage: frameImage,
        };

        phlappyBird.viewObject.bird.factory = new BirdFactory(birdConfig);
        renderer.init(phlappyBird);

        let processorTimer = setInterval(function() {
            // how much time passed from the start?
            let currTS = Date.now();
            processor.process(phlappyBird, processT);
        }, processT);

        let rendererTimer = setInterval(function() {
            // how much time passed from the start?
            let currTS = Date.now();

            // draw the animation at the moment timePassed
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            renderer.render(phlappyBird, currTS);
        }, renderT);
    }

    return main;
}


// index.html
var myGame = MainFactory();
// myGame.config({});
myGame.loadImage(function(frameImage) {
    myGame.start(frameImage);
});

