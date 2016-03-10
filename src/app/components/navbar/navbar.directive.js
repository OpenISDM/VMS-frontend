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
    function NavbarController(auth, vmsClient, $state, $log) {
      var vm = this;
      vm.auth = auth;

      vm.logout = function() {
        var onSuccess = function(response) {
          $log.debug("logout success");
          auth.logout();
          $state.go('login');
        };
        var onFailure = function(response) {
          $log.debug("logout failure");
          auth.logout();
          $state.go('login');
        };

        vmsClient.logout().then(onSuccess).catch(onFailure);
      };
    }
  }

})();
