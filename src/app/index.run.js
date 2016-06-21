(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, vmsLocalStorage, $rootScope, $state, $stateParams, $urlRouter, editableOptions) {
    editableOptions.theme = 'bs3';

    // Listen state check start event
    var stateChangeForAuthorizationCallback = $rootScope.$on('$stateChangeStart', function(event, toState, toStateParams) {
      $log.debug("=== $stateChangeStart ===");
      $log.debug("###### state debug ######");
      $log.debug(toState);
      $log.debug(toStateParams);
      $log.debug("##########");

      $rootScope.toState = toState;
    });

    var stateChangeLoggingError = $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
      $log.debug("stateChangeLoggingError");
      $log.debug(error);
    });

    var urlRouterSyncDeregisteratinoCallback = $rootScope.$on('$locationChange', function(event) {
      event.preventDefault();
      $urlRouter.sync();
    });

    var scrollToTopPageCallback = $rootScope.$on('$stateChangeSuccess', function() {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    });




    $rootScope.$on('$destroy', stateChangeForAuthorizationCallback);
    $rootScope.$on('$destroy', urlRouterSyncDeregisteratinoCallback);
    $rootScope.$on('$destroy', scrollToTopPageCallback);
    $rootScope.$on('$destroy', stateChangeLoggingError);

    $log.debug('runBlock end');
  }

})();
