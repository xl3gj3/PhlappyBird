let Utilities = function (){
    const utility = {};

    utility.randomIntGenerator = function (min,max){
        return Math.round(min + Math.random() * (max-min));
    }

    return utility;
}
