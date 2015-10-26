(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .directive('vmsNavbar', vmsNavbar);

  /** @ngInject */
  function vmsNavbar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      scope: {
          creationDate: '='
      },
      controller: NavbarController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function NavbarController(authPrinciple, vmsClient, $state, $log) {
      var vm = this;
      vm.authPrinciple = authPrinciple;
      $log.debug("=== vm.isAuthenticated ===");
      $log.debug(vm.authPrinciple.isAuthenticated());

      vm.logout = function () {
        $log.debug("logout...");

        vmsClient.logout(function(response){
          $log.debug("logout success");

          authPrinciple.authenticate(null);

          $state.go('login');
        }, function(response) {
          $log.debug("logout failure");
          authPrinciple.authenticate(null);
          $state.go('login');
        })
      }
    }
  }

})();
