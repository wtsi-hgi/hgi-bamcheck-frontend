require.config({
//    baseUrl: 'js',

    paths: {
        jquery: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min',
        d3: 'https://cdnjs.cloudflare.com/ajax/libs/d3/3.4.11/d3.min'
    },
    shim: {
        d3: {
            //makes d3 available automatically for all modules
            exports: 'd3'
        }
    }
});
require(['js/src/readBCfile', 'js/src/qualityChart', 'js/src/ICcharts', 'js/src/ISchart', 'js/src/gcChart', 'js/src/gccChart', 'js/src/indelDist', 'js/src/GCDepth', 'js/src/coverage', 'js/src/mismatchChart', 'js/src/SNtable'], function (read, quality, ic, is, gc, gcc, id, gcDepth, coverage, mismatch, snTable) {

    function laneletUrl (lanelet) {
        return "https://hgi.dev.sanger.ac.uk/api/bamcheck/lanelet/" + encodeURIComponent(lanelet);
    }

    var charts = [];
    var formattedData = [];
    function loadGraph (lanelet) {
        if (formattedData[lanelet] == null) {
            formattedData[lanelet] = read(laneletUrl(lanelet));
        }
    }
    function unloadGraph (i) {
        if (formattedData[i] != null) {
            formattedData[i] = null;
        }
    }
    function drawGraph (lanelet) {
        charts = [];
        loadGraph(lanelet);
        d3.selectAll("svg").remove();
	d3.selectAll("dl").remove();
	var $laneletText = $( "<div><h2>" + lanelet.replace("%23", "#") + "</h2></div>" );
	$("#fileName").html($laneletText);
        ic(formattedData[lanelet], false, false, true);
        ic(formattedData[lanelet], true, false, true);
        charts.push(quality(formattedData[lanelet], "f", "      ", false, false));
        charts.push(quality(formattedData[lanelet], "r", "      ", true, false));
        is(formattedData[lanelet], false, true);
        gc(formattedData[lanelet], false, true);
        gcc(formattedData[lanelet], false, true);
        id(formattedData[lanelet]);
        gcDepth(formattedData[lanelet]);
        coverage(formattedData[lanelet]);
//	charts.push(mismatch(formattedData[lanelet], false, true));
	snTable(formattedData[lanelet], "summaryData");
//	$("#summaryData").html(JSON.stringify(formattedData[lanelet]["SN"]));
    }
    $("#laneletinput").change(function() {
	drawGraph($("#laneletinput").val());
    });

    var i = 0;
    window.onresize = function () {
        for(var i = 0; i < charts.length; i++){
            if(charts[i])
                charts[i].resize();
        }
    };
});
