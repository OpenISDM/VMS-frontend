
(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .config(config);

  /** @ngInject */
  function config(
    $logProvider,
    toastrConfig,
    localStorageServiceProvider,
    $httpProvider,
    $translateProvider) {
    // Set local storage prefix name
    localStorageServiceProvider.setPrefix('vms');

    // Interceptors
    var interceptors = [
      'apiKeyInjector',
      'jwtInjector',
      'refreshJwtInterceptor'
    ];

    // Add $http interceptors
    for (var i = 0; i < interceptors.length; i++) {
      $httpProvider.interceptors.push(interceptors[i]);
    }

    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = true;

    // translation
    $translateProvider
      .useStaticFilesLoader({
        'prefix': 'assets/lang/locale-',
        'suffix': '.json'
      });

    if (angular.isDefined(window.navigator.language)) {
      $translateProvider
        .preferredLanguage(window.navigator.language);
    }
  }

})();
