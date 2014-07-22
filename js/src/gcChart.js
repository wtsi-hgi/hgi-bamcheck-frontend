define(['js/src/dotPlot'], function(dotPlot){
    var keysGC = ["First_Fragments", "Last_Fragments"];
    return function (data, divID, legend, title, width, height) {
        if(title && data["TITLE"]){
          title = data["TITLE"].title;
        }
        if(data && data["GC"] && data["GC"][1] && data["GC"][1].values && data["GC"][1].values.length !== 0){
            return new dotPlot(data["GC"], divID, legend, title, keysGC, width, height);
        }else{
          window.console.log('data does not exist; chart not created.');
          return null;
        }
    };
});