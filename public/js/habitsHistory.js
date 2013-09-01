
$(function(){

	var pel = $("#paper");
	var width = pel.width();
	var height = pel.height();
	var paper = new Raphael( "paper", width, height );			
	
	//var colours = ["#e4eb00", "#5a768f", "#830c6c", "#88ab2e", "#f05209"];		
	var colours = {
		inquisitive: "#edcf48",
		collaborative: "#f95525",
		persistent: "#39a8d5",
		disciplined: "#86ad3e",
		imaginative: "#fa078a",
		
	}
	var padding = 20;

	var startDate = new Date();
	startDate.setHours( startDate.getHours()-2 );
	var endDate = new Date();
	var timeSpan = endDate - startDate;

	// For each habit	
	for( var i = 0; i < habitsData.length; i++ ) {
		
		var records = habitsData[i].records;

		// Draw all the values
		var lineString = ["M", padding, height-padding];
		
		var curveString = ["M", padding, height-padding, "R"];
		
		for ( var j = 0; j < records.length; j++ ){			
			var recordedDate = new Date( records[j].date );			
			var position = recordedDate - startDate;
			if ( position > 0 ){
				position /= timeSpan;
				
				var x = padding + ( (width-padding*2)*position );
				var y = height - ( padding + ( (height-padding*2)*records[j].value ) );
				var circle = paper.circle( x, y, 10 );
				circle.attr( {stroke: "none", fill: colours[ habitsData[i].id ] } );
				lineString += " L" + x + " " + y;
				
				// Connecting Lines
//				if( j == 0 ) curveString = ["M", x, y, "R"]
				curveString += x + " " + y + " " ;
	
			} else{
				// the date is out of range
			}
		}
		lineString += ["L", width-padding, padding];
//		var line = paper.path( lineString ).attr( { stroke: colours[habitsData[i].id] } );
		
		curveString += [width-padding, height-padding];
		var curve = paper.path( curveString ).attr({
			"stroke-opacity": 1,
			stroke: colours[habitsData[i].id]
		});
		

	}
	
	
	
	
});