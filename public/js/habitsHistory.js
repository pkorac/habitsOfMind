
$(function(){

	var pel = $("#paper");
	var width = pel.width();
	var height = pel.height();
	var paper = new Raphael( "paper", width, height );
	
	var numberOfCurves = 15;		
	
	var colours = ["#e4eb00", "#5a768f", "#830c6c", "#88ab2e", "#f05209"];		
	
	
	
	function randomCurve( colour ){
	
		var howMany = 15;
		var maxHeight = height*0.3;
		var padding = 0.08*width;
		var maxWidth = ( width - 2*padding )/howMany;
	
		var x = padding;
		var y = height - ( height-maxHeight )*0.5;
		
		var values = new Array();
		for ( var i = 0; i < howMany; i++ ){
			values[i] = Math.random();
		}
		
		
		var curveString = "";
		for ( var i =0 ; i < values.length; i++ ){
	
			// Guide lines			
			var lineString = ["M", x, y, "L", x, y - maxHeight*values[i] ];
			var line = paper.path( lineString ).attr({ stroke: "#e6e8e9", "stroke-dasharray": "- " });
	
			
			// Connecting Lines
			if ( i == 0 ) curveString += "M" + x + " " + (y - maxHeight*values[i]) + "R";
			if ( i < values.length-1 ){				
				curveString += (x+maxWidth) + " " + ( y - maxHeight*values[i+1] ) + " " ;
			}
			
			x += maxWidth;					
			
		}
	
		var curve = paper.path( curveString ).attr({
			stroke: colour,
			"stroke-opacity": 1
		});
		
	}
	
	for ( var i = 0; i < numberOfCurves; i ++){		
		randomCurve( colours[i%colours.length] );
	}

});