var World = {
	loaded: false,
	tracked_devices: null,
	
	init: function initFn() {
		this.createOverlays();
	},

	createOverlays: function createOverlaysFn() {
		/*
			First an AR.ClientTracker needs to be created in order to start the recognition engine. It is initialized with a URL specific to the target collection. Optional parameters are passed as object in the last argument. In this case a callback function for the onLoaded trigger is set. Once the tracker is fully loaded the function worldLoaded() is called.
			Important: If you replace the tracker file with your own, make sure to change the target name accordingly.
			Use a specific target name to respond only to a certain target or use a wildcard to respond to any or a certain group of targets.
		*/
		this.tracker = new AR.ClientTracker("assets/tracker.wtc", {
			onLoaded: this.worldLoaded
		});

		/*
			The next step is to create the augmentation. In this example an image resource is created and passed to the AR.ImageDrawable. A drawable is a visual component that can be connected to an IR target (AR.Trackable2DObject) or a geolocated object (AR.GeoObject). The AR.ImageDrawable is initialized by the image and its size. Optional parameters allow for position it relative to the recognized target.
		*/
		
		this.tracked_devices = [];
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
							document.getElementById('loadingMessage').innerHTML =
								"<div" + cssFont + "> " + button.description + " </div>";
						}
						button_drawables.push(imageDrawable);
					}(key,j));
				}
				
				var tutorials = (devices[key].tutorialButton).getARImageDrawable();
				(function(key) {
					tutorials.onClick = function() {
						document.location = 'architectsdk://hide-' + key;
					}
				}(key));
				
				button_drawables.push(tutorials);
				/*
					The last line combines everything by creating an AR.Trackable2DObject with the previously created tracker, the name of the image target and the drawable that should augment the recognized image.
					Please note that in this case the target name is a wildcard. Wildcards can be used to respond to any target defined in the target collection. If you want to respond to a certain target only for a particular AR.Trackable2DObject simply provide the target name as specified in the target collection.
				*/
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
		this.disableTrackedDevices();
		var tutorial = devices[device_key].tutorials[tutorial_key];
		
		console.log("GOT THIS FAR===================================================");
		console.log(tutorial_key);
		
		
	},
	
	disableTrackedDevices: function() {
		for (i = 0; i < (this.tracked_devices).length; i++) {
			(this.tracked_devices[i]).enabled = false;
		}
	},
	
	enableTrackedDevices: function() {
		for (i = 0; i < (this.tracked_devices).length; i++) {
			(this.tracked_devices[i]).enabled = true;
		}
	},
	
	worldLoaded: function worldLoadedFn() {
		var cssDivLeft = " style='display: table-cell;vertical-align: middle; text-align: right; width: 50%; padding-right: 15px;'";
		var cssDivRight = " style='display: table-cell;vertical-align: middle; text-align: left;'";
		var cssFont = " style='display: table-cell;vertical-align: middle; text-align: middle;'";
		document.getElementById('loadingMessage').innerHTML =
			"<div" + cssFont + ">Scan for the function generator</div>";
			/*"<div" + cssDivLeft + ">Scan Target &#35;1 (Monash):</div>" +
			"<div" + cssDivRight + "><img src='assets/monash.png'></img></div>";
			*/

		// Remove Scan target message after 10 sec.
		// setTimeout(function() {
			// var e = document.getElementById('loadingMessage');
			// e.parentElement.removeChild(e);
		// }, 10000);
	}
};

World.init();