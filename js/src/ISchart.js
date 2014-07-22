define(['js/src/dotPlot'], function(dotPlot){
    var keysIS = ["totalPairs", "inwardPairs", "outwardPairs", "otherPairs"];
    return function (data, divID, legend, title, width, height) {
        if(title && data["TITLE"]){
          title = data["TITLE"].title;
        }
        if(data && data["IS"] && data["IS"][1] && data["IS"][1].values && data["IS"][1].values.length !== 0){
            return new dotPlot(data["IS"], divID, legend, title, keysIS, width, height);
        }else{
          window.console.log('data does not exist; IS chart not created.');
          return null;
        }
    };
});