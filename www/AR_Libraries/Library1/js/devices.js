

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
	var imgProbe = "assets/probe.jpg";
	var imgArrow = "assets/arrow.png";

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

var ECSE_func_gen_tutorials = new Button("Tutorials"	, imgTute	, 0.25, -0.45, 0.65, "Click this button for tutorials");
var ECSE_func_gen_name = new Button("Name"	, imgName_FG	, 0.4, -0.45, -0.6, "Fill this with simple description on Func Gen");

ECSE_func_gen.addButtons(	[ECSE_func_gen_c1b1, ECSE_func_gen_c1b2, ECSE_func_gen_c1b3, ECSE_func_gen_c1b4, ECSE_func_gen_c1b5,  
							 ECSE_func_gen_c2b1, ECSE_func_gen_c2b2, ECSE_func_gen_c2b3, ECSE_func_gen_c2b4, ECSE_func_gen_c2b5,
							 ECSE_func_gen_c2b6, ECSE_func_gen_round, ECSE_func_gen_name], ECSE_func_gen_tutorials);

							 
var ECSE_func_gen_tutorial_1 = new Tutorial('Tutorial1');
ECSE_func_gen_tutorial_1.addStep(new Step(0, [ECSE_func_gen_c1b4], 'description test 1'));
ECSE_func_gen_tutorial_1.addStep(new Step(1, [ECSE_func_gen_c2b3], 'description test 2'));	
ECSE_func_gen_tutorial_1.addStep(new Step(2, [ECSE_func_gen_c2b6], 'description test 3'));	
ECSE_func_gen_tutorial_1.addStep(new Step(3, [ECSE_func_gen_c1b2], 'description test 4'));

var ECSE_func_gen_tutorial_2 = new Tutorial('Tutorial2');
ECSE_func_gen_tutorial_2.addStep(new Step(0, [ECSE_func_gen_c2b5], 'description test 1'));
ECSE_func_gen_tutorial_2.addStep(new Step(1, [ECSE_func_gen_c1b4, ECSE_func_gen_c2b5], 'description test 2'));	
ECSE_func_gen_tutorial_2.addStep(new Step(2, [ECSE_func_gen_c1b2], 'description test 3'));	
ECSE_func_gen_tutorial_2.addStep(new Step(3, [ECSE_func_gen_c1b1], 'description test 4'));		

ECSE_func_gen.addTutorial(ECSE_func_gen_tutorial_1);		 
ECSE_func_gen.addTutorial(ECSE_func_gen_tutorial_2);
//====================================================End of Function Generator ECSE Lab=======================================================================================

//=======================================================Oscilloscope ENG1002==================================================================================================

var ENG1002_osci = new Device("ENG1002_OS");

var ENG1002_osci_c1b1	 = new Button("Navigation 1", imgRect, 0.06, -0.546, 0.205, "Use this button to navigate menu items");
var ENG1002_osci_c1b2	 = new Button("Navigation 2", imgRect, 0.06, -0.546, 0.0635, "Use this button to navigate menu items");
var ENG1002_osci_c1b3	 = new Button("Navigation 3", imgRect, 0.06, -0.546, -0.069, "Use this button to navigate menu items");
var ENG1002_osci_c1b4	 = new Button("Navigation 4", imgRect, 0.06, -0.546, -0.205, "Use this button to navigate menu items");
var ENG1002_osci_c1b5	 = new Button("Navigation 5", imgRect, 0.06, -0.546, -0.335, "Use this button to navigate menu items");
var ENG1002_osci_round1 		 = new Button("Menu Toggle", imgRound, 0.1, -0.532, -0.4565, "Use this button to toggle menu display");
var ENG1002_osci_mult_purpose_knob = new Button("Multi Purpose Knob", imgRound, 0.25, -0.327, 0.255, "Use this knob to navigate menu items");

var ENG1002_osci_c2b1 = new Button("Math", imgRect,0.05, -0.408, -0.025, "Use this button to toggle Math function");
var ENG1002_osci_c2b2 = new Button("FFT", imgRect,0.05, -0.408, -0.1715,"Use this button to toggle Fast Fourier Transform function");
var ENG1002_osci_c2b3 = new Button("Ref", imgRect,0.05, -0.408, -0.3248,"Use this button to toggle Reference function");

var ENG1002_osci_c3b1 = new Button("Chn1 Position", imgRound,0.125, -0.2544, -0.0555,"Use this knob to adjust Channel 1 vertical position value");
var ENG1002_osci_c3b2 = new Button("Chn1 Menu", imgRect,0.05,-0.2544, -0.1715,"Use this button to toggle Channel 1 Menu");
var ENG1002_osci_c3b3 = new Button("Chn1 Knob", imgRound,0.17,-0.2544, -0.355,"Use this knob to adjust Channel 1 vertical scale");

var ENG1002_osci_c4b1 = new Button("Cursor", imgRect,0.06, -0.0971, 0.3901,"Use this button to toggle Cursor menu");
var ENG1002_osci_c4b2 = new	Button("Search", imgRect,0.06, -0.0971, 0.2751,"Use this button to toggle Search menu");
var ENG1002_osci_c4b3 = new Button("Course", imgRect,0.06, -0.0971, 0.1518,"Use this button to toggle Course menu");

var ENG1002_osci_c5b1 = new Button("Chn2 Position", imgRound,0.125, 0.01, -0.0555,"Use this knob to adjust Channel 2 vertical position value");
var ENG1002_osci_c5b2 = new Button("Chn2 Menu", imgRect,0.05, 0.01,-0.1715,"Use this button to toggle Channel 2 Menu");
var ENG1002_osci_c5b3 = new	Button("Chn2 Knob", imgRound,0.17, 0.015, -0.355,"Use this knob to adjust Channel 2 vertical scale");

var ENG1002_osci_c6b1 = new Button("Measure", imgRect,0.06, 0.0955, 0.3901,"Use this button to toggle Measure menu");
var ENG1002_osci_c6b2 = new Button("Save", imgRect,0.06, 0.0955, 0.2751,"Use this button to toggle Save or Recall menu");
var ENG1002_osci_c6b3 = new Button("Function", imgRect,0.06, 0.0955, 0.1518,"Use this button to toggle Function menu");

var ENG1002_osci_c7b1 = new	Button("Help", imgRect,0.06, 0.2942, 0.3901,"Use this button to toggle Help menu");
var ENG1002_osci_c7b2 = new Button("Setup", imgRect,0.06, 0.2942, 0.2751,"Use this button to toggle Default Setup menu");
var ENG1002_osci_c7b3 = new Button("Utility", imgRect,0.06, 0.2942, 0.1518,"Use this button to toggle Utility menu");
var ENG1002_osci_c7b4 = new Button("Horizontal Position", imgRound,0.125, 0.2942, -0.0555,"Use this knob to adjust horizontal position value");
var ENG1002_osci_c7b5 = new Button("Horizontal Acquire", imgRect,0.06, 0.2942, -0.1715,"Use this button to toggle Acquire menu");
var ENG1002_osci_c7b6 = new	Button("Horizontal Knob", imgRound,0.17, 0.2942, -0.355,"Use this knob to adjust horizontal scale value");

var ENG1002_osci_c8b1 = new Button("RunStop", imgRect,0.06, 0.476, 0.3901,"Use this button to toggle the Run/Stop function");
var ENG1002_osci_c8b2 = new Button("Single", imgRect,0.06, 0.476, 0.2751,"Use this button to toggle Single acquisition function");
var ENG1002_osci_c8b3 = new Button("Autoset", imgRect,0.06, 0.476, 0.1518,"Use this button to Autoset the waveform scale");
var ENG1002_osci_c8b4 = new Button("Trigger Menu", imgRect,0.06, 0.476, -0.025,"Use this button to toggle the Trigger function");
var ENG1002_osci_c8b5 = new Button("Trigger Knob", imgRound,0.125, 0.463, -0.2221,"Use this knob to adjust the Trigger level");
var ENG1002_osci_c8b6 = new	Button("Force Trigger", imgRect,0.06, 0.476, -0.3248,"Use this button to toggle the Force Trigger function");

var ENG1002_osci_tutorials = new Button("Tutorials"	, imgTute	, 0.25, -0.45, -0.75, "Click this button for tutorials");
var ENG1002_osci_name = new Button("Name"	, imgName_Os	, 0.4, -0.45, 0.65, "Fill this with simple description on Oscilloscope");
var ENG1002_probe = new Button("Probe",imgProbe,1,0,0,"Probe attenuation settings");
var ENG1002_arrow = new Button("Arrow",imgArrow,0.06, -0.546, -0.205,"Point arrow to object");

ENG1002_osci.addButtons(	[ENG1002_osci_c1b1, ENG1002_osci_c1b2, ENG1002_osci_c1b3, ENG1002_osci_c1b4, 
								 ENG1002_osci_c1b5, ENG1002_osci_round1, ENG1002_osci_mult_purpose_knob, ENG1002_osci_c2b1,
								 ENG1002_osci_c2b2, ENG1002_osci_c2b3, ENG1002_osci_c3b1 ,ENG1002_osci_c3b2 ,ENG1002_osci_c3b3,
								 ENG1002_osci_c4b1, ENG1002_osci_c4b2, ENG1002_osci_c4b3, ENG1002_osci_c5b1, ENG1002_osci_c5b2, 
								 ENG1002_osci_c5b3, ENG1002_osci_c6b1, ENG1002_osci_c6b2, ENG1002_osci_c6b3, ENG1002_osci_c7b1,
								 ENG1002_osci_c7b2, ENG1002_osci_c7b3, ENG1002_osci_c7b4, ENG1002_osci_c7b5, ENG1002_osci_c7b6,
								 ENG1002_osci_c8b1, ENG1002_osci_c8b2, ENG1002_osci_c8b3, ENG1002_osci_c8b4, ENG1002_osci_c8b5,
								 ENG1002_osci_c8b6, ENG1002_osci_name], ENG1002_osci_tutorials);

var ENG1002_osci_tutorial_1 = new Tutorial('Setting probe attenuation for accurate measurement'); // Setting probe attenuation
ENG1002_osci_tutorial_1.addStep(new Step(0, [ENG1002_osci_c3b2], 'To take view the waveform measured, push the Channel 1 Menu button'));
ENG1002_osci_tutorial_1.addStep(new Step(1, [ENG1002_osci_c1b4], 'Push the Probe button'));
ENG1002_osci_tutorial_1.addStep(new Step(2, [ENG1002_osci_c1b1], 'Push the Voltage button'));
ENG1002_osci_tutorial_1.addStep(new Step(3, [ENG1002_osci_c1b3], 'Push the Attenuation button'));
ENG1002_osci_tutorial_1.addStep(new Step(4, [ENG1002_osci_mult_purpose_knob], 'Turn the knob to navigate between the choices. Set the attenuation as 10X and push the knob to select'));
ENG1002_osci_tutorial_1.addStep(new Step(5, [ENG1002_probe], 'Make sure to set the probe attenuation to 10X as well'));

var ENG1002_osci_tutorial_2 = new Tutorial('Using Autoset and displaying waveforms'); //Autoset function
ENG1002_osci_tutorial_2.addStep(new Step(0, [ENG1002_osci_c8b3],'Press Autoset to automatically set the vertical, horizontal and trigger controls to display waveform'));
ENG1002_osci_tutorial_2.addStep(new Step(1, [ENG1002_osci_c1b1,ENG1002_osci_c1b2,ENG1002_osci_c1b3],'You can choose between different Autoset modes such as single cycle, FFT, rising or falling edge, with the default being continuous cycle.'));
ENG1002_osci_tutorial_2.addStep(new Step(2, [ENG1002_osci_c3b2,ENG1002_osci_c5b2],'Press the Channel 1 or 2 button once to select the waveform. Pressing the second time will hide the waveform from being displayed.'));

var ENG1002_osci_tutorial_3 = new Tutorial('Using measure function to display values'); // Measuring waveforms
ENG1002_osci_tutorial_3.addStep(new Step(0,[ENG1002_osci_c6b1],'Push the Measure button'));
ENG1002_osci_tutorial_3.addStep(new Step(1,[ENG1002_osci_c1b2],'Push Channel 1 button on the side menu to measure its waveforms'));
ENG1002_osci_tutorial_3.addStep(new Step(2,[ENG1002_osci_mult_purpose_knob],'Turn the knob to select the desired measurement and push the knob to confirm selection'));
ENG1002_osci_tutorial_3.addStep(new Step(3,[ENG1002_osci_c1b3],'Push Channel 2 button on the side menu to measure its waveform'));
ENG1002_osci_tutorial_3.addStep(new Step(4,[ENG1002_osci_mult_purpose_knob],'Use the knob to select or unselect the measurements. You may show up to 6 measurements at a time.'));
ENG1002_osci_tutorial_3.addStep(new Step(5,[ENG1002_osci_c1b5],'Push the Menu on/off button to toggle display of the side menu on the screen'));

var ENG1002_osci_tutorial_4 = new Tutorial('Using cursors to measure waveforms'); // Using cursors
ENG1002_osci_tutorial_4.addStep(new Step(0,[ENG1002_osci_c4b1],'Push the Cursor button to use cursor measurements'));
ENG1002_osci_tutorial_4.addStep(new Step(1,[ENG1002_osci_c1b1],'Push the Type button on the side menu'));
ENG1002_osci_tutorial_4.addStep(new Step(2,[ENG1002_osci_mult_purpose_knob],'Turn and push the knob to select between measuring Amplitude or Time parameters'));
ENG1002_osci_tutorial_4.addStep(new Step(3,[ENG1002_osci_c1b2,ENG1002_osci_mult_purpose_knob],'Push the Source button and use the knob to select which channel is to be measured'));
ENG1002_osci_tutorial_4.addStep(new Step(4,[ENG1002_osci_c1b4,ENG1002_osci_mult_purpose_knob],'Push the Cursor 1 option and turn the knob to the first point of the measurement'));
ENG1002_osci_tutorial_4.addStep(new Step(5,[ENG1002_osci_c1b5,ENG1002_osci_mult_purpose_knob],'Push Cursor 2 and turn the knob to the second point of the measurement.'));
ENG1002_osci_tutorial_4.addStep(new Step(6,[ENG1002_arrow],'The measurements (delta time,frequency or amplitude) from the cursor at the 2 points will be shown in the side menu.'));

var ENG1002_osci_tutorial_5 = new Tutorial('Using Save and Reference function'); // Using Save and Ref
ENG1002_osci_tutorial_5.addStep(new Step(0,[ENG1002_osci_c6b2],'Push the Save button to save a waveform'));
ENG1002_osci_tutorial_5.addStep(new Step(1,[ENG1002_osci_c1b1,ENG1002_osci_mult_purpose_knob],'Push the Action option and use the knob to select an action. To save a waveform as a reference, choose Save Waveform'));
ENG1002_osci_tutorial_5.addStep(new Step(2,[ENG1002_osci_c1b3,ENG1002_osci_mult_purpose_knob],'Push the Source option and use the knob to select a channel source'));
ENG1002_osci_tutorial_5.addStep(new Step(3,[ENG1002_osci_c1b4,ENG1002_osci_mult_purpose_knob],'Push the To option and use the knob to select where where to save the waveform to'));
ENG1002_osci_tutorial_5.addStep(new Step(4,[ENG1002_osci_c1b5],'Push the Save option to save the waveform as a reference'));
ENG1002_osci_tutorial_5.addStep(new Step(5,[ENG1002_osci_c2b3],'Push the R button to recall waveform that were saved as reference'));
ENG1002_osci_tutorial_5.addStep(new Step(6,[ENG1002_osci_c1b1,ENG1002_osci_c1b2],'Push the Ref A or Ref B option to recall the reference. The waveform will appear in white colour.'));

var ENG1002_osci_tutorial_6 = new Tutorial('Trigger and capture single-shot signal'); //Trigger function to capture single-shot signal
ENG1002_osci_tutorial_6.addStep(new Step(0,[ENG1002_osci_c3b3,ENG1002_osci_c7b6],'Turn the Vertical Scale (Volts/division) and Horizontal Scale (seconds/division) to the ranges of the expected signal'));
ENG1002_osci_tutorial_6.addStep(new Step(1,[ENG1002_osci_c7b5,ENG1002_osci_c1b2],'Push the Acquire button and select Peak Detection'));
ENG1002_osci_tutorial_6.addStep(new Step(2,[ENG1002_osci_c8b4],'Push the Trigger Menu button'));
ENG1002_osci_tutorial_6.addStep(new Step(3,[ENG1002_osci_c1b3,ENG1002_osci_mult_purpose_knob],'Select Slope option and turn the knob to select Rising or Falling event'));
ENG1002_osci_tutorial_6.addStep(new Step(4,[ENG1002_osci_c8b5],'Turn the knob to adjust the Level of the trigger to a voltage midway between the expected signals'));
ENG1002_osci_tutorial_6.addStep(new Step(5,[ENG1002_osci_c8b2],'Push Single to start the single acquisition of the selected event'));

ENG1002_osci.addTutorial(ENG1002_osci_tutorial_1);
ENG1002_osci.addTutorial(ENG1002_osci_tutorial_2);
ENG1002_osci.addTutorial(ENG1002_osci_tutorial_3);
ENG1002_osci.addTutorial(ENG1002_osci_tutorial_4);
ENG1002_osci.addTutorial(ENG1002_osci_tutorial_5);
ENG1002_osci.addTutorial(ENG1002_osci_tutorial_6);



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

var ENG1002_PowerSup_tutorial_1 = new Tutorial('Setting voltage and current levels');
ENG1002_PowerSup_tutorial_1.addStep(new Step(0,[ENG1002_PowerSup_rect],'Flip the switch to power on the equipment'));
ENG1002_PowerSup_tutorial_1.addStep(new Step(1,[ENG1002_PowerSup_round1,ENG1002_PowerSup_round2],'Push the knobs to toggle between course or fine mode'));
ENG1002_PowerSup_tutorial_1.addStep(new Step(2,[ENG1002_PowerSup_round1],'Turn the voltage knob left to decrease and right to increase voltage level'));
ENG1002_PowerSup_tutorial_1.addStep(new Step(3,[ENG1002_PowerSup_round2],'The same can be done for current level'));

ENG1002_PowerSup.addTutorial(ENG1002_PowerSup_tutorial_1);

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
var ENG1002_func_gen_c6lb2 = new Button("Channel On",imgRect, 0.05,   0.2954,  -0.0768,"Use this button to toggle channel on or off for waveform output");
var ENG1002_func_gen_c6rb1 = new Button("Right Button",imgRect, 0.05,   0.4473,  0.06865	,"Use this button to navigate to the right");
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

var ENG1002_func_gen_tutorial_1 = new Tutorial('Generate sine signal and changing frequenct parameters'); //Select sine waveform and adjust frequency parameter
ENG1002_func_gen_tutorial_1.addStep(new Step(0, [ENG1002_func_gen_r1b1], 'Power on the instrument'));
ENG1002_func_gen_tutorial_1.addStep(new Step(1, [ENG1002_func_gen_r1b2], 'Select sine waveform'));
ENG1002_func_gen_tutorial_1.addStep(new Step(2, [ENG1002_func_gen_c2b1], 'Select Continuous sine waveform'));
ENG1002_func_gen_tutorial_1.addStep(new Step(4, [ENG1002_func_gen_c6lb2], 'Push the channel on/off button to enable the output to be shown'));	
ENG1002_func_gen_tutorial_1.addStep(new Step(5, [ENG1002_func_gen_c1b3], 'Select Frequency/Period/Phase menu'));	
ENG1002_func_gen_tutorial_1.addStep(new Step(6, [ENG1002_func_gen_c1b2], 'Change Frequency parameter'));	
ENG1002_func_gen_tutorial_1.addStep(new Step(7, [ENG1002_func_gen_circle], 'Use the numeric key pads to change the frequency value'));
ENG1002_func_gen_tutorial_1.addStep(new Step(8, [ENG1002_func_gen_c6knob, ENG1002_func_gen_c6lb1, ENG1002_func_gen_c6rb1], 'You can also use the Multipurpose knob and the arrow keys to change the value'));

var ENG1002_func_gen_tutorial_2 = new Tutorial('Changing Amplitude level of signals'); // Adjusting amplitude level
ENG1002_func_gen_tutorial_2.addStep(new Step(0, [ENG1002_func_gen_c1b4], 'Select Amplitude/Level Menu'));
ENG1002_func_gen_tutorial_2.addStep(new Step(1, [ENG1002_func_gen_c1b2], 'Push the button for Amplitude'));
ENG1002_func_gen_tutorial_2.addStep(new Step(2, [ENG1002_func_gen_circle], 'Use the numeric key pads to change the amplitude value'));
ENG1002_func_gen_tutorial_2.addStep(new Step(3, [ENG1002_func_gen_c6knob, ENG1002_func_gen_c6lb1, ENG1002_func_gen_c6rb1], 'You can also use the Multipurpose knob and the arrow keys to change the value'));
ENG1002_func_gen_tutorial_2.addStep(new Step(4, [ENG1002_func_gen_c1b3,ENG1002_func_gen_c1b4,ENG1002_func_gen_c1b5], 'You can also change the waveform Offset, High level and Low level amplitude'));

var ENG1002_func_gen_tutorial_3 = new Tutorial('Using save and recall functions'); //Save/Recall instrument setups
ENG1002_func_gen_tutorial_3.addStep(new Step(0, [ENG1002_func_gen_c5b1], 'Push the Save/Recall button to save any waveform that is already set'));
ENG1002_func_gen_tutorial_3.addStep(new Step(1, [ENG1002_func_gen_c6knob], 'Use the knob to select a setup to save or recall on'));	
ENG1002_func_gen_tutorial_3.addStep(new Step(2, [ENG1002_func_gen_c1b2], 'Push the Setup save button to toggle between Save or Recall function'));	
ENG1002_func_gen_tutorial_3.addStep(new Step(3, [ENG1002_func_gen_c1b4], 'Push the button to Save or Recall your waveform'));	
ENG1002_func_gen_tutorial_3.addStep(new Step(4, [ENG1002_func_gen_c1b5], 'You can also select the More button to delete a saved waveform'));
ENG1002_func_gen_tutorial_3.addStep(new Step(5, [ENG1002_func_gen_c1b3,ENG1002_func_gen_c1b4], 'To delete, press Erase button and OK button to confirm'));

var ENG1002_func_gen_tutorial_4 = new Tutorial('Changing load impedance of the function generator');//Changing the load impedance
ENG1002_func_gen_tutorial_4.addStep(new Step(0, [ENG1002_func_gen_c1b5], 'Push the button for the Output Menu'));
ENG1002_func_gen_tutorial_4.addStep(new Step(1, [ENG1002_func_gen_c1b2], 'Push the button that selects Load Impedance'));
ENG1002_func_gen_tutorial_4.addStep(new Step(2, [ENG1002_func_gen_c1b4], 'Push the button for High Z to change load impedance to high impedance'));
ENG1002_func_gen_tutorial_4.addStep(new Step(3, [ENG1002_func_gen_c1b3], 'Or change the load impedance manually by pushing the button that selects Load'));
ENG1002_func_gen_tutorial_4.addStep(new Step(4, [ENG1002_func_gen_circle,ENG1002_func_gen_c6knob ], 'Use the keypad or the knob to adjust the output impedance value'));
ENG1002_func_gen_tutorial_4.addStep(new Step(5, [ENG1002_func_gen_c1b1], 'When you are done, press the back button to back to the main menu'));

ENG1002_func_gen.addTutorial(ENG1002_func_gen_tutorial_1);		 
ENG1002_func_gen.addTutorial(ENG1002_func_gen_tutorial_2);
ENG1002_func_gen.addTutorial(ENG1002_func_gen_tutorial_3);
ENG1002_func_gen.addTutorial(ENG1002_func_gen_tutorial_4);

//=======================================================End of ENG1002 Function Generator===========================================================================================




// DO NOT USE DASHES IN THE KEYS OF DEVICES AS THIS WILL CONFLICT WITH CALLBACK-REGEX
var devices = 	{"ENG1002_osci": ENG1002_osci,
				 "ENG1002_PowerSup": ENG1002_PowerSup,
				 "ENG1002_func_gen": ENG1002_func_gen, 
				 "ECSE_func_gen": ECSE_func_gen,
				 };

