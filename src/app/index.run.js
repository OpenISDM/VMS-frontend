(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, vmsLocalStorage, $rootScope, $state, $stateParams, auth, authPrinciple, $urlRouter, editableOptions) {
    editableOptions.theme = 'bs3';

    // Listen state check start event
    var stateChangeForAuthorizationCallback = $rootScope.$on('$stateChangeStart', function(event, toState, toStateParams) {
      $log.debug("=== $stateChangeStart ===");

      $rootScope.toState = toState;

      if (toState.data.needAuth) {
        var successCallback = function() {
          $log.debug('pass...');
          $state.go(toState, toStateParams);
        };
        var failureCallback = function() {
          event.preventDefault();
          $state.go('login');
        };

        auth.authorize().then(successCallback, failureCallback);
      }
    })

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

    $log.debug('runBlock end');
  }

})();
