// var GLOBAL_DEBUG_FLAG = true;

var World = {
	
	tracked: null,
	devices: null,
	state: 0,		// 0 = uninitialized, 1 = devices, 2 = tutorial, 3 = tutorials-menu, 4 = devices-menu, 5 = help
	tracked_devices: [],
	tracked_tutorialSteps: [],
	tutorial_stepIndex: 0,
	
	
	init: function (devicesJSONurl) {
		this.initTracker("assets/MARA_v5.wtc");
		this.initDevices(devicesJSONurl);
	},
	
	initTracker: function(trackerUrl) {
		this.tracker = new AR.ClientTracker(trackerUrl, {
			onLoaded: this.worldLoaded
		});
	},
	
	worldLoaded: function worldLoadedFn() {
		document.getElementById('loadingMessage').innerHTML = "Scan for lab equipment";
			
		$("#backButton").bind("click", function(event, ui) {
			World.onBackKeyDown();
		});

		$("#help").bind("click", function(event, ui) {
			World.onHelpPressed();
		})
		
	},
	
	initDevices: function(devicesJSONurl) {	
		$.getJSON(devicesJSONurl)
		 .done(function(data) {
			console.log("ARWORLD: get request for devices succeeded");
			World.devices = Device.parseJSONobjects(data);
			World.initDrawables();
		 })
		 .fail(function( jqxhr, textStatus, error ) {
			var err = textStatus + ", " + error;
			console.log( "Request Failed: " + err );
		});
	},
	
	initDrawables: function () {
		
		World.disableTutorials();
		World.state = 1;
		$("#backButton").hide();
		
		var button_drawables = [];
		
		for (var key in World.devices) {
			if (World.devices.hasOwnProperty(key)){
				var device = (World.devices)[key];
				
				for (var j = 0; j < device.buttons.length; j++) {
					(function(device,j) {
						var button = device.buttons[j];
						var imageDrawable = button.getARImageDrawable();
						imageDrawable.onClick = function() {
							document.getElementById('loadingMessage').innerHTML = button.description;
						}
						button_drawables.push(imageDrawable);
					}(device,j));
				}
				
				var tutorials = device.tutorialButton.getARImageDrawable();
				(function(key) {
					tutorials.onClick = function() {
						document.location = 'architectsdk://tutorials-' + key;
					}
				}(key));
				
				button_drawables.push(tutorials);
				
				this.tracked_devices[(this.tracked_devices).length] = new AR.Trackable2DObject(this.tracker, (World.devices)[key].name, {
					drawables: {
						cam: button_drawables,
					}
				});
				
				button_drawables = [];
			}
		}
	},

	loadTutorial: function(device_key, tutorial_key) {
		// Disable device tracking in lieu of tracking for tutorial
		World.disableTrackedDevices();
		World.disableTutorials();
		World.state = 2;
		
		$("#backButton").show();
		
		// Grab tutorial
		var device = (World.devices)[device_key];
		var tutorial = device.tutorials[tutorial_key];
		var tutorialSteps = tutorial.steps;
		
		// set tracked steps
		World.tracked_tutorialSteps = World.getTrackableTutorialSteps(device, tutorial);

		// Show tute buttons
		$(".tuteButton").show();
		$(".left").css("color", "grey");
		$(".right").css("color", "#0182b9");
		
		$(".right").unbind("click");
		$(".left").unbind("click");
		
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

			$('#loadingMessage').empty();
			$('#loadingMessage').append(tutorialSteps[World.tutorial_stepIndex].description);
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

			$('#loadingMessage').empty();
			$('#loadingMessage').append(tutorialSteps[World.tutorial_stepIndex].description);
		});
		
		//Initialization for step 1
		this.tracked_tutorialSteps[0].enabled = true;
		$('#loadingMessage').empty();
		$('#loadingMessage').append(tutorialSteps[0].description);
	},
	
	disableTrackedDevices: function() {
		for (i = 0; i < (this.tracked_devices).length; i++) {
			(this.tracked_devices[i]).enabled = false;
		}
	},
	
	enableTrackedDevices: function() {
		World.state = 1;
		World.disableTutorials();
		$("#backButton").hide();
		document.getElementById('loadingMessage').innerHTML = "Scan for lab equipment";
		for (i = 0; i < (this.tracked_devices).length; i++) {
			(this.tracked_devices[i]).enabled = true;
		}
	},
	
	disableTutorials: function() {
		$(".tuteButton").hide();
		if (World.tracked_tutorialSteps[World.tutorial_stepIndex]) {
			(World.tracked_tutorialSteps[World.tutorial_stepIndex]).enabled = false;
		}
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
	
	onBackKeyDown: function() {
		if (World.state === 2) {
			World.state = 3;
			document.location = 'architectsdk://menu-tutorials';
		} else if (World.state === 1 ) {
			World.state = 4;
			document.location = 'architectsdk://menu-devices';
		}
	},

	onHelpPressed: function(){
		// World.state = 5
		document.location = 'architectsdk://help-info';
	}
};


