var MainFactory = function() {
    // global model
    const phlappyBird = {
        metaData: {},
        viewObject : {
            bird : {
                // shape object
            },
            rect: [
                // shape object
                // Array <Array<Object>>
            ]

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
    const NUM_OF_WALL = 10;
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
    const randomIntGenerator = (min,max) => {
        return Math.round(min + Math.random() * (max-min))
    }
    const initializeRect = () =>{
        const { viewObject } = phlappyBird;
        const minNumRect = 2;
        const initPositionX = [350,450,550,650,750,850,950];
        for (let positionX of initPositionX) {
            const NumberOfBrick = randomIntGenerator(2,3);
            // console.log("initializeRect",NumberOfBrick);
            const listRects = [];
            const rectWidth = randomIntGenerator(90,60);
            let rectHeight = randomIntGenerator(200,300);
            let obstacle = new ObstacleFactory( {x : positionX, y : 0,height:rectHeight,width:rectWidth})
            listRects.push(obstacle);
            rectHeight = randomIntGenerator(200,300);
            obstacle = new ObstacleFactory( {x : positionX, y : canvas.height - rectHeight,height:rectHeight,width:rectWidth})
            listRects.push(obstacle);
            for (var i = 0; i < NumberOfBrick-minNumRect; i++) {
                obstacle = new ObstacleFactory( {x : positionX, y : canvas.height - rectHeight,height:rectHeight,width:rectWidth})
                listRects.push(obstacle);
            }
            viewObject.rect.push(listRects);

        }
        // console.log("viewObject",viewObject.rect);

    }
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
            ddy: 0.25,
            avatarImage: frameImage,
        };

        phlappyBird.viewObject.bird.factory = new BirdFactory(birdConfig);
        initializeRect();
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
            // let obstacle = new ObstacleFactory({x:100,y:100,height:100,width:90})

            // obstacle.draw(ctx);
            // console.log(phlappyBird.viewObject.rect);
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
