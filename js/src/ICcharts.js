define(['js/src/dotPlot'], function(dotPlot){
    var keysIC = {
        all: ["insertions_fwd","deletions_fwd","insertions_rev","deletions_rev"],
        fwd: ["insertions_fwd","deletions_fwd"],
        reverse: ["insertions_rev","deletions_rev"]
    };
    return function (data, split, divID, legend, title, width, height) {
        if(title && data["TITLE"]){
            title = data["TITLE"].title;
        }
        if(data && data["IC"] && data["IC"][1] && data["IC"][1].values && data["IC"][1].values.length !== 0){
            if(split){
                var returnValue;
                returnValue = [new dotPlot(data["IC"], divID, false, "Indels per cycle(forward)", keysIC.fwd, width, height, "_fwd"), new dotPlot(data["IC"], divID, true, "Indels per cycle(reverse)", keysIC.reverse, width, height, "_rev")];
                //check to which graph has the larger domain and change them to be equal.
                if(returnValue[0].y.domain()[1] < returnValue[1].y.domain()[1]){
                    returnValue[0].y.domain(returnValue[1].y.domain());
                    returnValue[0].resetDomain();
                }else if(returnValue[0].y.domain()[1] > returnValue[1].y.domain()[1]){
                    returnValue[1].y.domain(returnValue[0].y.domain());
                    returnValue[1].resetDomain();
                }
                return returnValue;
            }else{
                return new dotPlot(data["IC"], divID, legend, title, keysIC.all, width, height);
            }
        }else{
            window.console.log('data does not exist; chart not created.');
            return null;
        }
    };
});