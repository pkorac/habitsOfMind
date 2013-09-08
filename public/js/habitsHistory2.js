var habitColours = { 	inquisitive: "#edcf48",
						collaborative: "#f95525",
						persistent: "#39a8d5",
						disciplined: "#86ad3e",
						imaginative: "#fa078a"
					};
var allHabits = ["inquisitive", "collaborative", "persistent", "disciplined", "imaginative"];
var allHabitsNames = ["Inquisitive", "Collaborative", "Persistent", "Disciplined", "Imaginative"];

var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

(function(){

	// vars
	var width = 0;
	var height = 0;
	var p;
	var currentView;
	var averageValues = {};
	var averageDates = { min: 0, max: 0, timespan: 0 };


	var howMany = 300;
	var animSpeed = 800;

	var chaosMaxRadius = 10;
	var chaosOpacity = 0.4;

	var averagesOpacity = 0.3;
	
	var detailsOpacity = 0.5;
	var maxNumberOfDetailsLabels = 12; // for 12 months
	var detailsTimeSpan = 1;
	// 1 - year
	// 2 - month
	// 3 - week
	
	var habits = [];
	var habitNames = [];
	var detailsLabels = [];
	
	// setup
	function setup(){
		var pel = $("#paper");
		width = pel.width();
		height = pel.height();
		p = new Raphael( "paper", width, height );
		
		habits = p.set();
		habitNames = p.set();
		detailsLabels = p.set();
		
		// Bindings
		$("#graphControls a").unbind("click");
		$("#graphSortings a").unbind("click");
		
		$("#chaos").click( function(e){
			e.preventDefault();
			chaos();
		} );
		$("#averages").click( function(e){
			e.preventDefault();
			averages();
		} );
		$("#details").click( function(e){
			e.preventDefault();
			details();
		} );
	
		$("#year").click( function(e){
			console.log( habitsData );
			e.preventDefault();
			loadData( habitsData.year );
			detailsTimeSpan = 1;
			//details();
		} );		
		$("#month").click( function(e){
			e.preventDefault();
			loadData( habitsData.month );
			detailsTimeSpan = 2;
			//details();
		} );		
		$("#week").click( function(e){
			e.preventDefault();
			loadData( habitsData.week );
			detailsTimeSpan = 3;
			//details();
		} );
		

		$("#graphControls a").click(function(){
			$("#graphControls a").removeClass("btn-info").addClass("btn-default");
			$(this).removeClass("btn-default").addClass( "btn-info" );
		});

		$("#graphSortings a").click(function(){
			$("#graphSortings a").removeClass("btn-info").addClass("btn-default");
			$(this).removeClass("btn-default").addClass( "btn-info" );
		});


		
		
				
		// Create habit names & averages arrags
		for ( var i = 0; i < allHabits.length; i++ ){
			averageValues[ allHabits[i] ] = { sum: 0, med: 0, count: 0 };
			var habitName = p.text( -300, -300, allHabitsNames[i] );
			habitName.attr( {   "font-family": "Helvetica Neue, Helvetica, Arial, sans-serif", 
								"font-size": "14px", 
								"font-weight": 300,
								"fill": "#f00",
								opacity: 0});
			habitName.habit = allHabits[i];
			habitNames.push( habitName );
		}
		
		for( var i = 0; i < maxNumberOfDetailsLabels; i++ ){
			var label = p.text( -300, -300, "");
			label.attr({   "font-family": "Helvetica Neue, Helvetica, Arial, sans-serif", 
								"font-size": "14px", 
								"font-weight": 300,
								"fill": "#999",
								opacity: 0,
								"text-anchor": "middle",
								"font-size": 12});
			detailsLabels.push( label );
		}
		
		chaosMaxRadius = 0.04*width;
		
		// Create habits circles
		
		for( var i = 0; i < howMany; i++ ){	
			var habit = allHabits[ Math.floor( Math.random()*allHabits.length ) ];
			var value = Math.random();
			averageValues[ habit ].sum += value;
			averageValues[ habit ].count++;
			
			var span = 1000*60*60*24*30*12;
			var date = new Date();
			date = new Date( date-Math.random()*span );
			newHabitCircle( habit, value, date );
		}
		for( key in averageValues ){
			averageValues[key].med = averageValues[key].sum/averageValues[key].count;
		}
		chaos();
		//averages();
		//details();
		
		loadData( habitsData.year );
	}
	
	// New habit circle
	function newHabitCircle( habit, value, date ){
		var x = chaosMaxRadius + Math.random()*(width-2*chaosMaxRadius);
		var y = height*0.5
		var r = 0.01;

		var colour = habitColours[habit];
		
		var c = p.circle( x, y, r ).attr( { stroke: "none", fill: colour, opacity: 0 } );
		c.habit = habit;
		c.value = value;
		c.date = date;
		
		habits.push( c );
	}
	
	// Resizing
	function resizing(){
		var oldWidth = width;
		var oldHeight = height;
		width = $("#paper").width();
		height = $("#paper").height();
		
		p.setSize( width, height );
		
		var scaleX = width/oldWidth;
		var scaleY = height/oldHeight;	
		
		for( var i = 0; i < habits.length; i ++ ){
			var x = habits[i].attr("cx")*scaleX;
			var y = habits[i].attr("cy")*scaleY;
			habits[i].attr( { cx: x, cy: y } );
		}
		for( var i = 0; i < habitNames.length; i++ ){
			var x = habitNames[i].attr("x")*scaleX;
			var y = habitNames[i].attr("y")*scaleY;
			habitNames[i].attr( {x: x, y: y } );
		}
	}
	
	// Chaos visuo
	function chaos(){
		currentView = chaos;
		habitNames.animate( { opacity: 0 }, animSpeed*0.2, "<>", function(){
			detailsLabels.animate( {opacity: 0}, animSpeed*0.2, "<>", function(){
			
				var maxRX = (width*0.5-chaosMaxRadius);
				var maxRY = (height*0.5-chaosMaxRadius);
					
				for ( var i = 0; i < habits.length; i ++ ){
					var rndRX = Math.random()*maxRX;
					var rndRY = Math.random()*maxRY;
					var rndA = Math.random()*2*Math.PI;
					var x = width*0.5 + Math.cos(rndA)*rndRX;
					var y = height*0.5 + Math.sin(rndA)*rndRY;	
					var r = habits[i].value*chaosMaxRadius;
					var colour = habitColours[ habits[i].habit ];
					
					var animation = Raphael.animation( { cx: x, cy: y, r: r, "fill": colour, opacity: chaosOpacity }, animSpeed*2, "bounce" );
					var rndDelay = Math.random()*animSpeed*0.5;
					habits[i].stop().animate( animation.delay(rndDelay) );
				}
				
				for( var i = 0; i < habitNames.length; i++ ){
					var colour = habitColours[ habitNames[i].habit ];
					habitNames[i].attr( { x: chaosMaxRadius, y: chaosMaxRadius+i*20, "text-anchor": "start", "fill": colour } );
							
					var animation = Raphael.animation( { opacity: 1 }, animSpeed, "<>" );
					var rndDelay = i*200;
					habitNames[i].stop().animate( animation.delay(rndDelay) );
				}
			});
		} );
	}
	
	// Averages
	function averages(){
		currentView = averages;
		habitNames.animate( { opacity: 0 }, animSpeed*0.2, "<>", function(){
			detailsLabels.animate( {opacity: 0}, animSpeed*0.2, "<>", function(){
				averagesMaxRadius = width*0.04;
				
				var padding = width/6;
				var separation = (width-2*padding)/(allHabits.length-1);
				var maxScatter = padding*0.6;
						
				var habitsxs = {};
				var habitsscat = {};
				var centery = height*0.5;
				
				for ( var i = 0; i < habitNames.length; i++ ){
					habitsxs[ habitNames[i].habit ] = padding+(i*separation);
					habitsscat[ habitNames[i].habit ] = averageValues[ habitNames[i].habit ].med*maxScatter;
					habitNames[i].attr( {x: padding+(i*separation), 
										 y: centery, 
										 "text-anchor": "middle", 
										 "fill": "#000"} );
					var animation = Raphael.animation( { opacity: 1 }, animSpeed, "<>" );
					var rndDelay = animSpeed*0.5+(i)*(animSpeed/habitNames.length);
					habitNames[i].stop().animate( animation.delay(rndDelay) );
				}		
		
		
				for ( var i = 0; i < habits.length; i++ ){
					var rndA = Math.random()*2*Math.PI;
					
					var scatter = Math.random()*habitsscat[ habits[i].habit ];
	
					var x = habitsxs[ habits[i].habit ] + Math.cos( rndA )*scatter;
					var y = centery + Math.sin( rndA )*scatter;
					
					var r = habits[i].value*averagesMaxRadius;
					var colour = habitColours[ habits[i].habit ];
					
					var animation = Raphael.animation( { cx: x, cy: y, r: r, "fill": colour, opacity: averagesOpacity }, animSpeed, "<>" );
					var rndDelay = Math.random()*animSpeed*0.5;
					habits[i].stop().animate( animation.delay(rndDelay) );
	
				}
		
				habits.toBack();
				habitNames.toFront();
			});
		} );
	}
	
	// Details
	function details(){
		currentView = details;
		habitNames.animate( { opacity: 0 }, animSpeed*0.2, "<>", function(){
			detailsLabels.animate( {opacity: 0}, animSpeed*0.2, "<>", function(){

				var separation = height/(allHabits.length+1);
				var maxRadius = separation*0.4;					
				var habitsys = {};			
	
				var spanOneWeek = 1000*60*60*24*7;
				var spanOneMonth = spanOneWeek*4;			
				var spanOneYear = 1000*60*60*24*366; // to be continued
	
				var now = new Date();
				var then = now - spanOneYear;
				var span;
				
				var labels = 12;
				var timeSeparation = spanOneYear/labels;
				
				if( detailsTimeSpan == 2 ) {
					then = now-spanOneMonth;
					timeSeparation = spanOneMonth/labels;
				}
				if( detailsTimeSpan == 3 ) {
					then = now-spanOneWeek;
					labels = 7;
					timeSeparation = spanOneWeek/labels;
				}
				
				span = now-then;	
				for( var i = 0; i < labels; i++ ){
					var x = maxRadius + ( (width-2*maxRadius)/labels)*(i+0.5);
					var y = height-20;
					
					var date = new Date( then + ((i+1)*timeSeparation) );
	
					var dateString = "";
					if( detailsTimeSpan == 1 ) dateString = months[date.getMonth()];
					if( detailsTimeSpan == 2 ) dateString = date.getDate() + ", " + months[date.getMonth()];
					if( detailsTimeSpan == 3 ) dateString = days[date.getDay()];
					
					detailsLabels[i].attr( {x: x, y: y, text: dateString } );
	
					var animation = Raphael.animation( { opacity: 1 }, animSpeed, "<>" );
					var rndDelay = (animSpeed/20)+i*(animSpeed/labels);
					detailsLabels[i].stop().animate( animation.delay(rndDelay) );
	
				}
	
	
				
				habitNames.attr( { "fill": "#000", "text-anchor": "start" } );
				for ( var i = 0; i < habitNames.length; i++ ){			
					habitsys[ habitNames[i].habit ] = (i+1)*separation;
									
					habitNames[i].attr( { x:maxRadius, y: (i+1)*separation });
					
					var animation = Raphael.animation( { opacity: 1 }, animSpeed, "<>" );
					var rndDelay = animSpeed*0.5+(i)*(animSpeed/habitNames.length);
					habitNames[i].stop().animate( animation.delay(rndDelay) );
				}
	
				
				for ( var i = 0; i < habits.length; i++){
					var date = new Date( habits[i].date );
					date = date.getTime();
					var position = (date-then)/span;				
					
					var x = maxRadius + position*(width-2*maxRadius);
					var y = habitsys[ habits[i].habit ];
					var r = habits[i].value*maxRadius;
					var colour = habitColours[ habits[i].habit ];
					
					var animation = Raphael.animation( { cx: x, cy: y, r: r, "fill": colour, opacity: detailsOpacity }, animSpeed, "<>" );
					var rndDelay = Math.random()*animSpeed*0.5;
					habits[i].stop().animate( animation.delay(rndDelay) );
				}
				habits.toBack();
				habitNames.toFront();
			});
		});
		
	}
	
	// Load data function
	function loadData( data ){
		if ( data && data.length < habits.length ){
			
			var howMany = habits.length-data.length;
			var deleted = habits.splice( data.length-1, howMany );
			//deleted.remove();
			
			deleted.animate( {opacity: 0}, 500, "linear", function(){
				deleted.remove();
			});
		}
		
		if ( data && data.length > 0 ){
			var date = new Date(data[0].date);
			averageDates.min = date.getTime();
			averageDates.max = date.getTime();
			for( var i = 0; i < data.length; i++){		
				averageValues[ data[i].habit ].sum += data[i].value;
				averageValues[ data[i].habit ].count++;
				
				var date = new Date( data[i].date );
				var time = date.getTime();
				if ( time > averageDates.max ) averageDates.max = time;
				if ( time < averageDates.min ) averageDates.min = time;
				
				
				if( habits[i] ){
					// already exists, just change it				
					habits[i].habit = data[i].habit;
					habits[i].value = data[i].value;
					habits[i].date = data[i].date;
				} else{
					// add a new one
					newHabitCircle( data[i].habit, data[i].value, data[i].date );
				}
			}
			for( key in averageValues ){
				averageValues[key].med = averageValues[key].sum/averageValues[key].count;
			}
			averageDates.timespan = averageDates.max-averageDates.min;
		}
		
		currentView();
		
	}


	// Document ready
	$(function(){		
		setup();
		
		var TO = false;
		$(window).resize( function(){
			if ( TO !== false ) clearTimeout(TO);
			TO = setTimeout( resizing, 500 );
		} );
	});




})();