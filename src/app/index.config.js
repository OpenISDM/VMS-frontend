(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .config(config);

  /** @ngInject */
  function config($logProvider, toastrConfig, RestangularProvider, localStorageServiceProvider, apiBaseUrl) {
    localStorageServiceProvider.setPrefix('vms');
    RestangularProvider.setBaseUrl(apiBaseUrl);
    //RestangularProvider.setDefaultHeaders( {'X-VMS-API-Key': '581dba93a4dbafa42a682d36b015d8484622f8e3543623bec5a291f67f5ddff1'} );

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
