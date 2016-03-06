
(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .config(config);

  /** @ngInject */
  function config($logProvider, toastrConfig, localStorageServiceProvider, $httpProvider) {
    // Set local storage prefix name
    localStorageServiceProvider.setPrefix('vms');

    // Interceptors
    var interceptors = [
      'apiKeyInjector',
      'jwtInjector',
      'refreshJwtInterceptor'
    ];

    // Add $http interceptors
    // for (var i = 0; i < interceptors.length; i++) {
    //   console.log(interceptors[i]);
    //   $httpProvider.interceptors.push(interceptors[i]);
    // }

    $httpProvider.interceptors.push('apiKeyInjector');
    $httpProvider.interceptors.push('jwtInjector');


    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = true;
  }

})();
