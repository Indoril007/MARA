// var GLOBAL_DEBUG_FLAG = true;

var World = {
	tracked: null,
	loaded: false,
	state: 0,		// 0 = uninitialized, 1 = devices, 2 = tutorial, 3 = tutorials-menu, 4 = devices-menu
	tracked_devices: [],
	tracked_tutorialSteps: [],
	tutorial_stepIndex: 0,
	
	init: function initFn() {
		
		this.tracker = new AR.ClientTracker("assets/MARA_v5.wtc", {
			onLoaded: this.worldLoaded
		});
		this.loadDevices();
	},

	loadDevices: function loadDevices() {
		World.disableTutorials();
		World.state = 1;
		
		var button_drawables = [];
		
		// for (i = 0; i < devices.length; i++) {
		for (var key in devices) {
			if (devices.hasOwnProperty(key)){
				for (j = 0; j < devices[key].buttons.length; j++) {
					(function(key,j) {
						var button = devices[key].buttons[j];
						var imageDrawable = button.getARImageDrawable();
						imageDrawable.onClick = function() {
							var cssDivLeft = " style='display: table-cell;vertical-align: middle; text-align: right; width: 50%; padding-right: 15px;'";
							var cssDivRight = " style='display: table-cell;vertical-align: middle; text-align: left;'";
							var cssFont = " style='display: table-cell;vertical-align: middle; text-align: middle;'";
							document.getElementById('loadingMessage').innerHTML = "<div" + cssFont + "> " + button.description + " </div>";
						}
						button_drawables.push(imageDrawable);
					}(key,j));
				}
				
				var tutorials = (devices[key].tutorialButton).getARImageDrawable();
				(function(key) {
					tutorials.onClick = function() {
						document.location = 'architectsdk://tutorials-' + key;
					}
				}(key));
				
				button_drawables.push(tutorials);
				/*
					The last line combines everything by creating an AR.Trackable2DObject with the previously created tracker, the name of the image target and the drawable that should augment the recognized image.
					Please note that in this case the target name is a wildcard. Wildcards can be used to respond to any target defined in the target collection. If you want to respond to a certain target only for a particular AR.Trackable2DObject simply provide the target name as specified in the target collection.
				*/
				
				console.log("====================================");
				console.log(devices[key].name);
				console.log(button_drawables);
				console.log(button_drawables[1]);
				
				this.tracked_devices[(this.tracked_devices).length] = new AR.Trackable2DObject(this.tracker, devices[key].name, {
					drawables: {
						cam: button_drawables,
					}
				});
				
				button_drawables = [];
			}
		}
		

		/*
			The AR.Trackable2DObject for the second page uses the same tracker but with a different target name and the second overlay.
		*/
		

	},

	loadTutorial: function(device_key, tutorial_key) {
		// Disable device tracking in lieu of tracking for tutorial
		World.disableTrackedDevices();
		World.disableTutorials();
		World.state = 2;
		
		// Grab tutorial
		var device = devices[device_key];
		var tutorial = device.tutorials[tutorial_key];
		var tutorialSteps = tutorial.steps;
		
		// set tracked steps
		World.tracked_tutorialSteps = World.getTrackableTutorialSteps(device, tutorial);

		// Show tute buttons
		$(".tuteButton").show();
		
		//Bind click funtion to left button
		$(".left").bind("click", function(event, ui) {
			var activate_color = "green";
			var passive_color = "#0182b9"
			
			if (World.tracked_tutorialSteps[World.tutorial_stepIndex - 1]) {
				(World.tracked_tutorialSteps[World.tutorial_stepIndex]).enabled = false;
				World.tutorial_stepIndex -= 1;
				(World.tracked_tutorialSteps[World.tutorial_stepIndex]).enabled = true;
				$(".right").css("color", "#0182b9");
			} else {
				activate_color = "red";
			}
			
			if (!(World.tracked_tutorialSteps[World.tutorial_stepIndex - 1])) {
				passive_color = "grey"
			}
			
			$(this).animate({
				color: activate_color,
			}, 10, 'linear', function(){
				$(this).animate({
					color: passive_color,
				}, 250)
			});

			$('#loadingMessage div').empty();
			$('#loadingMessage div').append(tutorialSteps[World.tutorial_stepIndex].description);
		});
		// World.bindTutorialButton("left", tutorialSteps);
		
		// Bind click funtion to right button
		$(".right").bind("click", function(event, ui) {
			var activate_color = "green";
			var passive_color = "#0182b9"
			
			if (World.tracked_tutorialSteps[World.tutorial_stepIndex + 1]) {
				(World.tracked_tutorialSteps[World.tutorial_stepIndex]).enabled = false;
				World.tutorial_stepIndex += 1;
				(World.tracked_tutorialSteps[World.tutorial_stepIndex]).enabled = true;
				$(".left").css("color", "#0182b9");
			} else {
				activate_color = "red";
			}
			
			if (!(World.tracked_tutorialSteps[World.tutorial_stepIndex + 1])) {
				passive_color = "grey"
			}
			
			$(this).animate({
				color: activate_color,
			}, 10, 'linear', function(){
				$(this).animate({
					color: passive_color,
				}, 250)
			});

			$('#loadingMessage div').empty();
			$('#loadingMessage div').append(tutorialSteps[World.tutorial_stepIndex].description);
		});
		// World.bindTutorialButton("right", tutorialSteps);
		
		//Initialization for step 1
		this.tracked_tutorialSteps[0].enabled = true;
		$('#loadingMessage div').empty();
		$('#loadingMessage div').append(tutorialSteps[0].description);
	},
	
	disableTrackedDevices: function() {
		for (i = 0; i < (this.tracked_devices).length; i++) {
			(this.tracked_devices[i]).enabled = false;
		}
	},
	
	enableTrackedDevices: function() {
		World.state = 1;
		for (i = 0; i < (this.tracked_devices).length; i++) {
			(this.tracked_devices[i]).enabled = true;
		}
	},
	
	disableTutorials: function() {
		World.tracked_tutorialSteps = [];
		World.tutorial_stepIndex = 0;
	},
	
	getTrackableTutorialSteps: function(device, tutorial) {
		var tutorialSteps = tutorial.steps;
		var trackableSteps = [];
		for (i = 0; i < tutorialSteps.length; i++) {
			var step_buttons = tutorialSteps[i].buttons;
			var button_drawables = []; 
			 
			for (j = 0; j < step_buttons.length; j++) {
				button_drawables.push(step_buttons[j].getARImageDrawable());
			}
			
			trackableSteps[i] = new AR.Trackable2DObject(this.tracker, device.name, {
				drawables: {
					cam: button_drawables,
				},
				enabled: false,
			});
			
			button_drawables = []; 
		}	
		
		return trackableSteps;
	},
	
	// bindTutorialButton: function(direction, tutorialSteps) {
		// if (direction === "right") {
			// var buttonClass = ".right";
			// var oppositeButtonClass = ".left";
			// var step = 1;
		// } else if (direction === "left") {
			// var buttonClass = ".left";
			// var oppositeButtonClass = ".right";
			// var step = -1;
		// }
		
		// $(buttonClass).bind("click", function(event, ui) {
			// var activate_color = "green";
			// var passive_color = "#0182b9"
			
			// if (World.tracked_tutorialSteps[World.tutorial_stepIndex + step]) {
				// (World.tracked_tutorialSteps[World.tutorial_stepIndex]).enabled = false;
				// World.tutorial_stepIndex += step;
				// (World.tracked_tutorialSteps[World.tutorial_stepIndex]).enabled = true;
				// $(oppositButtonClass).css("color", "#0182b9");
			// } else {
				// activate_color = "red";
			// }
			
			// if (!(World.tracked_tutorialSteps[World.tutorial_stepIndex + step])) {
				// passive_color = "grey"
			// }
			
			// $(this).animate({
				// color: activate_color,
			// }, 10, 'linear', function(){
				// $(this).animate({
					// color: passive_color,
				// }, 250)
			// });

			// $('#loadingMessage div').empty();
			// $('#loadingMessage div').append(tutorialSteps[World.tutorial_stepIndex].description);
		// });
	// },
	
	worldLoaded: function worldLoadedFn() {
		// var cssDivLeft = "style='float: left; height: 100%; width: 100px;'";
		// var cssDivRight = "style='float: right; height: 100%;  width: 100px;'";
		// var cssFont = " style='display: table-cell;vertical-align: middle; text-align: middle;'";
		document.getElementById('loadingMessage').innerHTML =
			"<span id=\"loadingMessage\">Scan for the function generator</div>";
			
		$("#backButton").bind("click", function(event, ui) {
			World.onBackKeyDown();
		})
		// $("html").swipe( {
			// //Generic swipe handler for all directions
			// swipeRight:function(event, direction, distance, duration, fingerCount, fingerData) {
				// document.location = 'architectsdk://menu-tutorials';
			// },
			
			// // swipeLeft:function(event, direction, distance, duration, fingerCount, fingerData) {
				// // app.wikitudePlugin.show();
			// // }
		// });
			
			// "<div id=\"left\"" + cssDivLeft + ">blah blah</div>" +
			// "<div" + cssDivRight + "><img src='assets/monash.png'></img></div>";
		
			
			// "<div" + cssDivLeft + "><span class=\"glyphicon glyphicon-chevron-left\" aria-hidden=\"true\"></span></div>" +
			// "<div" + cssDivRight + "><span class=\"glyphicon glyphicon-chevron-right\" aria-hidden=\"true\"></span></div>";
			
			
		// Remove Scan target message after 10 sec.
		// setTimeout(function() {
			// var e = document.getElementById('loadingMessage');
			// e.parentElement.removeChild(e);
		// }, 10000);
	},
	
	onBackKeyDown: function() {
		console.log("===========================================back button pressed")
		if (World.state === 2) {
			World.state = 3;
			document.location = 'architectsdk://menu-tutorials';
		}
	}
};

World.init();


