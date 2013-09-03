
$(function(){

	
	function draw(){
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
		var padding = 10;
		var pointRadius = 3;
		var horizontalGuides = 5;
		var verticalGuides = 8;
		var guidesColour = "#ebebeb";
		var guidesTextColour = "#bbbaba";


		var firstRecord;
		if ( habitsData.length > 0 ) firstRecord = habitsData[0].records[0];	
		var startDate = new Date( firstRecord.date );
		startDate.setHours( startDate.getHours()-2 );
		var endDate = new Date();
		var timeSpan = endDate - startDate;
		
		
		// Guidelines
		for( var i = 0; i < horizontalGuides+1; i++ ){
			var x = padding+ i*( (width-padding*2)/horizontalGuides );
			var line = paper.path( ["M", x, padding, "L", x, height-padding ] );
			line.attr( {"stroke-dasharray": "--", stroke: guidesColour} );

			var position = startDate.getTime() + (i/horizontalGuides)*timeSpan;
			var date = new Date();
			date.setTime( position );
			
			var dateString = "" + (date.getMonth()+1) + ". " + date.getDate() + " " + date.getHours() + ":" + date.getMinutes();
			
			var text = paper.text( x, height/2, dateString );
			text.attr( {fill: guidesTextColour, 
						"font-family": "Helvetica Neue, Helvetica, Arial, sans-serif", 
						"font-size": "12px",
						"font-weight": "300"} );
		}
		var alot = paper.text( width/2, padding, "Very" );
			alot.attr( {fill: "#000", 
						"font-family": "Helvetica Neue, Helvetica, Arial, sans-serif", 
						"font-size": "12px",
						"font-weight": "300"} );

		var alittle = paper.text( width/2, height-padding, "Not so much" );
			alittle.attr( {fill: "#000", 
						"font-family": "Helvetica Neue, Helvetica, Arial, sans-serif", 
						"font-size": "12px",
						"font-weight": "300"} );


/*
		for( var i = 0; i < verticalGuides+1; i++ ){
			var y = height-padding - ( i/(verticalGuides) )*(height-2*padding);
			console.log( y );
			var line = paper.path( ["M", padding, y, "L", width-padding, y ] );
			line.attr( {"stroke-dasharray": "--", stroke: guidesColour} );
			
			var text = paper.text( padding, y, i/verticalGuides );
			text.attr( {fill: guidesColour, 
						"font-family": "Helvetica Neue, Helvetica, Arial, sans-serif", 
						"font-size": "12px",
						"font-weight": "300",
						"text-anchor": "end"} );
		}
*/
		
		
	
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
					var circle = paper.circle( x, y, pointRadius );
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
	
	}
	
	
	draw();
	
	$(window).on("resize", function(){
		$("#paper").html("");
		draw();
	});
	
	
	
});