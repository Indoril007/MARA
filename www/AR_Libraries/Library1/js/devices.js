

function Button(name, imgPath, scale, offsetX, offsetY, description) {
	this.name = name;
	this.imgPath = imgPath;
	this.scale = scale;
	this.offsetX = offsetX;
	this.offsetY = offsetY;
	this.description = description;
}

Button.prototype.getARImageDrawable = function() {
	var overlayImg = new AR.ImageResource(this.imgPath);
	return new AR.ImageDrawable(overlayImg, this.scale, {offsetX: this.offsetX, offsetY: this.offsetY});
}

function Step(index, buttons, description) {
	this.index = index;
	this.buttons = buttons || [];
	this. description = description;
}

Step.prototype.addButtons = function(buttons) {
	for(var i = 0; i < buttons.length; i++) {
		this.buttons.push(buttons[i]);
	}
}

Step.prototype.addDescription = function(description) {
	this.description.push(description);
}

function Tutorial(name, steps) {
	this.name = name;
	this.steps = steps || [];
}

Tutorial.prototype.addStep = function(step) {
	this.steps.push(step);
}

function Device(name, buttons, tutorials) {
	this.name = name;
	this.buttons = buttons || [];
	this.tutorials = tutorials || [];
}

Device.prototype.addButtons = function(buttons) {
	for(var i = 0; i < buttons.length; i++) {
		this.buttons.push(buttons[i]);
	}
}

Device.prototype.addTutorial = function(tutorial) {
	this.tutorials.push(tutorial);
}

//===========================================================Overlay Library=================================================================================================//
	var imgRect = "assets/marker1.png";
	var imgRound = "assets/RoundMarker.png";
	var imgTute = "assets/Tute-button.png";
	var imgName_Os = "assets/Oscilloscope.png";	//Oscilloscope
	var imgName_FG = "assets/FuncGen.png";	//Function Generator
	var imgName_PS= "assets/PowSup.png";	//Power supply

//=======================================================Function Generator ECSE Lab===========================================================================================

var ECSE_func_gen = new Device("function generator half");

var ECSE_func_gen_c1b1 = new Button("Navigation 1"	, imgRect	, 0.05, -0.511, 0.235, "Use this button to navigate menu options");
var ECSE_func_gen_c1b2 = new Button("Navigation 2"	, imgRect	, 0.05, -0.511, 0.133, "Use this button to navigate menu options");
var ECSE_func_gen_c1b3 = new Button("Navigation 3"	, imgRect	, 0.05, -0.511, 0.031, "Use this button to navigate menu options");
var ECSE_func_gen_c1b4 = new Button("Navigation 4"	, imgRect	, 0.05, -0.511,-0.071, "Use this button to navigate menu options");
var ECSE_func_gen_c1b5 = new Button("Navigation 5"	, imgRect	, 0.05, -0.511,-0.173, "Use this button to navigate menu options");
var ECSE_func_gen_c2b1 = new Button("Sine"	, imgRect	, 0.07, -0.324, 0.350, "Use this button to generate sine wave");
var ECSE_func_gen_c2b2 = new Button("Square", imgRect	, 0.07, -0.324, 0.258, "Use this button to generate a square pulse");
var ECSE_func_gen_c2b3 = new Button("Ramp"	, imgRect	, 0.07, -0.324, 0.166, "Use this button to generate a ramp signal");
var ECSE_func_gen_c2b4 = new Button("Pulse"	, imgRect	, 0.07, -0.324, 0.076, "Use this button to generate a pulse signal");
var ECSE_func_gen_c2b5 = new Button("Arb"	, imgRect	, 0.07, -0.324,-0.013, "Use this button to ??");
var ECSE_func_gen_c2b6 = new Button("Other"	, imgRect	, 0.07, -0.324,-0.102, "Use this button to ??");
var ECSE_func_gen_round = new Button("Top Menu"	, imgRound	, 0.1, -0.511, 0.337, "Use this button to navigate to Top Menu");

ECSE_func_gen.addButtons(	[ECSE_func_gen_c1b1, ECSE_func_gen_c1b2, ECSE_func_gen_c1b3, ECSE_func_gen_c1b4, ECSE_func_gen_c1b5,  
							 ECSE_func_gen_c2b1, ECSE_func_gen_c2b2, ECSE_func_gen_c2b3, ECSE_func_gen_c2b4, ECSE_func_gen_c2b5,
							 ECSE_func_gen_c2b6, ECSE_func_gen_round]);

//====================================================End of Function Generator ECSE Lab=======================================================================================

//=======================================================Oscilloscope ENG1002==================================================================================================

var ENG1002_osci = new Device("ENG1002_Oscilloscope");

var ENG1002_osci_O1_c1b1	 = new Button("Navigation 1", imgRect, 0.06, -0.426, 0.2445, "Use this button to navigate menu items")
var ENG1002_osci_O1_c1b2	 = new Button("Navigation 2", imgRect, 0.06, -0.426, 0.138, "Use this button to navigate menu items")
var ENG1002_osci_O1_c1b3	 = new Button("Navigation 3", imgRect, 0.06, -0.426, 0.0315, "Use this button to navigate menu items")
var ENG1002_osci_O1_c1b4	 = new Button("Navigation 4", imgRect, 0.06, -0.426, -0.075, "Use this button to navigate menu items")
var ENG1002_osci_O1_c1b5	 = new Button("Navigation 5", imgRect, 0.06, -0.426, -0.1815, "Use this button to navigate menu items")
var ENG1002_O1_round1 		 = new Button("Probe Check", imgRound, 0.1, -0.42, -0.28, "Use this button to navigate menu items")
var ENG1002_O1_mult_purpose_knob = new Button("Multi Purpose Knob", imgRound, 0.25, -0.224, 0.328, "Use this button to navigate menu items")

ENG1002_osci.addButtons(	[ENG1002_osci_O1_c1b1, ENG1002_osci_O1_c1b2, ENG1002_osci_O1_c1b3, ENG1002_osci_O1_c1b4, 
								 ENG1002_osci_O1_c1b5, ENG1002_O1_round1, ENG1002_O1_mult_purpose_knob]);

//====================================================End of Oscilloscope ENG1002=======================================================================================


var devices = [ECSE_func_gen, ENG1002_osci];

