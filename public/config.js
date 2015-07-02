'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
	// Init module configuration options
	var applicationModuleName = 'fileuploaddemo';
	var applicationModuleVendorDependencies = ['ngResource', 'ui.router', 'ui.utils', 'ngCookies', 'ngAnimate', 'ngTouch', 'ngSanitize', 'ui.bootstrap', 'ui.bootstrap.tpls', 'ngFileUpload'];

	// Add a new vertical module
	var registerModule = function(moduleName, dependencies) {
		// Create angular module
		angular.module(moduleName, dependencies || []);

		// Add the module to the AngularJS configuration file
		angular.module(applicationModuleName).requires.push(moduleName);
	};

	return {
		applicationModuleName: applicationModuleName,
		applicationModuleVendorDependencies: applicationModuleVendorDependencies,
		registerModule: registerModule
	};
})();
