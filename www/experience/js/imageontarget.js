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
		this.tracker = new AR.ClientTracker("assets/MARA_v5.wtc", {
			onLoaded: this.worldLoaded
		});

		/*
			The next step is to create the augmentation. In this example an image resource is created and passed to the AR.ImageDrawable. A drawable is a visual component that can be connected to an IR target (AR.Trackable2DObject) or a geolocated object (AR.GeoObject). The AR.ImageDrawable is initialized by the image and its size. Optional parameters allow for position it relative to the recognized target.
		*/

		/*
			===========================================================Overlay Library=================================================================================================
		*/
		var imgOne = new AR.ImageResource("assets/marker1.png");
		var imgCircle = new AR.ImageResource("assets/circle.png")
		var imgRound = new AR.ImageResource("assets/RoundMarker.png");
		var imgTwo = new AR.ImageResource("assets/marker2.png");
		var imgTute = new AR.ImageResource("assets/Tute-button.png");
		var imgName_Os = new AR.ImageResource("assets/Oscilloscope.png");	//Oscilloscope
		var imgName_FG = new AR.ImageResource("assets/FuncGen.png");	//Function Generator
		var imgName_PS= new AR.ImageResource("assets/PowSup.png");	//Power supply

		//=======================================================Function Generator ECSE Lab===========================================================================================

		//Augmentation of "Tutorial" button and name of equipment
		var Tutorial = new AR.ImageDrawable(imgTute, 0.25, {
			offsetX: -0.45,
			offsetY: -0.65,
			onClick: function() {
			//load tutorial contents here
			}
		});

		var Eq_name_FG = new AR.ImageDrawable(imgName_FG, 0.4, {		offsetX: -0.45,offsetY: 0.6	});

		//Vertical 1 cm = 0.081037		100pixel = 0.10941
		//Horizontal 1 cm = 0.068965 	100pixel = 0.10951, 0.10016



		// Column 1 
		var round_button = new AR.ImageDrawable(imgRound, 0.1, {			offsetX: -0.511,offsetY: 0.337		});
		var c1b1 = new AR.ImageDrawable(imgOne, 0.05, {			offsetX: -0.511,offsetY: 0.235,
			//onClick: function() {
			//AR.context.openInBrowser("http://www.monash.edu/");
			//}
		});
		var c1b2 = new AR.ImageDrawable(imgOne, 0.05, {			offsetX: -0.5179,offsetY: 0.133			});
		var c1b3 = new AR.ImageDrawable(imgOne, 0.05, {			offsetX: -0.5179,offsetY: 0.0317		});
		var c1b4 = new AR.ImageDrawable(imgOne, 0.05, {			offsetX: -0.5179,offsetY: -0.0696		});
		var c1b5 = new AR.ImageDrawable(imgOne, 0.05, {			offsetX: -0.5179,offsetY: -0.1709		});

		// Column 2 Function

		var c2b1 = new AR.ImageDrawable(imgOne, 0.07, {			offsetX: -0.32,offsetY: 0.35			});
		var c2b2 = new AR.ImageDrawable(imgOne, 0.07, {			offsetX: -0.32,offsetY: 0.2575			});
		var c2b3 = new AR.ImageDrawable(imgOne, 0.07, {			offsetX: -0.32,offsetY: 0.1651			});
		var c2b4 = new AR.ImageDrawable(imgOne, 0.07, {			offsetX: -0.32,offsetY: 0.0726			});
		var c2b5 = new AR.ImageDrawable(imgOne, 0.07, {			offsetX: -0.32,offsetY: -0.0198			});
		var c2b6 = new AR.ImageDrawable(imgOne, 0.07, {			offsetX: -0.32,offsetY: -0.1099			});
		var c2b7 = new AR.ImageDrawable(imgOne, 0.05, {			offsetX: -0.32,offsetY: -0.2215			});

		// Row 1 - run mode

		var r1b1 = new AR.ImageDrawable(imgOne, 0.05, {			offsetX: -0.1915,offsetY: 0.35			});
		var r1b2 = new AR.ImageDrawable(imgOne, 0.05, {			offsetX: -0.0761,offsetY: 0.35			});
		var r1b3 = new AR.ImageDrawable(imgOne, 0.05, {			offsetX: 0.0392,offsetY: 0.35			});
		var r1b4 = new AR.ImageDrawable(imgOne, 0.05, {			offsetX: 0.1546,offsetY: 0.35			});

		//Row 2

		var r2b1 = new AR.ImageDrawable(imgOne, 0.07, {			offsetX: -0.1353,offsetY: 0.258			});
		var r2b2 = new AR.ImageDrawable(imgOne, 0.07, {			offsetX: 0.0316,offsetY: 0.258			});
		var r2b3_knob = new AR.ImageDrawable(imgRound, 0.35, {			offsetX: 0.3641,offsetY: 0.2958			});

		//Row 3

		var r3b1 = new AR.ImageDrawable(imgOne, 0.07, {			offsetX: -0.1353,offsetY: 0.166			});
		var r3b2 = new AR.ImageDrawable(imgOne, 0.07, {			offsetX: 0.0316,offsetY: 0.166			});	
		var r3b3 = new AR.ImageDrawable(imgOne, 0.05, {			offsetX: 0.2426,offsetY: 0.166			});
		var r3b4 = new AR.ImageDrawable(imgOne, 0.05, {			offsetX: 0.4616,offsetY: 0.166			});	

		//Row 4

		var r4b1 = new AR.ImageDrawable(imgOne, 0.05, {			offsetX: -0.198,offsetY: 0.076			});
		var r4b2 = new AR.ImageDrawable(imgOne, 0.05, {			offsetX: -0.0855,offsetY: 0.076			});	

		//Row 5

		var r5b1 = new AR.ImageDrawable(imgOne, 0.05, {			offsetX: -0.198,offsetY: -0.013			});
		var r5b2 = new AR.ImageDrawable(imgOne, 0.05, {			offsetX: -0.0855,offsetY: -0.013		});	
		var r5b3 = new AR.ImageDrawable(imgOne, 0.05, {			offsetX: 0.0261,offsetY: -0.013			});	

		//Row 6

		var r6b1 = new AR.ImageDrawable(imgOne, 0.05, {			offsetX: -0.198,offsetY: -0.1099		});
		var r6b2 = new AR.ImageDrawable(imgOne, 0.05, {			offsetX: -0.0855,offsetY: -0.1099		});
		var r6b3 = new AR.ImageDrawable(imgOne, 0.05, {			offsetX: 0.0261,offsetY: -0.1099		});	

		// key pad for tutorial
		//var keypad = new AR.ImageDrawable(imgRound, 0.5, {			offsetX: 0.2794,offsetY: -0.0386			});



		/*
			The last line combines everything by creating an AR.Trackable2DObject with the previously created tracker, the name of the image target and the drawable that should augment the recognized image.
			Please note that in this case the target name is a wildcard. Wildcards can be used to respond to any target defined in the target collection. If you want to respond to a certain target only for a particular AR.Trackable2DObject simply provide the target name as specified in the target collection.
		*/
		var ECSE_func_gen = new AR.Trackable2DObject(this.tracker, "function generator half", {
			drawables: {
				cam: [Tutorial,Eq_name_FG,
					round_button,c1b1,c1b2,c1b3,c1b4,c1b5, 
					c2b1,c2b2,c2b3,c2b4,c2b5,c2b6,c2b7,
					r1b1, r1b2, r1b3, r1b4, 
					r2b1, r2b2, r2b3_knob,
					r3b1, r3b2, r3b3, r3b4,
					r4b1, r4b2,
					r5b1, r5b2,
					r6b1, r6b2, r6b3,
					//keypad
					]
			}
		});
		//====================================================End of Function Generator ECSE Lab=======================================================================================


		//=======================================================Oscilloscope ECSE Lab=================================================================================================
		var Eq_name_Os = new AR.ImageDrawable(imgName_Os, 0.4, {		offsetX: -0.45,offsetY: 0.65	});	

		/*
		Measurements! delete when finished!
		horizontal 1 cm = 0.103733333333
		vertical 1cm = 0.101
		*/

		// OL = Oscilloscope Lab 
		// LEFT COLUMN BUTTONS
		var OL_c1b1 = new AR.ImageDrawable(imgOne, 0.06, {			offsetX: -0.6,offsetY: 0.2795		});
		var OL_c1b2 = new AR.ImageDrawable(imgOne, 0.06, {			offsetX: -0.6,offsetY: 0.171		});
		var OL_c1b3 = new AR.ImageDrawable(imgOne, 0.06, {			offsetX: -0.6,offsetY: 0.0635		});
		var OL_c1b4 = new AR.ImageDrawable(imgOne, 0.06, {			offsetX: -0.6,offsetY: -0.044		});
		var OL_c1b5 = new AR.ImageDrawable(imgOne, 0.06, {			offsetX: -0.6,offsetY: -0.1505	});
		var OL_c1b6_round = new AR.ImageDrawable(imgRound, 0.08, {			offsetX: -0.6,offsetY: -0.253	});

		// TOP PART BUTTONS
		var OL_mult_purpose_knob = new AR.ImageDrawable(imgRound, 0.2, {			offsetX: -0.377,offsetY: 0.383		});
		var OL_r1b1 = new AR.ImageDrawable(imgOne, 0.06, {			offsetX: -0.2214,offsetY: 0.433		});
		var OL_r1b2 = new AR.ImageDrawable(imgOne, 0.06, {			offsetX: -0.0969,offsetY: 0.433		});	
		var OL_r1b3 = new AR.ImageDrawable(imgOne, 0.06, {			offsetX: 0.0276,offsetY: 0.433		});	
		var OL_r1b4 = new AR.ImageDrawable(imgOne, 0.06, {			offsetX: 0.152,offsetY: 0.433		});
		var OL_r1b5 = new AR.ImageDrawable(imgOne, 0.06, {			offsetX: 0.2765,offsetY: 0.433		});
		var OL_r1b6 = new AR.ImageDrawable(imgOne, 0.06, {			offsetX: 0.4010,offsetY: 0.433		});

		//row 2

		var OL_r2b1 = new AR.ImageDrawable(imgOne, 0.06, {			offsetX: -0.2214,offsetY: 0.338		});
		var OL_r2b2 = new AR.ImageDrawable(imgOne, 0.06, {			offsetX: -0.0969,offsetY: 0.338		});	
		var OL_r2b3 = new AR.ImageDrawable(imgOne, 0.06, {			offsetX: 0.0276,offsetY: 0.338		});	
		var OL_r2b4 = new AR.ImageDrawable(imgOne, 0.06, {			offsetX: 0.152,offsetY: 0.338		});
		var OL_r2b5 = new AR.ImageDrawable(imgOne, 0.06, {			offsetX: 0.2765,offsetY: 0.338		});
		var OL_r2b6 = new AR.ImageDrawable(imgOne, 0.06, {			offsetX: 0.4010,offsetY: 0.338		});
		var OL_run_stop = new AR.ImageDrawable(imgOne, 0.06, {			offsetX: 0.5307,offsetY: 0.383		});

		//row 3

		var OL_r3b1 = new AR.ImageDrawable(imgRound, 0.1, {			offsetX: -0.3874,offsetY: 0.2117		});	
		var OL_r3b2 = new AR.ImageDrawable(imgOne, 0.06, {			offsetX: -0.2214,offsetY: 0.2117	});	
		var OL_r3b3 = new AR.ImageDrawable(imgOne, 0.06, {			offsetX: -0.0969,offsetY: 0.2117	});	
		var OL_r3b4 = new AR.ImageDrawable(imgOne, 0.06, {			offsetX: 0.0246,offsetY: 0.2117		});	
		var OL_r3b5_knob = new AR.ImageDrawable(imgRound, 0.12, {			offsetX: 0.1906,offsetY: 0.2066		});
		var OL_r3b6 = new AR.ImageDrawable(imgOne, 0.06, {			offsetX: 0.3358,offsetY: 0.2117		});	
		var OL_r3b7 = new AR.ImageDrawable(imgOne, 0.06, {			offsetX: 0.5225,offsetY: 0.2117		});

		//row 4

		var OL_r4b1 = new AR.ImageDrawable(imgRound, 0.12, {			offsetX: -0.3978,offsetY: 0.0653		});	
		var OL_r4b2 = new AR.ImageDrawable(imgRound, 0.12, {			offsetX: -0.1644,offsetY: 0.0653		});	
		var OL_r4b3 = new AR.ImageDrawable(imgRound, 0.12, {			offsetX: 0.069,offsetY: 0.0653			});	
		var OL_r4b4 = new AR.ImageDrawable(imgRound, 0.12, {			offsetX: 0.3024,offsetY: 0.0653			});	
		var OL_r4b5 = new AR.ImageDrawable(imgRound, 0.12, {			offsetX: 0.5385,offsetY: 0.0602			});

		//row 5

		var OL_r5b1 = new AR.ImageDrawable(imgOne, 0.05, {			offsetX: -0.3874,offsetY: -0.0408		});	
		var OL_r5b2 = new AR.ImageDrawable(imgOne, 0.05, {			offsetX: -0.2759,offsetY: -0.0408		});	
		var OL_r5b3 = new AR.ImageDrawable(imgOne, 0.05, {			offsetX: -0.1644,offsetY: -0.0408		});	
		var OL_r5b4 = new AR.ImageDrawable(imgOne, 0.05, {			offsetX: 0.059,offsetY: -0.0408			});	
		var OL_r5b5 = new AR.ImageDrawable(imgOne, 0.05, {			offsetX: 0.292,offsetY: -0.0458			});	
		var OL_r5b6 = new AR.ImageDrawable(imgOne, 0.05, {			offsetX: 0.528,offsetY: -0.0509			});

		//row 6

		var OL_r6b1 = new AR.ImageDrawable(imgRound, 0.2, {			offsetX: -0.3978,offsetY: -0.1923		});	
		var OL_r6b2 = new AR.ImageDrawable(imgRound, 0.2, {			offsetX: -0.1644,offsetY: -0.1923		});	
		var OL_r6b3 = new AR.ImageDrawable(imgRound, 0.2, {			offsetX: 0.069,offsetY: -0.1923			});	
		var OL_r6b4 = new AR.ImageDrawable(imgRound, 0.2, {			offsetX: 0.3024,offsetY: -0.1973		});	
		var OL_r6b5 = new AR.ImageDrawable(imgRound, 0.2, {			offsetX: 0.5385,offsetY: -0.2117		});


		/*
			The last line combines everything by creating an AR.Trackable2DObject with the previously created tracker, the name of the image target and the drawable that should augment the recognized image.
			Please note that in this case the target name is a wildcard. Wildcards can be used to respond to any target defined in the target collection. If you want to respond to a certain target only for a particular AR.Trackable2DObject simply provide the target name as specified in the target collection.
		*/
		var ECSE_func_gen = new AR.Trackable2DObject(this.tracker, "Lab_Oscilloscope", {
			drawables: {
				cam: [Tutorial,Eq_name_Os,
					OL_c1b1, OL_c1b2, OL_c1b3, OL_c1b4, OL_c1b5, OL_c1b6_round,
					OL_mult_purpose_knob, OL_r1b1, OL_r1b2, OL_r1b3, OL_r1b4, OL_r1b5, OL_r1b6, 
					OL_r2b1, OL_r2b2, OL_r2b3, OL_r2b4, OL_r2b5, OL_r2b6, OL_run_stop,
					OL_r3b1, OL_r3b2, OL_r3b3, OL_r3b4, OL_r3b5_knob, OL_r3b6, OL_r3b7,
					OL_r4b1, OL_r4b2, OL_r4b3, OL_r4b4, OL_r4b5,
					OL_r5b1, OL_r5b2, OL_r5b3, OL_r5b4, OL_r5b5, OL_r5b6,
					OL_r6b1, OL_r6b2, OL_r6b3, OL_r6b4, OL_r6b5,
					]
			}
		});
		//====================================================================End of Oscilloscope ECSE Lab=============================================================================


		//=======================================================Oscilloscope ENG1002==================================================================================================
		/*
			The AR.Trackable2DObject for the second page uses the same tracker but with a different target name and the second overlay.

		*/

		// Column 1 Button 1
		// O1 = Oscilloscope 1002
		var O1_c1b1 = new AR.ImageDrawable(imgOne, 0.06, {			offsetX: -0.546,offsetY: 0.205		});
		var O1_c1b2 = new AR.ImageDrawable(imgOne, 0.06, {			offsetX: -0.546,offsetY: 0.0635		});
		var O1_c1b3 = new AR.ImageDrawable(imgOne, 0.06, {			offsetX: -0.546,offsetY: -0.069		});
		var O1_c1b4 = new AR.ImageDrawable(imgOne, 0.06, {			offsetX: -0.546,offsetY: -0.205		});
		var O1_c1b5 = new AR.ImageDrawable(imgOne, 0.06, {			offsetX: -0.546,offsetY: -0.335	});
		var O1_round1 = new AR.ImageDrawable(imgRound, 0.1, {			offsetX: -0.532,offsetY: -0.4615	});

		var O1_c2b1 = new AR.ImageDrawable(imgOne, 0.05, {			offsetX: -0.408,offsetY:  -0.025	});
		var O1_c2b2 = new AR.ImageDrawable(imgOne, 0.05, {			offsetX: -0.408,offsetY:  -0.1715	});		
		var O1_c2b3 = new AR.ImageDrawable(imgOne, 0.05, {			offsetX: -0.408,offsetY:  -0.3248	});

		var O1_c3b1 = new AR.ImageDrawable(imgRound, 0.125, {	offsetX: -0.2544,offsetY:  -0.0655	});
		var O1_c3b2 = new AR.ImageDrawable(imgOne, 0.05, {			offsetX: -0.2544,offsetY:  -0.1715	});		
		var O1_c3b3 = new AR.ImageDrawable(imgRound, 0.17,{			offsetX: -0.2544,offsetY:  -0.38	});

		var O1_c4b1 = new AR.ImageDrawable(imgOne, 0.06, {			offsetX: -0.0971,offsetY: 0.4001 });
		var O1_c4b2 = new AR.ImageDrawable(imgOne, 0.06, {			offsetX: -0.0971,offsetY:  0.2751	});	
		var O1_c4b3 = new AR.ImageDrawable(imgOne, 0.06, {			offsetX: -0.0971,offsetY:  0.1518	});

		var O1_c5b1 = new AR.ImageDrawable(imgRound, 0.125, {		offsetX: 0.01,offsetY:  -0.0655	});
		var O1_c5b2 = new AR.ImageDrawable(imgOne, 0.05, {			offsetX: 0.01,offsetY:  -0.1715	});		
		var O1_c5b3 = new AR.ImageDrawable(imgRound, 0.17,{			offsetX: 0.015,offsetY:  -0.38	});

		var O1_c6b1 = new AR.ImageDrawable(imgOne, 0.06, {			offsetX: 0.0955,offsetY: 0.4001 });
		var O1_c6b2 = new AR.ImageDrawable(imgOne, 0.06, {			offsetX: 0.0955,offsetY:  0.2751	});	
		var O1_c6b3 = new AR.ImageDrawable(imgOne, 0.06, {			offsetX: 0.0955,offsetY:  0.1518	});
		
		var O1_c7b1 = new AR.ImageDrawable(imgOne, 0.06, {			offsetX: 0.2942,offsetY:  0.3981	});
		var O1_c7b2 = new AR.ImageDrawable(imgOne, 0.06, {			offsetX: 0.2942,offsetY:  0.2751	});		
		var O1_c7b3 = new AR.ImageDrawable(imgOne, 0.06, {			offsetX: 0.2942,offsetY:  0.1518	});
		var O1_c7b4 = new AR.ImageDrawable(imgRound, 0.125, {		offsetX: 0.2942,offsetY:  -0.0655	});
		var O1_c7b5 = new AR.ImageDrawable(imgOne, 0.06, {			offsetX: 0.2942,offsetY:  -0.1715	});		
		var O1_c7b6 = new AR.ImageDrawable(imgRound, 0.17,{			offsetX: 0.2942,offsetY:  -0.38	});

		var O1_c8b1 = new AR.ImageDrawable(imgOne, 0.06, {			offsetX: 0.476,offsetY:  0.4001	});
		var O1_c8b2 = new AR.ImageDrawable(imgOne, 0.06, {			offsetX: 0.476,offsetY:  0.2751	});		
		var O1_c8b3 = new AR.ImageDrawable(imgOne, 0.06, {			offsetX: 0.476,offsetY:  0.1518	});
		var O1_c8b4 = new AR.ImageDrawable(imgOne, 0.06, {			offsetX: 0.476,offsetY:  -0.025	});
		var O1_c8b5 = new AR.ImageDrawable(imgRound, 0.125, {		offsetX: 0.513,offsetY:  -0.2421	});		
		var O1_c8b6 = new AR.ImageDrawable(imgOne, 0.06,{			offsetX: 0.476,offsetY:  -0.3248	});


		var O1_mult_purpose_knob = new AR.ImageDrawable(imgRound, 0.25, {			offsetX: -0.327,offsetY: 0.25		});

		var ENG1002_osci = new AR.Trackable2DObject(this.tracker, "ENG1002_OS", {
			drawables: {
				cam: [Tutorial,Eq_name_Os,O1_c1b1, O1_c1b2, O1_c1b3, O1_c1b4, O1_c1b5, O1_round1,O1_mult_purpose_knob, O1_c2b1 , O1_c2b2, O1_c2b3, O1_c3b1, O1_c3b2, O1_c3b3, O1_c5b1, O1_c5b2, O1_c5b3, O1_c7b1 ,O1_c7b2 ,O1_c7b3 ,O1_c7b4,O1_c7b5,O1_c7b6,O1_c8b1,O1_c8b2,O1_c8b3,O1_c8b4,O1_c8b5,O1_c8b6,O1_c4b1,O1_c4b2,O1_c4b3,O1_c6b1,O1_c6b2,O1_c6b3]
			}
		});
		//====================================================End of Oscilloscope ENG1002=============================================================================================

		//=======================================================ENG1002 Function Generator ===========================================================================================
		

		var fg_c1b1 = new AR.ImageDrawable(imgOne, 0.05, {	offsetX: -0.5724,offsetY:  0.305	});
		var fg_c1b2 = new AR.ImageDrawable(imgOne, 0.05, {	offsetX: -0.5724,offsetY:  0.2091	});
		var fg_c1b3 = new AR.ImageDrawable(imgOne, 0.05, {	offsetX: -0.5724,offsetY:  0.1106	});
		var fg_c1b4 = new AR.ImageDrawable(imgOne, 0.05, {	offsetX: -0.5724,offsetY:  0.0019	});
		var fg_c1b5 = new AR.ImageDrawable(imgOne, 0.05, {	offsetX: -0.5724,offsetY: -0.0968	});
		var fg_c1b6 = new AR.ImageDrawable(imgOne, 0.05, {	offsetX: -0.5724,offsetY: -0.2055	});
		
		var fg_r1b1 = new AR.ImageDrawable(imgOne, 0.05, {	offsetX: -1.521,offsetY: -0.3757	});
		var fg_r1b2 = new AR.ImageDrawable(imgOne, 0.05, {	offsetX: -1.3629,offsetY: -0.3757	});
		var fg_r1b3 = new AR.ImageDrawable(imgOne, 0.05, {	offsetX: -1.2048,offsetY: -0.3757	});
		var fg_r1b4 = new AR.ImageDrawable(imgOne, 0.05, {	offsetX: -1.0467,offsetY: -0.3757	});
		var fg_r1b5 = new AR.ImageDrawable(imgOne, 0.05, {	offsetX: -0.8886,offsetY: -0.3757	});	
		var fg_r1b6 = new AR.ImageDrawable(imgOne, 0.05, {	offsetX: -0.7305,offsetY: -0.3757	});
		var fg_r1b7 = new AR.ImageDrawable(imgOne, 0.05, {	offsetX: -0.5724,offsetY: -0.3757	});
	
		var fg_c2b1 = new AR.ImageDrawable(imgOne, 0.05, {	offsetX: -0.3785,offsetY:  0.2933	});
		var fg_c2b2 = new AR.ImageDrawable(imgOne, 0.05, {	offsetX: -0.3785,offsetY:  0.1653	});
		var fg_c2b3 = new AR.ImageDrawable(imgOne, 0.05, {	offsetX: -0.3785,offsetY:  0.0512	});
		var fg_c2b4 = new AR.ImageDrawable(imgOne, 0.05, {	offsetX: -0.3785,offsetY: -0.0768	});

		var fg_c3b1 = new AR.ImageDrawable(imgOne, 0.05, {	offsetX: -0.1979,offsetY:  0.2933	});
		var fg_c4b1 = new AR.ImageDrawable(imgOne, 0.05, {	offsetX:  -0.0397,offsetY:  0.2933	});
		var fg_c5b1 = new AR.ImageDrawable(imgOne, 0.05, {	offsetX:  0.1473,offsetY:  0.2933	});
		var fg_c5b2 = new AR.ImageDrawable(imgOne, 0.05, {	offsetX:  0.1573,offsetY:  0.1781	});
		var fg_c5b3 = new AR.ImageDrawable(imgOne, 0.05, {	offsetX:  0.1573,offsetY:  0.1081	});
		var fg_c5b4 = new AR.ImageDrawable(imgOne, 0.05, {	offsetX:  0.1573,offsetY: -0.0768	});

		var fg_c6knob = new AR.ImageDrawable(imgRound, 0.19, { offsetX: 0.3971,offsetY: 0.2357	});
		var fg_c6lb1 = new AR.ImageDrawable(imgOne, 0.05, {	offsetX:  0.2953,offsetY:  0.06865	});
		var fg_c6lb2 = new AR.ImageDrawable(imgOne, 0.05, {	offsetX:  0.2954,offsetY:  -0.0768	});
		var fg_c6rb1 = new AR.ImageDrawable(imgOne, 0.05, {	offsetX:  0.4473,offsetY:  0.06865	});
		var fg_c6rb2 = new AR.ImageDrawable(imgOne, 0.05, {	offsetX:  0.4473,offsetY:  -0.0768	});

		//this variable is ONLY meant to show in the tutorials
		//var fg_temp = new AR.ImageDrawable(imgCircle, 0.52, {offsetX: -0.0795, offsetY: 0.02825});

		var ENG1002_fg = new AR.Trackable2DObject(this.tracker, "ENG1002_FG", {
			drawables: {
				cam: [Tutorial,Eq_name_FG, fg_c1b1,fg_c1b2,fg_c1b3,fg_c1b4,fg_c1b5,fg_c1b6,fg_c2b1,fg_c2b2,fg_c2b3,fg_c2b4,fg_r1b1,fg_r1b2,fg_r1b3,fg_r1b4,fg_r1b5,fg_r1b6,fg_r1b7,fg_c3b1,fg_c4b1,fg_c5b1,fg_c5b2,fg_c5b3,fg_c5b4,fg_c6knob,fg_c6lb1,fg_c6lb2,fg_c6rb1,fg_c6rb2]
			}
		});

		//=======================================================End of ENG1002 Function Generator===========================================================================================

		
		//====================================Power Supply ENG1002==========================================================================================================================================
		

		var ps_round1 = new AR.ImageDrawable(imgRound, 0.3, {
			offsetX: -0.085,
			offsetY: 0.26,
		});

		var ps_round2 = new AR.ImageDrawable(imgRound, 0.3, {
			offsetX: 0.36,
			offsetY: 0.26,
		});

		var ps_rect = new AR.ImageDrawable(imgTwo, 0.4, { //13cm and 4.5cm
			offsetX: -1.7583,
			offsetY: -0.325,
		});

		var ENG1002_power = new AR.Trackable2DObject(this.tracker, "ENG1002_PowerSupply", {
			drawables: {
				cam: [Tutorial, Eq_name_PS, ps_round1, ps_round2, ps_rect]
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
