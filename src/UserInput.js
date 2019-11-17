var UserInputFactory = function(model, config) {
    let keyCode = null;
    switch (config.uiType) {
        // load browser factory
        case 'COMPUTER':
            // space
            keyCode = 32;
            window.addEventListener('keydown', function(e){
                if (e.keyCode == keyCode) {
                    model.viewObject['bird'].factory.move({
                        'dy': -2,
                    }, 'moveup');
                }
            });
            break;
        default:
            break;

    }

}