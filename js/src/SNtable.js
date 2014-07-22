define(['jquery', 'd3', 'js/src/divSelections'], function(jQuery, d3, checkDivSelection){
    return function (data, divID, width, height) {
        if(data && data["SN"] && data["SN"][1] && data["SN"][1].values && data["SN"][1].values.length !== 0){
            divID = checkDivSelection(divID);
	    var dl = d3.select(divID).append('dl');
	    
	    var get_key = function(d) { return d && d.xVar; };
	    var get_value = function(d) { return d && d.yVar; };
	    var ident = function(d) { return d; };

	    var snspans = dl.selectAll('span').data(data["SN"][1].values).enter().append('span');
	    snspans.each(function(d, i) {
		var span = d3.select(this);
		span.append('dt').text(get_key);
		span.append('dd').text(get_value);
	    });

        }else{
            window.console.log('data does not exist; SN table not created.');
            return null;
        }
    };
});