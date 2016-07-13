(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .directive('vmsNavbar', vmsNavbar);

  /** @ngInject */
  function vmsNavbar() {
    var avatarPath;
    var lastName;
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
    function NavbarController(
      $log,
      userAuthentication,
      vmsLocalStorage,
      $state,
      toastr
    ) {
      var vm = this;
      vm.userAuthentication = userAuthentication;
      vm.logout = logout;
      vm.getRole = getRole;
      vm.isManagerRole = isManagerRole;
      vm.isVolunteerRole = isVolunteerRole;
      vm.switchToVolunteer = switchToVolunteer;
      vm.switchToManager = switchToManager;
      vm.getAvatarPath = getAvatarPath;
      vm.getLastName = getLastName;

      function logout() {
        userAuthentication.logout();
        avatarPath = undefined;
        lastName = undefined;
        $state.go('login');
      }

      function getRole() {
        return userAuthentication.getRole();
      }

      function isManagerRole() {
        return userAuthentication.getRole() == 'manager';
      }

      function isVolunteerRole() {
        return userAuthentication.getRole() == 'volunteer';
      }

      function switchToVolunteer() {
        userAuthentication.switchRole('volunteer');
        toastr.clear();
        toastr.success('現在身份為志工', {
          closeButton: true
        });
        $state.go('showAllProjects');
      }

      function switchToManager() {
        userAuthentication.switchRole('manager');
        toastr.clear();
        toastr.success('現在身份為專案管理員', {
          closeButton: true
        });
        $state.go('managedProjectList');
      }

      function getAvatarPath() {
        if (!angular.isDefined(avatarPath) || avatarPath == null) {
          avatarPath = vmsLocalStorage.getAvatarPath();
        }

        return avatarPath;
      }

      function getLastName() {
        if (!angular.isDefined(lastName) || lastName == null) {
          lastName = vmsLocalStorage.getLastName();
        }

        return lastName;
      }
    }
  }

})();
