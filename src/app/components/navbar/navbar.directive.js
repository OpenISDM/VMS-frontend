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
    function NavbarController(auth, vmsClient, vmsLocalStorage, $state, toastr) {
      var vm = this;
      vm.auth = auth;

      vm.logout = function() {
        auth.logout();
        $state.go('login');
      };

      vm.isManagerRole = function() {
        return auth.getRole() == 'manager';
      };

      vm.isVolunteerRole = function() {
        return auth.getRole() == 'volunteer';
      };

      vm.switchToVolunteer = function() {
        vmsLocalStorage.setRole('volunteer');
        toastr.clear();
        toastr.success('現在身份為志工', {
          closeButton: true
        });
        $state.go('showAllProjects');
      };

      vm.switchToManager = function() {
        vmsLocalStorage.setRole('manager');
        toastr.clear();
        toastr.success('現在身份為專案管理員', {
          closeButton: true
        });
        $state.go('managedProjectList');
      }
    }
  }

})();
