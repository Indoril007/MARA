
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 
// var GLOBAL_DEBUG_FLAG = true;

// function debug() {
	// console.log("===============")
	// console.log(Function.caller);
	// console.log(arguments);
// }

var menu = {
	activeMenu: "#libraries",
	activeMenuItems: [],
	
	activateMenu: function(menuID) {
		this.activeMenu = menuID;
		$('.menu').hide();
		$(menuID).show();
	},
	
	addMenuItem: function(menuID, id, content, customAttributes) {
		
		var chevronHtml = "<span class=\"glyphicon glyphicon-chevron-right\" aria-hidden=\"true\"></span>";
		var customAttributesHtml = "";
		if (customAttributes) {
			for (var key in customAttributes) {
				if (customAttributes.hasOwnProperty(key)) {
					customAttributesHtml += "data-" + key + "=\"" + customAttributes[key] + "\" ";
				}
			}
		}
		
		var menuHtml = "<div id=\"" + id + "\" class=\"menu-item\" " + customAttributesHtml +">" + chevronHtml + "<span class=\"menu-text\">" + content + "</span></div>";
		console.log(menuHtml);
		$(menuID + ' .menu-items').append(menuHtml);
	},
	
	clearMenu: function(menuID) {
		$(menuID + ' .menu-items').empty();
	},
	
	initialize: function() {
		this.activateMenu(this.activeMenu);
	}
}; 

var customLib = {
	state: 0,
	onLoadPage: function(){
		document.getElementById("myModal").style.display = "block";

		document.getElementById("inputCode").value="";
		document.getElementById("fdback").innerHTML = "";

		customLib.state = 1;

		$( "#btnCancel" ).bind( "click", function(event, ui) {
			document.getElementById("myModal").style.display = "none"
		});

		$( "#btnGo" ).bind(" click", function(event, ui) {
			customLib.onHandleUrl();
		});

	},

	onHandleUrl: function() {
	dataUrl = document.getElementById("inputCode").value;
	
	if (!dataUrl.length) {
		document.getElementById("fdback").innerHTML = "Data code is empty"; 
	}
	else {
		document.getElementById("fdback").innerHTML = "Loading..."; 
		if(app.ARstate==0){
				app.loadARchitectWorld("http://ec2-52-62-175-192.ap-southeast-2.compute.amazonaws.com:3001/collection/"+dataUrl); 
			
		}else if(app.ARstate==1){
				app.wikitudePlugin.callJavaScript('World.init("http://ec2-52-62-175-192.ap-southeast-2.compute.amazonaws.com:3001/collection/'+dataUrl+'")');
		}
		
	}
	},

	onHandleName: function(){
		var defaultName = "&lt Empty &gt";
		if(!localStorage.entry1){//if first time start init names
			for(var i=1;i<6;i++){
			localStorage.setItem("entry"+i,defaultName);
			}
		}

		for (var i=1; i< 6; i++ ){
			document.getElementById("entry"+i).innerHTML = localStorage.getItem("entry"+i);
		}
		
	},

	onUpdateName: function(){
		
		for(var i=5;i>1;i--){
			var temp = i-1;
			localStorage.setItem("entry"+i,localStorage.getItem("entry"+temp));
			document.getElementById("entry"+i).innerHTML = localStorage.getItem("entry"+i);		
		}
		localStorage.setItem("entry1",localStorage.getItem("tempName"));
		document.getElementById("entry1").innerHTML = localStorage.getItem("entry1");
	}

};


var callbackHandler = function(url) {
	// Matching callback url against the format 'architectsdk://[any_characters_here]-[any_characters_here]'
	var regex = /(architectsdk:\/\/)(.+)-(.+)/g;
	var match = regex.exec(url);
	
	// If callback url has the format 'architectsdk://tutorials-[device_name]'
	if (match[2] === "tutorials")	{
		
		menu.clearMenu("#tutorials");
		
		// Matching device name
		var device_key = match[3];
		var device = app.devices[device_key]; // getting device with device key
		var tutorials = device.tutorials; // Getting tutorials from device
		
		// Generating menu items for each tutorial
		for (var tutorial_key in tutorials) {
			if (tutorials.hasOwnProperty(tutorial_key)) {
				var tutorial = tutorials[tutorial_key];
				var id = "tutorial-" + device_key  + "-" + tutorial_key;
				menu.addMenuItem('#tutorials', id, tutorial.name, {"device": device_key, "tutorial": tutorial_key});
			}
		}
		
		// Hiding libraries, Showing Tutorials
		menu.activateMenu("#tutorials");
		
		// $( "#backToLibraries" ).bind( "click", function(event, ui) {
			// menu.activateMenu("#libraries");
			// app.wikitudePlugin.close();
		// });
		
		$( "#backToDevices" ).bind( "click", function(event, ui) {
			app.wikitudePlugin.callJavaScript('World.enableTrackedDevices()');
			app.wikitudePlugin.show();
		});
		
		// Binding click functions to menu items
		$('#tutorials .menu-item').bind("click", function(event, ui) {
			console.log("CLICK REGISTERED=====================================================");
			
			var device_key = $(this).attr('data-device');
			var tutorial_key = $(this).attr('data-tutorial');
			console.log(device_key)
			console.log(tutorial_key)
			app.loadTutorial(device_key, tutorial_key);
		});
		
		// Hiding the architect world
		app.wikitudePlugin.hide();
		
	} else if (match[2] === "menu") {
		
		if (match[3] === "tutorials") {
			menu.activateMenu("#tutorials");
			app.wikitudePlugin.hide();
		} else if (match[3] === "devices") {
			document.getElementById("myModal").style.display="none";
			menu.activateMenu("#libraries");
			app.wikitudePlugin.hide();
		}
		
	} else if(match[2]==="world"){
		if(match[3]==="success"){
			localStorage.setItem("tempName",dataUrl);
			customLib.onUpdateName();
			app.wikitudePlugin.show();
			document.getElementById("myModal").style.display = "none"

		} else if(match[3]==="failed"){
			document.getElementById("fdback").innerHTML = "Invalid file requested."
		}

	} else if (match[2] === "help") {

		menu.activateMenu("#one");
		setTimeout(function(){app.wikitudePlugin.hide();},300);

		$( ".close" ).bind( "click", function(event, ui) {
			app.wikitudePlugin.show();
		});

		$(function() {      
			$("#one").swipe( {
				swipeStatus:function(event, phase, direction, distance, duration)
				{
					if (direction=="left")
						menu.activateMenu("#two");
				},
				allowPageScroll:"auto",
				threshold: 200,
			});
		});

		$(function() {      
			$("#two").swipe( {
				swipeStatus:function(event, phase, direction, distance, duration)
				{
					if (direction=="left")
						menu.activateMenu("#three");
					if (direction=="right")
						menu.activateMenu("#one");
				},
				allowPageScroll:"auto",
				threshold: 200,
			});
		});

		$(function() {      
			$("#three").swipe( {
				swipeStatus:function(event, phase, direction, distance, duration)
				{
					if (direction=="left")
						menu.activateMenu("#four");
					if (direction=="right")
						menu.activateMenu("#two");
				},
				allowPageScroll:"auto",
				threshold: 200,
			});
		});

		$(function() {      
			$("#four").swipe( {
				swipeStatus:function(event, phase, direction, distance, duration)
				{
					if (direction=="right")
						menu.activateMenu("#three");
				},
				allowPageScroll:"auto",
				threshold: 200,
			});
		});		   
	} 

};

var app = {
	ARstate: 0,
	devices: null,
	devicesJSONurl: null,
    requiredFeatures : ["2d_tracking"],
    arUrl: null,
    startupConfiguration:
    {
        "camera_position": "back"
    },

    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
	
    bindEvents: function() {

        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener('backbutton', this.onBackKeyPressed, false); //back button event when not launched in wikitude
    },

    onDeviceReady: function(){
		
        app.wikitudePlugin = cordova.require("com.wikitude.phonegap.WikitudePlugin.WikitudePlugin");
			
		WikitudePlugin.onBackButton = this.onBackKeyDown; //doesnt do anything
	

        // app.wikitudePlugin.isDeviceSupported(app.onDeviceSupported, app.onDeviceNotSupported, app.requiredFeatures);
		console.log("================================================================================DEVICE READY");
    },

    onDeviceSupported: function(){//what happens when supported

        app.wikitudePlugin.setOnUrlInvokeCallback(app.onURLInvoked);

        app.wikitudePlugin.loadARchitectWorld(
            app.onARExperienceLoadedSuccessful,
            app.onARExperienceLoadError,
            app.arUrl,
            app.requiredFeatures,
            app.startupConfiguration
            );
    },

    onDeviceNotSupported: function(errorMessage){

        //what happens when not supported
        alert(errorMessage);
    },

    onARExperienceLoadedSuccessful: function(loadedURL){

        //do something
        //app.wikitudePlugin.callJavaScript('createCircle(new AR.RelativeLocation(null, -10, 0), \'#97FF18\');');
		
		app.wikitudePlugin.callJavaScript('World.init("' + app.devicesJSONurl + '")');
		app.ARstate=1;
		
    },

    onARExperienceLoadError: function(errorMessage){

        //react on failure
        alert('Loading AR web view failed: ' + errorMessage);
    },

	onURLInvoked: callbackHandler,


	loadARchitectWorld: function(devicesJSONurl) {
		
		this.arUrl = "www/AR_Libraries/Library1/index.html";
		this.devicesJSONurl = devicesJSONurl;
		
		$.get(devicesJSONurl)
		 .done(function(data) {
			console.log("Libraries Menu: get request for devices succeeded");
			app.wikitudePlugin.isDeviceSupported(app.onDeviceSupported, app.onDeviceNotSupported, app.requiredFeatures);		
			// app.devices = Device.parseJSONobjects(data);
		 })
		 .fail(function( jqxhr, textStatus, error ) {
			var err = textStatus + ", " + error;
			document.getElementById("fdback").innerHTML = "Invalid file requested."; 
			console.log( "Request Failed: " + err );
			console.log(devicesJSONurl);
		});
		
		//once wikitude launched, back button brings user back to library page
		if ( cordova.platformId == "android" ) {
                app.wikitudePlugin.setBackButtonCallback(app.onBackButton);
        }
    },
	
	loadTutorial: function(device_key, tutorial_key) {

		app.wikitudePlugin.callJavaScript('World.loadTutorial("' + device_key + '","' + tutorial_key + '")');
		app.wikitudePlugin.show();
	},
	
	onBackKeyDown: function() {
		console.log("Test");
	},

	onBackButton: function() { //for android
		//alert("test back button");
		document.getElementById("myModal").style.display = "none"
		menu.activateMenu("#libraries");
		app.wikitudePlugin.hide();
	},

	onBackKeyPressed: function() { // for android
		if (customLib.state===1){
			document.getElementById("myModal").style.display = "none"
			menu.activateMenu("#libraries");
			customLib.state = 0;
		}
		else{
			navigator.app.exitApp();
		}
	}

};

customLib.onHandleName();
menu.initialize(); // menu unactivated when not using intial libraries menu
app.initialize();