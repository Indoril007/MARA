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
		this.tracker = new AR.ClientTracker("assets/MARA.wtc", {
			onLoaded: this.worldLoaded
		});

		/*
			The next step is to create the augmentation. In this example an image resource is created and passed to the AR.ImageDrawable. A drawable is a visual component that can be connected to an IR target (AR.Trackable2DObject) or a geolocated object (AR.GeoObject). The AR.ImageDrawable is initialized by the image and its size. Optional parameters allow for position it relative to the recognized target.
		*/

		/*
			===========================================================Overlay Library=================================================================================================
		*/
		var imgOne = new AR.ImageResource("assets/marker1.png");
		var imgRound = new AR.ImageResource("assets/RoundMarker.png");
		var imgTute = new AR.ImageResource("assets/Tute-button.png");
		var imgName_Os = new AR.ImageResource("assets/Oscilloscope.png");	//Oscilloscope
		var imgName_FG = new AR.ImageResource("assets/FuncGen.png");	//Function Generator
		var imgName_PS= new AR.ImageResource("assets/PowSup.png");	//Power supply

		//=======================================================Function Generator ECSE Lab===========================================================================================

		//Augmentation of "Tutorial" button and name of equipment
		var Tutorial = new AR.ImageDrawable(imgTute, 0.25, {
			offsetX: -0.45,
			offsetY: 0.65,
			onClick: function() {
			//load tutorial contents here
			}
		});

		var Eq_name = new AR.ImageDrawable(imgName_FG, 0.4, {
			offsetX: -0.45,
			offsetY: -0.6			
		});


		// Column 1 Button 1
		var c1b1 = new AR.ImageDrawable(imgOne, 0.05, {
			offsetX: -0.511,
			offsetY: 0.235,
			//onClick: function() {
			//AR.context.openInBrowser("http://www.monash.edu/");
			//}
		});

		var c1b2 = new AR.ImageDrawable(imgOne, 0.05, {
			offsetX: -0.511,
			offsetY: 0.133,
		});

		var c1b3 = new AR.ImageDrawable(imgOne, 0.05, {
			offsetX: -0.511,
			offsetY: 0.031,
		});

		var c1b4 = new AR.ImageDrawable(imgOne, 0.05, {
			offsetX: -0.511,
			offsetY: -0.071,
		});

		var c1b5 = new AR.ImageDrawable(imgOne, 0.05, {
			offsetX: -0.511,
			offsetY: -0.173,
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
		})

		/*
			The last line combines everything by creating an AR.Trackable2DObject with the previously created tracker, the name of the image target and the drawable that should augment the recognized image.
			Please note that in this case the target name is a wildcard. Wildcards can be used to respond to any target defined in the target collection. If you want to respond to a certain target only for a particular AR.Trackable2DObject simply provide the target name as specified in the target collection.
		*/
		var ECSE_func_gen = new AR.Trackable2DObject(this.tracker, "function generator half", {
			drawables: {
				cam: [Tutorial,Eq_name,c1b1,c1b2,c1b3,c1b4,c1b5, c2b1,c2b2,c2b3,c2b4,c2b5,c2b6, round_button]
			}
		});
		//====================================================End of Function Generator ECSE Lab=======================================================================================

		//=======================================================Oscilloscope ENG1002==================================================================================================
		/*
			The AR.Trackable2DObject for the second page uses the same tracker but with a different target name and the second overlay.
		*/
		// Column 1 Button 1
		var O1_c1b1 = new AR.ImageDrawable(imgOne, 0.06, {
			offsetX: -0.426,
			offsetY: 0.2445,
		});

		var O1_c1b2 = new AR.ImageDrawable(imgOne, 0.06, {
			offsetX: -0.426,
			offsetY: 0.138,
		});

		var O1_c1b3 = new AR.ImageDrawable(imgOne, 0.06, {
			offsetX: -0.426,
			offsetY: 0.0315,
		});

		var O1_c1b4 = new AR.ImageDrawable(imgOne, 0.06, {
			offsetX: -0.426,
			offsetY: -0.075,
		});

		var O1_c1b5 = new AR.ImageDrawable(imgOne, 0.06, {
			offsetX: -0.426,
			offsetY: -0.1815,
		});

		var O1_round1 = new AR.ImageDrawable(imgRound, 0.1, {
			offsetX: -0.42,
			offsetY: -0.28,
		});

		var O1_mult_purpose_knob = new AR.ImageDrawable(imgRound, 0.25, {
			offsetX: -0.224,
			offsetY: 0.328,
		});

		var ENG1002_osci = new AR.Trackable2DObject(this.tracker, "Oscilloscope1", {
			drawables: {
				cam: [O1_c1b1, O1_c1b2, O1_c1b3, O1_c1b4, O1_c1b5, O1_round1,O1_mult_purpose_knob]
				//cam: [c1b1,c1b2,c1b3,c1b4,c1b5, c2b1,c2b2,c2b3,c2b4,c2b5,c2b6, round_button]
			}
		});

		//====================================Power Supply ENG1002==========================================================================================================================================
		var ps_round1 = new AR.ImageDrawable(imgRound, 0.4, {
			offsetX: 0.10,
			offsetY: 0.3,
		});

		var ps_round2 = new AR.ImageDrawable(imgRound, 0.4, {
			offsetX: 0.475,
			offsetY: 0.3,
		});

		var ENG1002_power = new AR.Trackable2DObject(this.tracker, "ENG1002_PowerSupply", {
			drawables: {
				cam: [ps_round1, ps_round2]
				//cam: [c1b1,c1b2,c1b3,c1b4,c1b5, c2b1,c2b2,c2b3,c2b4,c2b5,c2b6, round_button]
			}
		});


		//====================================End of Power Supply ENG1002=========================================================================================================================================	
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