(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, vmsLocalStorage, $rootScope, $state, $stateParams, auth, authPrinciple, $urlRouter) {

    // Listen state check start event
    var stateChangeForAuthorizationCallback = $rootScope.$on('$stateChangeStart', function(event, toState, toStateParams) {
      $log.debug("=== $stateChangeStart ===");

      $rootScope.toState = toState;

      if (toState.data.needAuth) {
        var successCallback = function() {
          $log.debug('pass...');
          $state.go(toState.name);
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

    $rootScope.$on('$destroy', stateChangeForAuthorizationCallback);
    $rootScope.$on('$destroy', urlRouterSyncDeregisteratinoCallback);

    $log.debug('runBlock end');
  }

})();
