var World = {
	loaded: false,

	init: function initFn() {
		this.createOverlays();
	},

	createOverlays: function createOverlaysFn() {
		/*
			First an AR.ClientTracker needs to be created in order to start the recognition engine. It is initialized with a URL specific to the target collection. Optional parameters are passed as object in the last argument. In this case a callback function for the onLoaded trigger is set. Once the tracker is fully loaded the function worldLoaded() is called.
			Important: If you replace the tracker file with your own, make sure to change the target name accordingly.
			Use a specific target name to respond only to a certain target or use a wildcard to respond to any or a certain group of targets.
		*/
		this.tracker = new AR.ClientTracker("assets/funcGen.wtc", {
			onLoaded: this.worldLoaded
		});

		/*
			The next step is to create the augmentation. In this example an image resource is created and passed to the AR.ImageDrawable. A drawable is a visual component that can be connected to an IR target (AR.Trackable2DObject) or a geolocated object (AR.GeoObject). The AR.ImageDrawable is initialized by the image and its size. Optional parameters allow for position it relative to the recognized target.
		*/

		/* Create overlay for page one */
		var imgOne = new AR.ImageResource("assets/marker1.png");
		var imgRound = new AR.ImageResource("assets/RoundMarker.png");
		// Column 1 Button 1
		var c1b1 = new AR.ImageDrawable(imgOne, 0.05, {
			offsetX: -0.511,
			offsetY: 0.235,
			onClick: function() {
				pageOne.drawables.addCamDrawable(c1b2);
				pageOne.drawables.removeCamDrawable(c1b1);
			}
		});

		var c1b2 = new AR.ImageDrawable(imgOne, 0.05, {
			offsetX: -0.511,
			offsetY: 0.133,
			onClick: function() {
				pageOne.drawables.addCamDrawable(c1b3);
				pageOne.drawables.removeCamDrawable(c1b2);
			}
		});

		var c1b3 = new AR.ImageDrawable(imgOne, 0.05, {
			offsetX: -0.511,
			offsetY: 0.031,
			//onClick: function() {
			//AR.context.openInBrowser("http://www.monash.edu/");
			//}
		});

		var c1b4 = new AR.ImageDrawable(imgOne, 0.05, {
			offsetX: -0.511,
			offsetY: -0.071,
			//onClick: function() {
			//AR.context.openInBrowser("http://www.monash.edu/");
			//}
		});

		var c1b5 = new AR.ImageDrawable(imgOne, 0.05, {
			offsetX: -0.511,
			offsetY: -0.173,
			//onClick: function() {
			//AR.context.openInBrowser("http://www.monash.edu/");
			//}
		});

		var c2b1 = new AR.ImageDrawable(imgOne, 0.07, {
			offsetX: -0.324,
			offsetY: 0.35
		});

		var c2b2 = new AR.ImageDrawable(imgOne, 0.07, {
			offsetX: -0.324,
			offsetY: 0.258
		});

		var c2b3 = new AR.ImageDrawable(imgOne, 0.07, {
			offsetX: -0.324,
			offsetY: 0.166
		});
		var c2b4 = new AR.ImageDrawable(imgOne, 0.07, {
			offsetX: -0.324,
			offsetY: 0.076
		});

		var c2b5 = new AR.ImageDrawable(imgOne, 0.07, {
			offsetX: -0.324,
			offsetY: -0.013
		});

		var c2b6 = new AR.ImageDrawable(imgOne, 0.07, {
			offsetX: -0.324,
			offsetY: -0.102
		});

		var round_button = new AR.ImageDrawable(imgRound, 0.1, {
			offsetX: -0.511,
			offsetY: 0.337
		}
		)

		/*
			The last line combines everything by creating an AR.Trackable2DObject with the previously created tracker, the name of the image target and the drawable that should augment the recognized image.
			Please note that in this case the target name is a wildcard. Wildcards can be used to respond to any target defined in the target collection. If you want to respond to a certain target only for a particular AR.Trackable2DObject simply provide the target name as specified in the target collection.
		*/
		var pageOne = new AR.Trackable2DObject(this.tracker, "*", {
			drawables: {
				cam: [c1b1]
			}
		});

		

		/*
			The AR.Trackable2DObject for the second page uses the same tracker but with a different target name and the second overlay.
		*/
		

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
		setTimeout(function() {
			var e = document.getElementById('loadingMessage');
			e.parentElement.removeChild(e);
		}, 10000);
	}
};

World.init();