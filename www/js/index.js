var GLOBAL_DEBUG_FLAG = true;

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

var menu = {
	activeMenu: "#libraries",
	activeMenuItems: [],
	
	activateMenu: function(menuID) {
		this.activeMenu = menuID;
		$('.menu').hide();
		$(menuID).show();
	},
	
	addMenuItem: function() {
		
	},
	
	clearMenu: function(menuID) {
		$(menuID).empty();
	},
	
} 
 
var app = {

    requiredFeatures : ["2d_tracking", "geo"],
    arUrl: null,
    startupConfiguration:
    {
        "camera_position": "back"
    },

    // Application Constructor
    initialize: function() {
		if (GLOBAL_DEBUG_FLAG === true) {
			console.log("===============================")
			console.log("app")
			console.log("intialize");
			console.log("===============================")
		} 
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
		if (GLOBAL_DEBUG_FLAG === true) {
			console.log("============app============");
			console.log("bindEvents");
		} 
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    onDeviceReady: function(){
		if (GLOBAL_DEBUG_FLAG === true) {
			console.log("============app============");
			console.log("onDeviceReady");
		} 
        app.wikitudePlugin = cordova.require("com.wikitude.phonegap.WikitudePlugin.WikitudePlugin");
        // app.wikitudePlugin.isDeviceSupported(app.onDeviceSupported, app.onDeviceNotSupported, app.requiredFeatures);
		console.log("================================================================================DEVICE READY");
    },

    onDeviceSupported: function(){//what happens when supported
		if (GLOBAL_DEBUG_FLAG === true) {
			console.log("============app============");
			console.log("onDeviceSupported");
		} 
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
		if (GLOBAL_DEBUG_FLAG === true) {
			console.log("============app============");
			console.log("onDeviceNotSupported");
			console.log("errorMessage: " + errorMessage);
		} 
        //what happens when not supported
        alert(errorMessage);
    },

    onARExperienceLoadedSuccessful: function(loadedURL){
		if (GLOBAL_DEBUG_FLAG === true) {
			console.log("============app============");
			console.log("onARExperienceLoadedSuccessful");
			console.log("loadedURL: " + loadedURL);
		} 
        //do something
        //app.wikitudePlugin.callJavaScript('createCircle(new AR.RelativeLocation(null, -10, 0), \'#97FF18\');');
    },

    onARExperienceLoadError: function(errorMessage){
		if (GLOBAL_DEBUG_FLAG === true) {
			console.log("============app============");
			console.log("app");
			console.log("onARExperienceLoadError");
			console.log("errorMessage: " + errorMessage);
		} 
        //react on failure
        alert('Loading AR web view failed: ' + errorMessage);
    },

	onURLInvoked: function(url) {
		if (GLOBAL_DEBUG_FLAG === true) {
			console.log("============app============");
			console.log("onURLInvoked");
			console.log("url: " + url);
		} 
		
		// Matching callback url against the format 'architectsdk://[any_characters_here]-[any_characters_here]'
		var regex = /(architectsdk:\/\/)(.+)-(.+)/g;
		var match = regex.exec(url);
		
		// If callback url has the format 'architectsdk://hide-[device_name]'
		if (match[2] === "hide")	{
			
			// Matching device name
			var device_key = match[3];
			var device = devices[device_key]; // getting device with device key
			var tutorials = device.tutorials; // Getting tutorials from device
			
			console.log(device_key);
			console.log(device.name);
			
			// Generating menu items for each tutorial
			for (var tutorial_key in tutorials) {
				if (tutorials.hasOwnProperty(tutorial_key)) {
					var tutorial = tutorials[tutorial_key];
					var chevronHtml = "<span class=\"glyphicon glyphicon-chevron-right\" aria-hidden=\"true\"></span>";
					var menuHtml = "<div id=\"tutorial-" + device_key + "-" + tutorial_key + "\" data-device=\"" + device_key + "\" data-tutorial=\"" + 
									tutorial_key + "\" class=\"menu-item\">" + chevronHtml + "<span>" + tutorial.name + "</span></div>";
					console.log(menuHtml);				
					$('#tutorials .menu-items').append(menuHtml);
				}
			}
			
			// Hiding libraries, Showing Tutorials
			$('#libraries').hide();
			$('#tutorials').show();
			
			// Binding click functions to menu items
			$('#tutorials .menu-item').bind("click", function(event, ui) {
				console.log("CLICK REGISTERED=====================================================");
				var device_key = $(this).attr('data-device');
				var tutorial_key = $(this).attr('data-tutorial');
				
				app.loadTutorial(device_key, tutorial_key);
			});
			
			// Hiding the architect world
			app.wikitudePlugin.hide();
		}
		
	},
	
	loadARchitectWorld: function() {
		this.arUrl = "www/AR_Libraries/Library1/index.html";
		
		if (GLOBAL_DEBUG_FLAG === true) {
			console.log("============app============");
			console.log("loadARchitectWorld");
			console.log("this.arUrl: " + this.arUrl);
		} 
		
		// this.arUrl = "www/experience/index.html";
		app.wikitudePlugin.isDeviceSupported(app.onDeviceSupported, app.onDeviceNotSupported, app.requiredFeatures);

    },
	
	loadTutorial: function(device_key, tutorial_key) {
		if (GLOBAL_DEBUG_FLAG === true) {
			console.log("============app============");
			console.log("loadTutorial");
			console.log("device_key: " + device_key);
			console.log("tutorial_key: " + tutorial_key);
		} 
		
		app.wikitudePlugin.callJavaScript('World.loadTutorial("' + device_key + '","' + tutorial_key + '")');
		app.wikitudePlugin.show();
	},
};

app.initialize();