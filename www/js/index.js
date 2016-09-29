
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
	},
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
			menu.activateMenu("#libraries");
			app.wikitudePlugin.close();
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
    },

    onDeviceReady: function(){
		
        app.wikitudePlugin = cordova.require("com.wikitude.phonegap.WikitudePlugin.WikitudePlugin");
		
		WikitudePlugin.onBackButton = this.onBackKeyDown;
		
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
		
    },

    onARExperienceLoadError: function(errorMessage){

        //react on failure
        alert('Loading AR web view failed: ' + errorMessage);
    },

	onURLInvoked: callbackHandler,
	
	loadARchitectWorld: function(devicesJSONurl) {
		
		this.arUrl = "www/AR_Libraries/Library1/index.html";
		this.devicesJSONurl = devicesJSONurl;
		
		$.getJSON(devicesJSONurl)
		 .done(function(data) {
			console.log("Libraries Menu: get request for devices succeeded");
			app.devices = Device.parseJSONobjects(data);
		 })
		 .fail(function( jqxhr, textStatus, error ) {
			var err = textStatus + ", " + error;
			console.log( "Request Failed: " + err );
		});
		
		app.wikitudePlugin.isDeviceSupported(app.onDeviceSupported, app.onDeviceNotSupported, app.requiredFeatures);

    },
	
	loadTutorial: function(device_key, tutorial_key) {

		app.wikitudePlugin.callJavaScript('World.loadTutorial("' + device_key + '","' + tutorial_key + '")');
		app.wikitudePlugin.show();
	},
	
	onBackKeyDown: function() {
		console.log("Test");
		}
};

menu.initialize(); // menu unactivated when not using intial libraries menu
app.initialize();