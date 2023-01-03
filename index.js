var parse = require("./parseUrl.js");

const arrayUrl = [];

const makeUrl = (countUrl) => {
    for(var i = 0; i < countUrl; i++){
        arrayUrl.push(`https://tsdr.uspto.gov/statusview/sn${77354081 - i}`)
    }
}

makeUrl(500000);

const syncParse = () => {
    for (var i = 0; i < arrayUrl.length; i++) {
        setTimeout((function(index){ 
          return function() {
            parse.parseUrl(arrayUrl[index]);
            console.log(arrayUrl[index]);
          };
        })(i), 3000 * (i + 1))
    }    
}

syncParse();