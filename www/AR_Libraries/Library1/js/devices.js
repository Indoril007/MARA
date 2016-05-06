

function Button(name, type, scale, offsetX, offsetY, description) {
	this.name = name;
	this.type = type;
	this.scale = scale;
	this.offsetX = offsetX;
	this.offsetY = offsetY;
	this.description = description;
}

function Step(index, buttons, description) {
	this.index = index;
	this.buttons = buttons || [];
	this. description = description;
}

Step.prototype.addButton = function(button) {
	this.buttons.push(button);
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

Device.prototype.addButton = function(button) {
	this.buttons.push(button);
}

Device.prototype.addTutorial = function(tutorial) {
	this.tutorials.push(tutorial);
}

//=======================================================Function Generator ECSE Lab===========================================================================================

var ECSE_func_gen = new Device("function generator half");

var ECSE_func_gen_c1b1 = new Button("Navigation 1"	, "rect"	, 0.05, -0.511, 0.235, "Use this button to navigate menu options");
ECSE_func_gen.addButton(ECSE_func_gen_c1b1);

var ECSE_func_gen_c1b2 = new Button("Navigation 2"	, "rect"	, 0.05, -0.511, 0.133, "Use this button to navigate menu options");
ECSE_func_gen.addButton(ECSE_func_gen_c1b2);

var ECSE_func_gen_c1b3 = new Button("Navigation 3"	, "rect"	, 0.05, -0.511, 0.031, "Use this button to navigate menu options");
ECSE_func_gen.addButton(ECSE_func_gen_c1b3);

var ECSE_func_gen_c1b4 = new Button("Navigation 4"	, "rect"	, 0.05, -0.511,-0.071, "Use this button to navigate menu options");
ECSE_func_gen.addButton(ECSE_func_gen_c1b4);

var ECSE_func_gen_c1b5 = new Button("Navigation 5"	, "rect"	, 0.05, -0.511,-0.173, "Use this button to navigate menu options");
ECSE_func_gen.addButton(ECSE_func_gen_c1b5);

var ECSE_func_gen_c2b1 = new Button("Sine"	, "rect"	, 0.07, -0.324, 0.350, "Use this button to generate sine wave");
ECSE_func_gen.addButton(ECSE_func_gen_c2b1);

var ECSE_func_gen_c2b2 = new Button("Square", "rect"	, 0.07, -0.324, 0.258, "Use this button to generate a square pulse");
ECSE_func_gen.addButton(ECSE_func_gen_c2b2);

var ECSE_func_gen_c2b3 = new Button("Ramp"	, "rect"	, 0.07, -0.324, 0.166, "Use this button to generate a ramp signal");
ECSE_func_gen.addButton(ECSE_func_gen_c2b3);

var ECSE_func_gen_c2b4 = new Button("Pulse"	, "rect"	, 0.07, -0.324, 0.076, "Use this button to generate a pulse signal");
ECSE_func_gen.addButton(ECSE_func_gen_c2b4);

var ECSE_func_gen_c2b5 = new Button("Arb"	, "rect"	, 0.07, -0.324,-0.013, "Use this button to ??");
ECSE_func_gen.addButton(ECSE_func_gen_c2b5);

var ECSE_func_gen_c2b6 = new Button("Other"	, "rect"	, 0.07, -0.324,-0.102, "Use this button to ??");
ECSE_func_gen.addButton(ECSE_func_gen_c2b6);

var ECSE_func_gen_round = new Button("Top Menu"	, "round"	, 0.1, -0.511, 0.377, "Use this button to navigate to Top Menu");
ECSE_func_gen.addButton(ECSE_func_gen_round);

var devices = [ECSE_func_gen];



