
(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .config(config);

  /** @ngInject */
  function config($logProvider, toastrConfig, RestangularProvider, localStorageServiceProvider, apiBaseUrl) {
    localStorageServiceProvider.setPrefix('vms');
    RestangularProvider.setBaseUrl(apiBaseUrl);

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
