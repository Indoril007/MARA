

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

function Device(name, buttons, tutorialButton, tutorials) {
	this.name = name;
	this.buttons = buttons || [];
	this.tutorialButton = tutorialButton;
	this.tutorials = tutorials || {};
}

Device.prototype.addButtons = function(buttons, tutorialButton) {
	for(var i = 0; i < buttons.length; i++) {
		this.buttons.push(buttons[i]);
	}
	this.tutorialButton = tutorialButton;
}

Device.prototype.addTutorial = function(tutorial) {
	this.tutorials[tutorial.name] = tutorial;
}

//===========================================================Overlay Library=================================================================================================//
	var imgRect = "assets/marker1.png";
	var imgVertRect = "assets/marker2.png";
	var imgRound = "assets/RoundMarker.png";
	var imgTute = "assets/Tute-button.png";
	var imgName_Os = "assets/Oscilloscope.png";	//Oscilloscope
	var imgName_FG = "assets/FuncGen.png";	//Function Generator
	var imgName_PS= "assets/PowSup.png";	//Power supply
	var imgCircle = "assets/circle.png";


//=======================================================Function Generator ECSE Lab===========================================================================================

var ECSE_func_gen = new Device("function generator half");

var ECSE_func_gen_power = new Button("Power Button"	, imgRect	, 0.06, -1.3165, -0.3462, "Use this button to Switch on the equipment");
var ECSE_func_gen_round = new Button("Top Menu"	, imgRound	, 0.1, -0.511, 0.337, "Use this button to navigate to Top Menu");
var ECSE_func_gen_c1b1 = new Button("Navigation 1"	, imgRect	, 0.05, -0.511, 0.235, "Use this button to navigate menu options");
var ECSE_func_gen_c1b2 = new Button("Navigation 2"	, imgRect	, 0.05, -0.511, 0.133, "Use this button to navigate menu options");
var ECSE_func_gen_c1b3 = new Button("Navigation 3"	, imgRect	, 0.05, -0.511, 0.0317, "Use this button to navigate menu options");
var ECSE_func_gen_c1b4 = new Button("Navigation 4"	, imgRect	, 0.05, -0.511,-0.0696, "Use this button to navigate menu options");
var ECSE_func_gen_c1b5 = new Button("Navigation 5"	, imgRect	, 0.05, -0.511,-0.1709, "Use this button to navigate menu options");
var ECSE_func_gen_c1b6 = new Button("Navigation Back"	, imgRound	, 0.08, -0.511,-0.26, "Use this button to navigate menu options");
var ECSE_func_gen_c1b7 = new Button("View Button"	, imgRect	, 0.05, -0.511,-0.3412, "Use this button to to compare waveforms");

var ECSE_func_gen_c2b1 = new Button("Sine"	, imgRect	, 0.07, -0.324, 0.350, "Use this button to generate sine wave");
var ECSE_func_gen_c2b2 = new Button("Square", imgRect	, 0.07, -0.324, 0.2575, "Use this button to generate a square pulse");
var ECSE_func_gen_c2b3 = new Button("Ramp"	, imgRect	, 0.07, -0.324, 0.1651, "Use this button to generate a ramp signal");
var ECSE_func_gen_c2b4 = new Button("Pulse"	, imgRect	, 0.07, -0.324, 0.0726, "Use this button to generate a pulse signal");
var ECSE_func_gen_c2b5 = new Button("Arb"	, imgRect	, 0.07, -0.324,-0.0198, "Use this button to ??");
var ECSE_func_gen_c2b6 = new Button("Other"	, imgRect	, 0.07, -0.324,-0.1099, "Use this button to ??");
var ECSE_func_gen_c2b7 = new Button("Channel On"	, imgRect	, 0.05, -0.324,-0.2215, "Use this button to enable channel output");
var ECSE_func_gen_r1b1 = new Button("Continuous"	, imgRect	, 0.05, -0.1915, 0.350, "Use this button to control run mode");
var ECSE_func_gen_r1b2 = new Button("Modulation"	, imgRect	, 0.05, -0.0761, 0.350, "Use this button to control run mode");
var ECSE_func_gen_r1b3 = new Button("Sweep"	, imgRect	, 0.05, 0.0392, 0.350, "Use this button to control run mode");
var ECSE_func_gen_r1b4 = new Button("Burst"	, imgRect	, 0.05, 0.1546, 0.350, "Use this button to control run mode");
var ECSE_func_gen_r2b1 = new Button("Frequency/Period", imgRect, 0.07, -0.1353,0.258, "Short cut to adjust Frequency and Period ");
var ECSE_func_gen_r2b2 = new Button("Amplitude/High", imgRect, 0.07, 0.0316,0.258, "Short cut to adjust Amplitude and High");
var ECSE_func_gen_r2b3_knob = new Button("Multipurpose knob", imgRound, 0.35, 0.3641,0.2958, "Use this knob to adjust values");
var ECSE_func_gen_r3b1 = new Button("Phase| Delay", imgRect, 0.07, -0.1353, 0.166, "Short cut to adjust Phase and Delay");
var ECSE_func_gen_r3b2 = new Button("Offset/Low", imgRect, 0.07, 0.0316, 0.166, "Short cut to adjust Offset and Low");	
var ECSE_func_gen_r3b3 = new Button("Shift Left", imgRect, 0.05, 0.2426, 0.166, "Use this button to increment decimal place");
var ECSE_func_gen_r3b4 = new Button("Shift Right", imgRect, 0.05, 0.4616, 0.166, "Use this button to decrement decimal place");	
var ECSE_func_gen_r4b1 = new Button("Duty/Width", imgRect, 0.05, -0.198, 0.076, "Short cut to adjust Duty width");
var ECSE_func_gen_r4b2 = new Button("Leading/Trail", imgRect, 0.05, -0.0855, 0.076, "Short cut to adjust Leading and Trail");	
var ECSE_func_gen_r5b1 = new Button("Edit Menu", imgRect, 0.05, -0.198, -0.013, "Use this button to open the Edit Menu");
var ECSE_func_gen_r5b2 = new Button("Utility Menu", imgRect, 0.05, -0.0855, -0.013, "Use this button to open the Utility Menu");	
var ECSE_func_gen_r5b3 = new Button("Help", imgRect, 0.05, 0.0261, -0.013, "User this button to open the Help menu");
var ECSE_func_gen_r6b1 = new Button("Save Menu", imgRect, 0.05, -0.198, -0.1099, "Use this button to Save waveform");
var ECSE_func_gen_r6b2 = new Button("Recall Menu", imgRect, 0.05, -0.0855, -0.1099, "");
var ECSE_func_gen_r6b3 = new Button("Default", imgRect, 0.05, 0.0261, -0.1099, "Reset to default settings");		
var ECSE_func_gen_keypad = new Button("Key Pad", imgCircle, 0.5, 0.2794, -0.0386, "Key in values");

var ECSE_func_gen_tutorials = new Button("Tutorials"	, imgTute	, 0.25, -0.45, -0.65, "Click this button for tutorials");
var ECSE_func_gen_name = new Button("Name"	, imgName_FG	, 0.4, -0.45, 0.6, "Fill this with simple description on Func Gen");

ECSE_func_gen.addButtons(	[ECSE_func_gen_power, ECSE_func_gen_c1b1, ECSE_func_gen_c1b2, ECSE_func_gen_c1b3, ECSE_func_gen_c1b4, ECSE_func_gen_c1b5, ECSE_func_gen_c1b6, ECSE_func_gen_c1b7,
							 ECSE_func_gen_c2b1, ECSE_func_gen_c2b2, ECSE_func_gen_c2b3, ECSE_func_gen_c2b4, ECSE_func_gen_c2b5, ECSE_func_gen_c2b6, ECSE_func_gen_c2b7, 
							 ECSE_func_gen_r1b1, ECSE_func_gen_r1b2, ECSE_func_gen_r1b3, ECSE_func_gen_r1b4, 
							 ECSE_func_gen_r2b1, ECSE_func_gen_r2b2, ECSE_func_gen_r2b3_knob,
							 ECSE_func_gen_r3b1, ECSE_func_gen_r3b2, ECSE_func_gen_r3b3, ECSE_func_gen_r3b4,
							 ECSE_func_gen_r4b1, ECSE_func_gen_r4b2,
							 ECSE_func_gen_r5b1, ECSE_func_gen_r5b2, ECSE_func_gen_r5b3,
							 ECSE_func_gen_r6b1, ECSE_func_gen_r6b2, ECSE_func_gen_r6b3,ECSE_func_gen_round,ECSE_func_gen_name], ECSE_func_gen_tutorials);


var ECSE_func_gen_tutorial_1 = new Tutorial('Basic Sine Wave'); //Select sine waveform and adjust frequency
ECSE_func_gen_tutorial_1.addStep(new Step(0, [ECSE_func_gen_power], 'Turn on the instrument'));
ECSE_func_gen_tutorial_1.addStep(new Step(1, [ECSE_func_gen_c2b1], 'Select Sine Waveform'));	
ECSE_func_gen_tutorial_1.addStep(new Step(2, [ECSE_func_gen_r1b1], 'Select continuous run mode'));	
ECSE_func_gen_tutorial_1.addStep(new Step(3, [ECSE_func_gen_r2b1], 'Push the Frequency/Period button'));
ECSE_func_gen_tutorial_1.addStep(new Step(4, [ECSE_func_gen_keypad], 'Use the numeric keypad to change the frequency value'));
ECSE_func_gen_tutorial_1.addStep(new Step(5, [ECSE_func_gen_c1b1,ECSE_func_gen_c1b2,ECSE_func_gen_c1b3,ECSE_func_gen_c1b4,ECSE_func_gen_c1b5], 'Choose your unit'));
ECSE_func_gen_tutorial_1.addStep(new Step(6, [ECSE_func_gen_r2b3_knob,ECSE_func_gen_r3b3,ECSE_func_gen_r3b4], 'Alternatively, you can also use the knob and arrow keys'));
ECSE_func_gen_tutorial_1.addStep(new Step(7, [ECSE_func_gen_c2b7], 'Lastly, turn on the channel output'));

var ECSE_func_gen_tutorial_2 = new Tutorial('Adjust Amplitude Level');
ECSE_func_gen_tutorial_2.addStep(new Step(0, [ECSE_func_gen_r2b2], 'Push Amplitude/High button'));
ECSE_func_gen_tutorial_2.addStep(new Step(1, [ECSE_func_gen_keypad], 'Use the numeric keypad to key in Peak to Peak Voltage'));	
ECSE_func_gen_tutorial_2.addStep(new Step(2, [ECSE_func_gen_c1b2], 'Push the offset menu'));	
ECSE_func_gen_tutorial_2.addStep(new Step(3, [ECSE_func_gen_keypad], 'Key in the desired voltage offset'));
ECSE_func_gen_tutorial_2.addStep(new Step(4, [ECSE_func_gen_c2b7], 'Lastly, turn on the channel output'));

var ECSE_func_gen_tutorial_3 = new Tutorial('Save / Recall Setups');
ECSE_func_gen_tutorial_3.addStep(new Step(0, [ECSE_func_gen_r6b1,ECSE_func_gen_r6b2], 'Choose to save or recall a set up'));
ECSE_func_gen_tutorial_3.addStep(new Step(1, [ECSE_func_gen_r2b3_knob], 'Use the knob to select a setup'));	
ECSE_func_gen_tutorial_3.addStep(new Step(2, [ECSE_func_gen_c1b2], 'Push the button to save / recall'));	
ECSE_func_gen_tutorial_3.addStep(new Step(3, [ECSE_func_gen_c1b5], 'Optional - Push More button to delete a saved setup'));
ECSE_func_gen_tutorial_3.addStep(new Step(4, [ECSE_func_gen_c1b2], 'Optional - Push Erase button '));
ECSE_func_gen_tutorial_3.addStep(new Step(5, [ECSE_func_gen_c1b4], 'Optional - Push Ok to confirm '));

var ECSE_func_gen_tutorial_4 = new Tutorial('Adjust Load Impedance');
ECSE_func_gen_tutorial_4.addStep(new Step(0, [ECSE_func_gen_c1b5], 'Press the Output Menu'));
ECSE_func_gen_tutorial_4.addStep(new Step(1, [ECSE_func_gen_c1b1], 'Push the Load Impedance button'));	
ECSE_func_gen_tutorial_4.addStep(new Step(2, [ECSE_func_gen_c1b3,ECSE_func_gen_c1b1], 'Push the buttons for preloaded 50 Ohms and High Impedence'));	
ECSE_func_gen_tutorial_4.addStep(new Step(3, [ECSE_func_gen_c1b2], 'Or push the button to change the load impedance manually'));
ECSE_func_gen_tutorial_4.addStep(new Step(4, [ECSE_func_gen_keypad], 'Use the numeric keypad to set the load impedance '));
ECSE_func_gen_tutorial_4.addStep(new Step(5, [ECSE_func_gen_r2b3_knob,ECSE_func_gen_r3b3,ECSE_func_gen_r3b4], 'Alternatively, you can also use the knob and arrow keys '));

ECSE_func_gen.addTutorial(ECSE_func_gen_tutorial_1);		 
ECSE_func_gen.addTutorial(ECSE_func_gen_tutorial_2);
ECSE_func_gen.addTutorial(ECSE_func_gen_tutorial_3);
ECSE_func_gen.addTutorial(ECSE_func_gen_tutorial_4);

//====================================================End of Function Generator ECSE Lab=======================================================================================

//=======================================================Oscilloscope ECSE Lab==================================================================================================
var ECSE_osci = new Device("Lab_Oscilloscope");

var ECSE_osci_tutorials = new Button("Tutorials"	, imgTute	, 0.25, -0.45, -0.65, "Click this button for tutorials");
var ECSE_osci_name = new Button("Name"	, imgName_Os	, 0.4, -0.45, 0.6, "Fill this with simple description on Func Gen");

var ECSE_osci_c1b1 = new Button("Menu Button 1", imgRect, 0.06, -0.6, 0.2795, "Use this button to navigate menu options");
var ECSE_osci_c1b2 = new Button("Menu Button 2", imgRect, 0.06, -0.6, 0.171, "Use this button to navigate menu options");
var ECSE_osci_c1b3 = new Button("Menu Button 3", imgRect, 0.06, -0.6, 0.0635, "Use this button to navigate menu options");
var ECSE_osci_c1b4 = new Button("Menu Button 4", imgRect, 0.06, -0.6, -0.044, "Use this button to navigate menu options");
var ECSE_osci_c1b5 = new Button("Menu Button 5", imgRect, 0.06, -0.6, -0.1505, "Use this button to navigate menu options");
var ECSE_osci_c1b6_round = new Button("Check Probe", imgRound, 0.08, -0.6, -0.23, "Use this button to check probe functionality");

var ECSE_osci_mult_purpose_knob = new Button("Menu Probe", imgRound, 0.2, -0.377, 0.383, "Use this button to adjust menu values");
var ECSE_osci_r1b1 = new Button("Autorange", imgRect, 0.06, -0.2214, 0.433, "");
var ECSE_osci_r1b2 = new Button("Save/Recall", imgRect, 0.06, -0.0969, 0.433, "User this button to save and recall waveforms");	
var ECSE_osci_r1b3 = new Button("Measure", imgRect, 0.06, 0.0276, 0.433, "Use this button to toggle Measure menu");	
var ECSE_osci_r1b4 = new Button("Acquire", imgRect, 0.06, 0.152, 0.433, "Use this button to toggle Acquire menu");
var ECSE_osci_r1b5 = new Button("Help", imgRect, 0.06, 0.2765, 0.433, "Use this button to toggle Help menu");
var ECSE_osci_r1b6 = new Button("Autoset", imgRect, 0.06, 0.4010, 0.433, "Use this button to Autoset the waveform scale");

var ECSE_osci_r2b1 = new Button("Reference Menu", imgRect, 0.06, -0.2214, 0.338, "Use this button to toggle Reference function");
var ECSE_osci_r2b2 = new Button("Utility", imgRect, 0.06, -0.0969, 0.338, "Use this button to toggle Utility menu");	
var ECSE_osci_r2b3 = new Button("Cursor", imgRect, 0.06, 0.0276, 0.338, "Use this button to toggle Cursor menu");	
var ECSE_osci_r2b4 = new Button("Display", imgRect, 0.06, 0.152, 0.338, "Use this button to toggle Display menu");
var ECSE_osci_r2b5 = new Button("Default Setup", imgRect, 0.06, 0.2765, 0.338, "Use this button to toggle Default Setup menu");
var ECSE_osci_r2b6 = new Button("Single Sequence", imgRect, 0.06, 0.4010, 0.338, "Use this button to run single sequence");
var ECSE_osci_run_stop = new Button("Run / Stop", imgRect, 0.06, 0.5307, 0.383, "Use this button to pause and resume the waveform");

var ECSE_osci_r3b1 = new Button("Print", imgRound, 0.1, -0.3874, 0.2117, "Use this button to print the waveform");	
var ECSE_osci_r3b2 = new Button("Trigger view", imgRect, 0.06, -0.2214, 0.2117, "HECSE_oscid this button to view the trigger level");	
var ECSE_osci_r3b3 = new Button("Force Trigger", imgRect, 0.06, -0.0969, 0.2117, "Use this button to toggle the Force Trigger function");	
var ECSE_osci_r3b4 = new Button("Set to 50%", imgRect, 0.06, 0.0246, 0.2117, "Use this button to change the trigger level by 50%");	
var ECSE_osci_r3b5_knob = new Button("Trigger Knob", imgRound, 0.12, 0.1906, 0.2066, "Use this knob to adjust the Trigger level");
var ECSE_osci_r3b6 = new Button("Trigger Menu", imgRect, 0.06, 0.3358, 0.2117, "Use this button to toggle the Trigger function");	
var ECSE_osci_r3b7 = new Button("Set to zero", imgRect, 0.06, 0.5225, 0.2117, "");

var ECSE_osci_r4b1 = new Button("Channel 1 position", imgRound, 0.12, -0.3978, 0.0653, "Use this knob to adjust Channel 1 vertical position value");	
var ECSE_osci_r4b2 = new Button("Channel 2 position", imgRound, 0.12, -0.1644, 0.0653, "Use this knob to adjust Channel 2 vertical position value");	
var ECSE_osci_r4b3 = new Button("Channel 3 position", imgRound, 0.12, 0.069, 0.0653, "Use this knob to adjust Channel 3 vertical position value");	
var ECSE_osci_r4b4 = new Button("Channel 4 position", imgRound, 0.12, 0.3024, 0.0653, "Use this knob to adjust Channel 4 vertical position value");	
var ECSE_osci_r4b5 = new Button("Horizontal position", imgRound, 0.12, 0.5385, 0.0602, "Use this knob to adjust Horizontal time position value");


var ECSE_osci_r5b1 = new Button("Channel 1 menu", imgRect, 0.05, -0.3874, -0.0408, "Use this button to toggle Channel 1 Menu");	
var ECSE_osci_r5b2 = new Button("Math menu", imgRect, 0.05, -0.2759, -0.0408, "Use this button to toggle Math function");	
var ECSE_osci_r5b3 = new Button("Channel 2 menu", imgRect, 0.05, -0.1644, -0.0408, "Use this button to toggle Channel 2 Menu");	
var ECSE_osci_r5b4 = new Button("Channel 3 menu", imgRect, 0.05, 0.059, -0.0408, "Use this button to toggle Channel 3 Menu");	
var ECSE_osci_r5b5 = new Button("Channel 4 menu", imgRect, 0.05, 0.292, -0.0458, "Use this button to toggle Channel 4 Menu");	
var ECSE_osci_r5b6 = new Button("Horizontal menu", imgRect, 0.05, 0.528, -0.0509, "Use this button to toggle Horizontal Menu");

var ECSE_osci_r6b1 = new Button("Channel 1 scale", imgRound, 0.2, -0.3978, -0.1923, "Use this knob to adjust Channel 1 vertical scale");	
var ECSE_osci_r6b2 = new Button("Channel 2 scale", imgRound, 0.2, -0.1644, -0.1923, "Use this knob to adjust Channel 2 vertical scale");	
var ECSE_osci_r6b3 = new Button("Channel 3 scale", imgRound, 0.2, 0.069, -0.1923, "Use this knob to adjust Channel 3 vertical scale");	
var ECSE_osci_r6b4 = new Button("Channel 4 scale", imgRound, 0.2, 0.3024, -0.1973, "Use this knob to adjust Channel 4 vertical scale");	
var ECSE_osci_r6b5 = new Button("Horizontal scale", imgRound, 0.2, 0.5385, -0.2117, "Use this knob to adjust Horizontal scale");

var ECSE_osci_result = new Button("Results of cursor", imgRect, 0.1, -0.7673, 0.07, "Use this knob to adjust Horizontal scale");

ECSE_osci.addButtons([ ECSE_osci_name, ECSE_osci_c1b1, ECSE_osci_c1b2, ECSE_osci_c1b3, ECSE_osci_c1b4, ECSE_osci_c1b5, ECSE_osci_c1b6_round,
							ECSE_osci_mult_purpose_knob, ECSE_osci_r1b1, ECSE_osci_r1b2, ECSE_osci_r1b3, ECSE_osci_r1b4, ECSE_osci_r1b5, ECSE_osci_r1b6, 
							ECSE_osci_r2b1, ECSE_osci_r2b2, ECSE_osci_r2b3, ECSE_osci_r2b4, ECSE_osci_r2b5, ECSE_osci_r2b6, ECSE_osci_run_stop,
							ECSE_osci_r3b1, ECSE_osci_r3b2, ECSE_osci_r3b3, ECSE_osci_r3b4, ECSE_osci_r3b5_knob, ECSE_osci_r3b6, ECSE_osci_r3b7,
							ECSE_osci_r4b1, ECSE_osci_r4b2, ECSE_osci_r4b3, ECSE_osci_r4b4, ECSE_osci_r4b5,
							ECSE_osci_r5b1, ECSE_osci_r5b2, ECSE_osci_r5b3, ECSE_osci_r5b4, ECSE_osci_r5b5, ECSE_osci_r5b6,
							ECSE_osci_r6b1, ECSE_osci_r6b2, ECSE_osci_r6b3, ECSE_osci_r6b4, ECSE_osci_r6b5], ECSE_osci_tutorials)

var ECSE_osci_tutorial_1 = new Tutorial('Set Probe Attenuation');
ECSE_osci_tutorial_1.addStep(new Step(0, [ECSE_osci_r5b1,ECSE_osci_r5b3,ECSE_osci_r5b4,ECSE_osci_r6b4], 'Push your Channel Menu button'));
ECSE_osci_tutorial_1.addStep(new Step(1, [ECSE_osci_c1b4], 'Push the Probe button'));	
ECSE_osci_tutorial_1.addStep(new Step(2, [ECSE_osci_c1b1], 'Push the Voltage button'));	
ECSE_osci_tutorial_1.addStep(new Step(3, [ECSE_osci_mult_purpose_knob], 'Use the knob to navigate between choices'));
ECSE_osci_tutorial_1.addStep(new Step(4, [], 'Make sure that the attenuation on your probe is the same'));
ECSE_osci_tutorial_1.addStep(new Step(5, [ECSE_osci_r1b6], 'Push the Autoset button to set a suitable scale automatically'));

var ECSE_osci_tutorial_2 = new Tutorial('Measure waveforms');
ECSE_osci_tutorial_2.addStep(new Step(0, [ECSE_osci_r1b3], 'Push Measure button'));
ECSE_osci_tutorial_2.addStep(new Step(1, [ECSE_osci_c1b1,ECSE_osci_c1b2,ECSE_osci_c1b3,ECSE_osci_c1b4,ECSE_osci_c1b5], 'Select a slot for the measurement'));	
ECSE_osci_tutorial_2.addStep(new Step(2, [ECSE_osci_c1b1], 'Push the button to find your channel'));	
ECSE_osci_tutorial_2.addStep(new Step(3, [ECSE_osci_mult_purpose_knob,ECSE_osci_c1b2], 'Use the knob or the button to choose measurement type'));
ECSE_osci_tutorial_2.addStep(new Step(4, [ECSE_osci_c1b5], 'Push the back button when done'));

var ECSE_osci_tutorial_3 = new Tutorial('Measure with cursor');
ECSE_osci_tutorial_3.addStep(new Step(0, [ECSE_osci_r6b1,ECSE_osci_r6b5,ECSE_osci_r4b1,ECSE_osci_r4b5], 'Use these knobs (of your channel) to focus on targeted area'));
ECSE_osci_tutorial_3.addStep(new Step(1, [ECSE_osci_r2b3], 'Push Cursor button'));	
ECSE_osci_tutorial_3.addStep(new Step(2, [ECSE_osci_c1b1], 'Push the button to select voltage or time measurement'));	
ECSE_osci_tutorial_3.addStep(new Step(3, [ECSE_osci_c1b2], 'Push the button to select your channel'));
ECSE_osci_tutorial_3.addStep(new Step(4, [ECSE_osci_c1b4,ECSE_osci_c1b5], 'Select which cursor to control'));
ECSE_osci_tutorial_3.addStep(new Step(5, [ECSE_osci_mult_purpose_knob], 'Use the knob to adjust cursor position'));
ECSE_osci_tutorial_3.addStep(new Step(6, [ECSE_osci_result], 'Read your results here'));

var ECSE_osci_tutorial_4 = new Tutorial('Using Reference Waveform');
ECSE_osci_tutorial_4.addStep(new Step(0, [ECSE_osci_r1b2], 'Push the Save/Recall button'));
ECSE_osci_tutorial_4.addStep(new Step(1, [ECSE_osci_c1b1], 'Push the button to select "Save Waveform"'));	
ECSE_osci_tutorial_4.addStep(new Step(2, [ECSE_osci_c1b2], 'Push the button to select "Ref"'));	
ECSE_osci_tutorial_4.addStep(new Step(3, [ECSE_osci_c1b3], 'Push the button to select your channel'));
ECSE_osci_tutorial_4.addStep(new Step(4, [ECSE_osci_c1b4], 'Push the button to select where to save'));
ECSE_osci_tutorial_4.addStep(new Step(5, [ECSE_osci_c1b5], 'Push save'));
ECSE_osci_tutorial_4.addStep(new Step(6, [ECSE_osci_r2b1], 'To recall reference, push this button'));
ECSE_osci_tutorial_4.addStep(new Step(7, [ECSE_osci_c1b1,ECSE_osci_c1b2,ECSE_osci_c1b3,ECSE_osci_c1b4], 'Turn on the reference you saved'));



ECSE_osci.addTutorial(ECSE_osci_tutorial_1);
ECSE_osci.addTutorial(ECSE_osci_tutorial_2);
ECSE_osci.addTutorial(ECSE_osci_tutorial_3);
ECSE_osci.addTutorial(ECSE_osci_tutorial_4);

//====================================================End of Oscilloscope ECSE Lab=============================================================================================

//=======================================================Oscilloscope ENG1002==================================================================================================

var ENG1002_osci = new Device("ENG1002_OS");

var ENG1002_osci_O1_c1b1	 = new Button("Navigation 1", imgRect, 0.06, -0.546, 0.205, "Use this button to navigate menu items");
var ENG1002_osci_O1_c1b2	 = new Button("Navigation 2", imgRect, 0.06, -0.546, 0.0635, "Use this button to navigate menu items");
var ENG1002_osci_O1_c1b3	 = new Button("Navigation 3", imgRect, 0.06, -0.546, -0.069, "Use this button to navigate menu items");
var ENG1002_osci_O1_c1b4	 = new Button("Navigation 4", imgRect, 0.06, -0.546, -0.205, "Use this button to navigate menu items");
var ENG1002_osci_O1_c1b5	 = new Button("Navigation 5", imgRect, 0.06, -0.546, -0.335, "Use this button to navigate menu items");
var ENG1002_osci_round1 		 = new Button("Menu Toggle", imgRound, 0.1, -0.532, -0.4615, "Use this button to toggle menu display");
var ENG1002_osci_mult_purpose_knob = new Button("Multi Purpose Knob", imgRound, 0.25, -0.327, 0.25, "Use this knob to navigate menu items");

var ENG1002_osci_c2b1 = new Button("Math", imgRect,0.05, -0.408, -0.025, "Use this button to toggle Math function");
var ENG1002_osci_c2b2 = new Button("FFT", imgRect,0.05, -0.408, -0.1715,"Use this button to toggle Fast Fourier Transform function");
var ENG1002_osci_c2b3 = new Button("Ref", imgRect,0.05, -0.408, -0.3248,"Use this button to toggle Reference function");

var ENG1002_osci_c3b1 = new Button("Chn1 Position", imgRound,0.125, -0.2544, -0.0655,"Use this knob to adjust Channel 1 vertical position value");
var ENG1002_osci_c3b2 = new Button("Chn1 Menu", imgRect,0.05,-0.2544, -0.1715,"Use this button to toggle Channel 1 Menu");
var ENG1002_osci_c3b3 = new Button("Chn1 Knob", imgRound,0.17,-0.2544, -0.38,"Use this knob to adjust Channel 1 vertical scale");

var ENG1002_osci_c4b1 = new Button("Cursor", imgRect,0.06, -0.0971, 0.4001,"Use this button to toggle Cursor menu");
var ENG1002_osci_c4b2 = new	Button("Search", imgRect,0.06, -0.0971, 0.2751,"Use this button to toggle Search menu");
var ENG1002_osci_c4b3 = new Button("Course", imgRect,0.06, -0.0971, 0.1518,"Use this button to toggle Course menu");

var ENG1002_osci_c5b1 = new Button("Chn2 Position", imgRound,0.125, 0.01, -0.0655,"Use this knob to adjust Channel 2 vertical position value");
var ENG1002_osci_c5b2 = new Button("Chn2 Menu", imgRect,0.05, 0.01,-0.1715,"Use this button to toggle Channel 2 Menu");
var ENG1002_osci_c5b3 = new	Button("Chn2 Knob", imgRound,0.17, 0.015, -0.38,"Use this knob to adjust Channel 2 vertical scale");

var ENG1002_osci_c6b1 = new Button("Measure", imgRect,0.06, 0.0955, 0.4001,"Use this button to toggle Measure menu");
var ENG1002_osci_c6b2 = new Button("Save", imgRect,0.06, 0.0955, 0.2751,"Use this button to toggle Save or Recall menu");
var ENG1002_osci_c6b3 = new Button("Function", imgRect,0.06, 0.0955, 0.1518,"Use this button to toggle Function menu");

var ENG1002_osci_c7b1 = new	Button("Help", imgRect,0.06, 0.2942, 0.3981,"Use this button to toggle Help menu");
var ENG1002_osci_c7b2 = new Button("Setup", imgRect,0.06, 0.2942, 0.2751,"Use this button to toggle Default Setup menu");
var ENG1002_osci_c7b3 = new Button("Utility", imgRect,0.06, 0.2942, 0.1518,"Use this button to toggle Utility menu");
var ENG1002_osci_c7b4 = new Button("Horizontal Position", imgRound,0.125, 0.2942, -0.0655,"Use this knob to adjust horizontal position value");
var ENG1002_osci_c7b5 = new Button("Horizontal Acquire", imgRect,0.06, 0.2942, -0.1715,"Use this button to toggle Acquire menu");
var ENG1002_osci_c7b6 = new	Button("Horizontal Knob", imgRound,0.17, 0.2942, -0.38,"Use this knob to adjust horizontal scale value");

var ENG1002_osci_c8b1 = new Button("RunStop", imgRect,0.06, 0.476, 0.4001,"Use this button to toggle the Run/Stop function");
var ENG1002_osci_c8b2 = new Button("Single", imgRect,0.06, 0.476, 0.2751,"Use this button to toggle Single acquisition function");
var ENG1002_osci_c8b3 = new Button("Autoset", imgRect,0.06, 0.476, 0.1518,"Use this button to Autoset the waveform scale");
var ENG1002_osci_c8b4 = new Button("Trigger Menu", imgRect,0.06, 0.476, -0.025,"Use this button to toggle the Trigger function");
var ENG1002_osci_c8b5 = new Button("Trigger Knob", imgRound,0.125, 0.513, -0.2421,"Use this knob to adjust the Trigger level");
var ENG1002_osci_c8b6 = new	Button("Force Trigger", imgRect,0.06, 0.476, -0.3248,"Use this button to toggle the Force Trigger function");

var ENG1002_osci_tutorials = new Button("Tutorials"	, imgTute	, 0.25, -0.45, -0.75, "Click this button for tutorials");
var ENG1002_osci_name = new Button("Name"	, imgName_Os	, 0.4, -0.45, 0.65, "Fill this with simple description on Oscilloscope");

ENG1002_osci.addButtons(	[ENG1002_osci_O1_c1b1, ENG1002_osci_O1_c1b2, ENG1002_osci_O1_c1b3, ENG1002_osci_O1_c1b4, 
								 ENG1002_osci_O1_c1b5, ENG1002_osci_round1, ENG1002_osci_mult_purpose_knob, ENG1002_osci_c2b1,
								 ENG1002_osci_c2b2, ENG1002_osci_c2b3, ENG1002_osci_c3b1 ,ENG1002_osci_c3b2 ,ENG1002_osci_c3b3,
								 ENG1002_osci_c4b1, ENG1002_osci_c4b2, ENG1002_osci_c4b3, ENG1002_osci_c5b1, ENG1002_osci_c5b2, 
								 ENG1002_osci_c5b3, ENG1002_osci_c6b1, ENG1002_osci_c6b2, ENG1002_osci_c6b3, ENG1002_osci_c7b1,
								 ENG1002_osci_c7b2, ENG1002_osci_c7b3, ENG1002_osci_c7b4, ENG1002_osci_c7b5, ENG1002_osci_c7b6,
								 ENG1002_osci_c8b1, ENG1002_osci_c8b2, ENG1002_osci_c8b3, ENG1002_osci_c8b4, ENG1002_osci_c8b5,
								 ENG1002_osci_c8b6, ENG1002_osci_name], ENG1002_osci_tutorials);

//====================================================End of Oscilloscope ENG1002=======================================================================================

//====================================Power Supply ENG1002==========================================================================================================================================
var ENG1002_PowerSup = new Device("ENG1002_PowerSupply");

var ENG1002_PowerSup_round1 = new Button("Voltage Knob",imgRound, 0.3, -0.085, 0.26, "Use this knob to adjust Voltage level");
var ENG1002_PowerSup_round2 = new Button("Current Knob",imgRound, 0.3, 0.36, 0.26, "Use this knob to adjust Current level");
var ENG1002_PowerSup_rect = new Button("Power Button",imgVertRect,0.4, -1.7583, -0.325, "Use this button to toggle Power On or Off");

var ENG1002_PowerSup_tutorials = new Button("Tutorials"	, imgTute	, 0.25, -0.45, -0.75, "Click this button for tutorials");
var ENG1002_PowerSup_name = new Button("Name"	, imgName_PS	, 0.4, -0.45, 0.65, "Fill this with simple description on Power Supply");

ENG1002_PowerSup.addButtons(	[ENG1002_PowerSup_round1, ENG1002_PowerSup_round2, ENG1002_PowerSup_rect, ENG1002_PowerSup_name],
								 ENG1002_PowerSup_tutorials);

//====================================End of Power Supply ENG1002=========================================================================================================================================	

//=======================================================ENG1002 Function Generator ===========================================================================================
var ENG1002_func_gen = new Device("ENG1002_FG");

var ENG1002_func_gen_c1b1 = new Button("Navigation 1",imgRect, 0.05, -0.5724, 0.305, "Use this button to navigate menu items");
var ENG1002_func_gen_c1b2 = new Button("Navigation 2",imgRect, 0.05, -0.5724, 0.2091, "Use this button to navigate menu items");
var ENG1002_func_gen_c1b3 = new Button("Navigation 3",imgRect, 0.05, -0.5724, 0.1106, "Use this button to navigate menu items");
var ENG1002_func_gen_c1b4 = new Button("Navigation 4",imgRect, 0.05, -0.5724, 0.0019, "Use this button to navigate menu items");
var ENG1002_func_gen_c1b5 = new Button("Navigation 5",imgRect, 0.05, -0.5724, -0.0968, "Use this button to navigate menu items");
var ENG1002_func_gen_c1b6 = new Button("Navigation 6",imgRect, 0.05, -0.5724, -0.2055, "Use this button to navigate menu items");
		
var ENG1002_func_gen_r1b1 = new Button("Power",imgRect, 0.05,  -1.521, -0.3757	,"Use this button to toggle power On or Off");
var ENG1002_func_gen_r1b2 = new Button("Sine",imgRect, 0.05,  -1.3629, -0.3757	,"Use this button to generate a sine wave");
var ENG1002_func_gen_r1b3 = new Button("Square",imgRect, 0.05,  -1.2048, -0.3757,"Use this button to generate a square pulse");
var ENG1002_func_gen_r1b4 = new Button("Ramp",imgRect, 0.05,  -1.0467, -0.3757	,"Use this button to generate a ramp signal");
var ENG1002_func_gen_r1b5 = new Button("Pulse",imgRect, 0.05,  -0.8886, -0.3757	,"Use this button to generate a pulse signal");	
var ENG1002_func_gen_r1b6 = new Button("Arb",imgRect, 0.05,  -0.7305, -0.3757	,"Use this button to generate an arbitary waveform");
var ENG1002_func_gen_r1b7 = new Button("More",imgRect, 0.05,  -0.5724, -0.3757	,"Use this button to generate other signals");
	
var ENG1002_func_gen_c2b1 = new Button("Continuous",imgRect, 0.05,  -0.3785,  0.2933,"Use this button to toggle Continuous menu");
var ENG1002_func_gen_c2b2 = new Button("Sweep",imgRect, 0.05,  -0.3785,  0.1653	,"Use this button to toggle Sweep menu");
var ENG1002_func_gen_c2b3 = new Button("Modulation",imgRect, 0.05,  -0.3785,  0.0512,"Use this button to toggle Modulation menu");
var ENG1002_func_gen_c2b4 = new Button("Burst",imgRect, 0.05,  -0.3785, -0.0768	,"Use this button to toggle Burst menu");

var ENG1002_func_gen_c3b1 = new Button("Help",imgRect, 0.05,  -0.1979,  0.2933	,"Use this button to toggle Help menu");
var ENG1002_func_gen_c4b1 = new Button("Utility",imgRect, 0.05,   -0.0397,  0.2933	,"Use this button to toggle Utility menu");
var ENG1002_func_gen_c5b1 = new Button("Save",imgRect, 0.05,   0.1473,  0.2933	,"Use this button to toggle Save or Recall function");
var ENG1002_func_gen_c5b2 = new Button("Cancel",imgRect, 0.05,   0.1573,  0.1781	,"Use this button for cancel function");
var ENG1002_func_gen_c5b3 = new Button("Backspace",imgRect, 0.05,   0.1573,  0.1081	,"Use this button for backspace function");
var ENG1002_func_gen_c5b4 = new Button("Enter",imgRect, 0.05,   0.1573, -0.0768	,"Ues this button for enter function");

var ENG1002_func_gen_c6knob = new Button("Multipurpose Knob",imgRound, 0.19,  0.3971, 0.2357,"Use this multi purpose knob to adjust values");
var ENG1002_func_gen_c6lb1 = new Button("Left Button",imgRect, 0.05,   0.2953,  0.06865	,"Use this button to navigate to the left");
var ENG1002_func_gen_c6lb2 = new Button("Right Button",imgRect, 0.05,   0.2954,  -0.0768,"Use this button to navigate to the right");
var ENG1002_func_gen_c6rb1 = new Button("Channel On",imgRect, 0.05,   0.4473,  0.06865	,"Use this button to toggle chanel on or off display");
var ENG1002_func_gen_c6rb2 = new Button("Trigger Manual",imgRect, 0.05,   0.4473,  -0.0768	,"Use this button to toggle manual trigger function");

var ENG1002_func_gen_tutorials = new Button("Tutorials"	, imgTute	, 0.25, -0.45, -0.75, "Click this button for tutorials");
var ENG1002_func_gen_name = new Button("Name"	, imgName_FG	, 0.4, -0.45, 0.65, "Fill this with simple description on Function Generator");
var ENG1002_func_gen_circle = new Button("Circle",imgCircle, 0.52, -0.0795, 0.02825, "Draw attention to this area");

ENG1002_func_gen.addButtons(	[ENG1002_func_gen_c1b1, ENG1002_func_gen_c1b2, ENG1002_func_gen_c1b3, ENG1002_func_gen_c1b4,
								ENG1002_func_gen_c1b5, ENG1002_func_gen_c1b6, ENG1002_func_gen_c2b1, ENG1002_func_gen_c2b2,
								ENG1002_func_gen_c2b3, ENG1002_func_gen_c2b4, ENG1002_func_gen_r1b1, ENG1002_func_gen_r1b2,
								ENG1002_func_gen_r1b3, ENG1002_func_gen_r1b4, ENG1002_func_gen_r1b5, ENG1002_func_gen_r1b6,
								ENG1002_func_gen_r1b7, ENG1002_func_gen_c3b1, ENG1002_func_gen_c4b1, ENG1002_func_gen_c5b1,
								ENG1002_func_gen_c5b2, ENG1002_func_gen_c5b3, ENG1002_func_gen_c5b4 ,ENG1002_func_gen_c6knob,
								ENG1002_func_gen_c6lb1, ENG1002_func_gen_c6lb2, ENG1002_func_gen_c6rb1, ENG1002_func_gen_c6rb2,
								ENG1002_func_gen_name],	ENG1002_func_gen_tutorials);

var ENG1002_func_gen_tutorial_1 = new Tutorial('Tutorial1'); //Select sine waveform and adjust frequency parameter
ENG1002_func_gen_tutorial_1.addStep(new Step(0, [ENG1002_func_gen_r1b1], 'Power on the instrument'));
ENG1002_func_gen_tutorial_1.addStep(new Step(1, [ENG1002_func_gen_r1b2], 'Select sine waveform'));
ENG1002_func_gen_tutorial_1.addStep(new Step(2, [ENG1002_func_gen_c2b1], 'Select Continuous sine waveform'));
ENG1002_func_gen_tutorial_1.addStep(new Step(4, [ENG1002_func_gen_c6rb1], 'Push the channel on/off button to enable the output to be shown'));	
ENG1002_func_gen_tutorial_1.addStep(new Step(5, [ENG1002_func_gen_c1b3], 'Select Frequency/Period/Phase menu'));	
ENG1002_func_gen_tutorial_1.addStep(new Step(6, [ENG1002_func_gen_c1b2], 'Change Frequency parameter'));	
ENG1002_func_gen_tutorial_1.addStep(new Step(7, [ENG1002_func_gen_circle], 'Use the numeric key pads to change the frequency value'));
ENG1002_func_gen_tutorial_1.addStep(new Step(8, [ENG1002_func_gen_c6knob, ENG1002_func_gen_c6lb1, ENG1002_func_gen_c6lb2], 'You can also use the Multipurpose knob and the arrow keys to change the value'));

var ENG1002_func_gen_tutorial_2 = new Tutorial('Tutorial2'); //Save/Recall instrument setups
ENG1002_func_gen_tutorial_2.addStep(new Step(0, [ENG1002_func_gen_c5b1], 'Push the Save/Recall button to save an arbitrary waveform'));
ENG1002_func_gen_tutorial_2.addStep(new Step(1, [ENG1002_func_gen_c6knob], 'Use the knob to select a setup to write on'));	
ENG1002_func_gen_tutorial_2.addStep(new Step(2, [ENG1002_func_gen_c1b2], 'Push the Setup save button to save the setup to internal memory'));	
ENG1002_func_gen_tutorial_2.addStep(new Step(3, [ENG1002_func_gen_c1b2], 'Push the button to select Setup recall'));		

ENG1002_func_gen.addTutorial(ENG1002_func_gen_tutorial_1);		 
ENG1002_func_gen.addTutorial(ENG1002_func_gen_tutorial_2);

//=======================================================End of ENG1002 Function Generator===========================================================================================




// DO NOT USE DASHES IN THE KEYS OF DEVICES AS THIS WILL CONFLICT WITH CALLBACK-REGEX
var devices = 	{"ENG1002_osci": ENG1002_osci,
				 "ENG1002_PowerSup": ENG1002_PowerSup,
				 "ENG1002_func_gen": ENG1002_func_gen, 
				 "ECSE_func_gen": ECSE_func_gen,
				 "ECSE_osci": ECSE_osci
				 };

