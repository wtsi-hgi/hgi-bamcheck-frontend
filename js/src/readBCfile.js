define(['jquery'], function(jQuery){
	function readFile(fileName) {
		var returnValue;
		//check if file name contians only whitespace
		if(/\S/.test(fileName)){
			jQuery.ajax({
				type: "GET",
				dataType: "text",
				async: false,
				url: fileName,
				crossDomain: true,
				success: function (text) {
					//console.log(text);
					var contentsOfFileAsString = text;
					returnValue = d3.tsv.parseRows(contentsOfFileAsString);
					returnValue.unshift('#' + fileName);
				},
				error: function (x, status, error) {
					window.console.log(status + ": " + error);
					//window.console.log(x);
					returnValue = null;
				}
			});
		}
		return returnValue;
	}
	return function (fileName) {
		var formattedData = null;
		var fileString = readFile(fileName);
		if(fileString && typeof fileString === "object" && fileString.length > 0){
		    formattedData = {
			"IC": [
			    {
				"xLabel": "Cycle",
				"yLabel": "Indel"},
			    {
				"name": "insertions_fwd",
				"values": []
			    },
			    {
				"name": "deletions_fwd",
				"values": []
			    },
			    {
				"name": "insertions_rev",
				"values": []
			    },
			    {
				"name": "deletions_rev",
				"values": []
			    }
			],
			"IS": [
			    {
				"xLabel": "Insert Size",
				"yLabel": "Pairs"},
			    {
				"name": "totalPairs",
				"values": []
			    },
			    {
				"name": "inwardPairs",
				"values": []
			    },
			    {
				"name": "outwardPairs",
				"values": []
			    },
			    {
				"name": "otherPairs",
				"values": []
			    }
			],
			"FFQ":	[
			    {
				"xLabel": "Cycle Number(forward read)",
				"yLabel": "Quality"
			    },
			    {
				"values":[]
			    }
			],
			"LFQ":	[
			    {
				"xLabel": "Cycle Number(reverse read)",
				"yLabel": "Quality"
			    },
			    {
				"values":[]
			    }
			],
			"MPC":	[
			    {
				"xLabel": "Cycle Number",
				"yLabel": "Quality"
			    },
			    {
				"values":[]
			    }
			],
			"GC":	[
			    {
				"xLabel": "GC Content (%)",
				"yLabel": "Normalised Frequency"
			    },
			    {
				"name": "First_Fragments",
				"values":[]
			    },
			    {
				"name": "Last_Fragments",
				"values":[]
			    }
			],
			"BC":	[
			    {
				"xLabel": "Read Cycle",
				"yLabel": "Base Content(%)"},
			    {
				"name": "A",
				"values": []
			    },
			    {
				"name": "C",
				"values": []
			    },
			    {
				"name": "G",
				"values": []
			    },
			    {
				"name": "T",
				"values": []
			    }
			],
			"ID":	[
			    {
				"xLabel": "Indel Length",
				"yLabelLeft": "Indel Count",
				"yLabelRight": "Insertions/Deletions Ratio"},
			    {
				"name": "insertions",
				"values": []
			    },
			    {
				"name": "deletions",
				"values": []
			    }
			],
			"COV":	[
			    {
				"xLabel": "Coverage",
				"yLabel": "Nummber of Mapped Bases"},
			    {
				"name": "Coverage",
				"values": []
			    }
			],
			"GCD":	[
			    {
				"xLabel": "Percentile of Mapped Sequence Ordered By GC Content",
				"yLabel": "Mapped Depth"},
			    {
				"name": "10-90th Percentile",
				"values": []
			    },
			    {
				"name": "25-75th Percentile",
				"values": []
			    },
			    {
				"name": "50th Percentile",
				"values": []
			    },
			    {
				"values": []
			    }
			],
			"SN":   [
			    {
				"xLabel": "Summary Number",
				"yLabel": "Value"
			    },
			    {
				"name": "Summary Numbers",
				"values": []
			    }
			],
			"TITLE": {
			    "title": fileString[0].replace('#', '').replace('%23', '#')
			}
		    };
		    for (var i = 0; i < fileString.length; i++) {
				switch (fileString[i][0]){
					case "IC":
						formattedData["IC"][1].values.push({xVar: +fileString[i][1], yVar: +fileString[i][2], name: "insertions_fwd"});
						formattedData["IC"][3].values.push({xVar: +fileString[i][1], yVar: +fileString[i][3], name: "insertions_rev"});
						formattedData["IC"][2].values.push({xVar: +fileString[i][1], yVar: +fileString[i][4], name: "deletions_fwd"});
						formattedData["IC"][4].values.push({xVar: +fileString[i][1], yVar: +fileString[i][5], name: "deletions_rev"});
						break;
					case "IS":
						formattedData["IS"][1].values.push({xVar: +fileString[i][1], yVar: +fileString[i][2], name: "totalPairs"});
						formattedData["IS"][2].values.push({xVar: +fileString[i][1], yVar: +fileString[i][3], name: "inwardPairs"});
						formattedData["IS"][3].values.push({xVar: +fileString[i][1], yVar: +fileString[i][4], name: "outwardPairs"});
						formattedData["IS"][4].values.push({xVar: +fileString[i][1], yVar: +fileString[i][5], name: "otherPairs"});
						break;
					case "FFQ":
						formattedData["FFQ"][1].values.push({xVar: +fileString[i][1], yVar:getQualityVals(fileString[i])});
						break;
					case "LFQ":
						formattedData["LFQ"][1].values.push({xVar: +fileString[i][1], yVar:getQualityVals(fileString[i])});
						break;
					case "MPC":
						formattedData["MPC"][1].values.push({xVar: +fileString[i][1], yVar:getQualityVals(fileString[i])});
						break;
					case "GCF":
						formattedData["GC"][1].values.push({xVar: +fileString[i][1], yVar: +fileString[i][2], name: "First_Fragments"});
						break;
					case "GCL":
						formattedData["GC"][2].values.push({xVar: +fileString[i][1], yVar: +fileString[i][2], name: "Last_Fragments"});
						break;
					case "GCC":
						formattedData["BC"][1].values.push({xVar: +fileString[i][1], yVar: +fileString[i][2], name: "A"});
						formattedData["BC"][2].values.push({xVar: +fileString[i][1], yVar: +fileString[i][3], name: "C"});
						formattedData["BC"][3].values.push({xVar: +fileString[i][1], yVar: +fileString[i][4], name: "G"});
						formattedData["BC"][4].values.push({xVar: +fileString[i][1], yVar: +fileString[i][5], name: "T"});
						break;
					case "ID":
						formattedData["ID"][1].values.push({xVar: +fileString[i][1], yVar: +fileString[i][2], name: "insertions"});
						formattedData["ID"][2].values.push({xVar: +fileString[i][1], yVar: +fileString[i][3], name: "deletions"});
						break;
					case "COV":
						formattedData["COV"][1].values.push({xVar: +fileString[i][2], yVar: +fileString[i][3], name: "Coverage"});
						break;
					case "GCD":
						formattedData["GCD"][1].values.push({xVar: +fileString[i][2], yVar: +fileString[i][3],yVar0: +fileString[i][7]});
						formattedData["GCD"][2].values.push({xVar: +fileString[i][2], yVar: +fileString[i][4],yVar0: +fileString[i][6]});
						formattedData["GCD"][3].values.push({xVar: +fileString[i][2], yVar: +fileString[i][5]});
						formattedData["GCD"][4].values.push({xVar: +fileString[i][2], yVar: +fileString[i][1], name: "50th Percentile"});
						break;
				        case "SN":
				                formattedData["SN"][1].values.push({xVar: fileString[i][1], yVar: fileString[i][2]});
				                break;
				}
			}
			var maxGCF = d3.max(formattedData["GC"][1].values, function (d) {return d.yVar;});
			var maxGCL = d3.max(formattedData["GC"][2].values, function (d) {return d.yVar;});
			var maxGC;
			if(maxGCL > maxGCF){
				maxGC = maxGCL;
			}else{
				maxGC = maxGCF;
			}
		    for (i = 0; i < formattedData["GC"][1].values.length; i++) {
				formattedData["GC"][1].values[i].yVar = formattedData["GC"][1].values[i].yVar / maxGC;
			}
			for (i = 0; i < formattedData["GC"][2].values.length; i++) {
				formattedData["GC"][2].values[i].yVar = formattedData["GC"][2].values[i].yVar / maxGC;
			}
		}
		return formattedData;
	};
	//get tags from a file
	function getFileTags (fileString) {
		tags = [];
		for(var i = 0; i < fileString.length; i++){
			if(($.inArray(fileString[i][0], tags) === -1) && fileString[i][0][0] !== "#"){
				tags.push(fileString[i][0]);
			}
		}
		return tags;
	}
	function tagsToFunction (tags) {
		var map = {};
		for (var i = 0; i < tags.length; i++) {
			switch(tags[i]){
				case "IC":
					map.IC = icChart;
					break;
				case "IS":
					map.IS = isChart;
					break;
				case "FFQ":
					map.FFQ = firstFragmentQuality;
					break;
				case "LFQ":
					map.LFQ = lastFragmentQuality;
					break;
				case "GCF":
					map.GCF = gcChart;
					break;
				case "GCL":
					map.GCL = gcChart;
					break;
				case "GCC":
					map.GCC = gccChart;
					break;
				case "ID":
					map.ID = indelDist;
					break;
				case "COV":
					map.COV = coverage;
					break;
				case "GCD":
					map.GCD = gcDepth;
					break;
				default:
					console.log('no function for tag: ' + tags[i]);
					break;
			}
		}
		return map;
	}
	function getQualityVals(data) {
		var returnValue = [];
		var fragments = 0;
		for (var j = 2; j < data.length; j++) {
			returnValue.push(+data[j]);
			fragments = fragments + (+data[j]);
		}
		var lineTotal = 0;
		for (var i = 0; i < returnValue.length; i++) {
			lineTotal = lineTotal + returnValue[i];
			returnValue[i] = (lineTotal / fragments);
		}
		return returnValue;
	}
});