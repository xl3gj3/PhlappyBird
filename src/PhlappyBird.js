var MainFactory = function() {
	// global model
	const phlappyBird = {
		metaData: {},
		viewObject : {
			bird : [
				// shape object
			],
			obstacle: {
				top : [] ,
				bottom : []
			},
		},
		userControl: {},
		wallGap : 400 ,
        totalLayers : 38,
        maximunLayers : 30,
        minimunLayers : 7,
        brickHeight : 15,
        wallMovingSpeed : -20
	};
    /*
    viewObject : {
        bird : [
            {}
        ],
        topWall : [
            {},
            {}
            .
            .
            .
        ],
        botWall : [
            {},
            {}
            .
            .
            .
        ]
    }

*/
const main = {};

// define canvas object
var canvas = document.querySelector('canvas');
// hardcode canvas dimension
canvas.width = 1024;
canvas.height = 720;

var ctx = canvas.getContext('2d');

const renderer = new RendererFactory(phlappyBird, ctx);
const processor = new ProcessorFactory(phlappyBird);
// const utilityFunction = new Utilities();
const NUM_OF_WALL = 10;

const inputConfig = {
	'uiType': 'COMPUTER',
};
const userInput = new UserInputFactory(phlappyBird, inputConfig);

const processT = 8;
const renderT = 16;

main.loadImage = function(callback) {
	const NUM_OF_FRAMES = 4;
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

	const fileName= 'red-frame-';
	for (var i = 0; i < NUM_OF_FRAMES; i++) {
		let imgSrc = './assets/avatar/' + fileName + i + '.png';
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
	let start = Date.now(); // remember start time
	const initialNumberWall = 5;
	const obstaclePerWall = 2;
	const initialWallPositionX = [50];
    const { viewObject, brickHeight, wallMovingSpeed, totalLayers } = phlappyBird;
	for (var i = 0; i < initialNumberWall; i++) {
		initialWallPositionX.push( initialWallPositionX[i] + phlappyBird.wallGap)
	}
	// Create Bird Object
	const birdConfig = {
		x: 50,
		y: 50,
		dx: 0,
		dy: 1,
		ddx: 0,
		ddy: 0.5,
		avatarImage: frameImage,
	};
	const bFactory = {
		factory : new BirdFactory(birdConfig)
	}
	phlappyBird.viewObject.bird.push(bFactory);

	for (let i = 0; i < initialWallPositionX.length; i++) {
        let topPairLayer = 0;
        for (let wallPosition in viewObject.obstacle) {
            if (viewObject.obstacle.hasOwnProperty(wallPosition)) {
                let layers = 0;
                let initY = 0
                if (wallPosition === "top") {
                    initY = 0;
                    layers = mathUtilities.randomIntGenerator(phlappyBird.minimunLayers,phlappyBird.maximunLayers);
                    topPairLayer = layers;
                } else if (wallPosition === "bottom") {
                    layers = totalLayers - topPairLayer;
                    // console.log("bottom layers",layers);
                    initY = canvas.height - brickHeight * layers;
                } else {
                    initY = canvas.height * 0.5 ;
                }
                const obstacleConfig = {
                    x: initialWallPositionX[i],
                    y: initY,
                    dx: wallMovingSpeed,
                    dy: 0,
                    height : layers
                }
                const obstacleFactory = {
                    factory : new ObstacleFactory(obstacleConfig)
                }
                phlappyBird.viewObject.obstacle[wallPosition].push(obstacleFactory);
            }
        }
			// let initY = 0
			// if (j === 0) {
			// 	initY = 0;
			// } else {
			// 	initY = canvas.height;
			// }

	}
	// Create Obstable Object



	// Setup processor
	let processorTimer = setInterval(function() {
		// how much time passed from the start?
		let currTS = Date.now();
		processor.process(phlappyBird, processT,canvas);
	}, processT);

	// Setup renderer
	let rendererTimer = setInterval(function() {
		// how much time passed from the start?
		let currTS = Date.now();
		// draw the animation at the moment timePassed
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		renderer.render(phlappyBird, currTS);
	}, renderT);

	// Render App
	renderer.init(phlappyBird);
}

return main;
}


// index.html
var myGame = MainFactory();
// myGame.config({});
myGame.loadImage(function(frameImage) {
	myGame.start(frameImage);
});
