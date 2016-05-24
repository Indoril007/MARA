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
var app = {

    requiredFeatures : ["2d_tracking", "geo"],
    arUrl: null,
    startupConfiguration:
    {
        "camera_position": "back"
    },

    // Application Constructor
    initialize: function() {
		console.log("================================================================================INITIALISED");
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    onDeviceReady: function(){
        app.wikitudePlugin = cordova.require("com.wikitude.phonegap.WikitudePlugin.WikitudePlugin");
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
    },

    onARExperienceLoadError: function(errorMessage){
        //react on failure
        alert('Loading AR web view failed: ' + errorMessage);
    },

	onURLInvoked: function(url) {
		
		// Matching callback url against the format 'architectsdk://[any_characters_here]-[any_digits_here]'
		var regex = /(architectsdk:\/\/)(.+)-(.+)/g;
		var match = regex.exec(url);
		
		console.log('=============================' + url);
		console.log('=============================' + match[2]);
		// If callback url has the format 'architectsdk://hide-[any_digits_here]'
		if (match[2] === "hide")	{
			var device_key = match[3];
			var device = devices[device_key];
			var tutorials = device.tutorials;
			
			console.log(device_key);
			console.log(device.name);
			
			for (var tutorial_key in tutorials) {
				if (tutorials.hasOwnProperty(tutorial_key)) {
					var tutorial = tutorials[tutorial_key];
					var chevronHtml = "<span class=\"glyphicon glyphicon-chevron-right\" aria-hidden=\"true\"></span>";
					var menuHtml = "<div id=\"tutorial-" + device_key + "-" + tutorial_key + "\" data-device=\"" + device_key + "\" data-tutorial=\"" + 
									tutorial_key + "\"class=\"menu-item\">" + chevronHtml + "</span><span>" + tutorial.name + "</span></div>";
					$('#tutorials .menu').append(menuHtml);
				}
			}
			
			$('#libraries').hide();
			$('#tutorials').show();
			app.wikitudePlugin.hide();
		}
		
	},
	
	loadARchitectWorld: function() {
		
		//this.arUrl = "www/AR_Libraries/Library1/index.html";
		this.arUrl = "www/experience/index.html";
		app.wikitudePlugin.isDeviceSupported(app.onDeviceSupported, app.onDeviceNotSupported, app.requiredFeatures);

    },
	
	loadTutorial: function(device_key, tutorial_key) {
		app.wikitudePlugin.callJavaScript('World.loadTutorial("' + device_key + '","' + tutorial_key + '")')
	},
};

app.initialize();