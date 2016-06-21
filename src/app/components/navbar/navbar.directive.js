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
    function NavbarController(userAuthentication, vmsLocalStorage, $state, toastr) {
      var vm = this;
      vm.userAuthentication = userAuthentication;

      vm.logout = function() {
        userAuthentication.logout();
        $state.go('login');
      };

      vm.isManagerRole = function() {
        return userAuthentication.getRole() == 'manager';
      };

      vm.isVolunteerRole = function() {
        return userAuthentication.getRole() == 'volunteer';
      };

      vm.switchToVolunteer = function() {
        userAuthentication.switchRole('volunteer');
        toastr.clear();
        toastr.success('現在身份為志工', {
          closeButton: true
        });
        $state.go('showAllProjects');
      };

      vm.switchToManager = function() {
        userAuthentication.switchRole('manager');
        toastr.clear();
        toastr.success('現在身份為專案管理員', {
          closeButton: true
        });
        $state.go('managedProjectList');
      }
    }
  }

})();
