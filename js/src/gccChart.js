define(['js/src/dotPlot'], function(dotPlot){
    var keysGCC = ["A", "C", "G", "T"];
    return function (data, divID, legend, title, width, height) {
        if(title && data["TITLE"]){
          title = data["TITLE"].title;
        }
        if(data && data["BC"] && data["BC"][1] && data["BC"][1].values && data["BC"][1].values.length !== 0){
            return new dotPlot(data["BC"], divID, legend, title, keysGCC, width, height);
        }else{
            window.console.log('data does not exist; chart not created.');
            return null;
        }
    };
});