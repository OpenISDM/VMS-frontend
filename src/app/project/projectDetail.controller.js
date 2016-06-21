(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .controller('ProjectDetailController', ProjectDetailController);

  /** @ngInject */
  function ProjectDetailController($log, $state, $stateParams, vmsClient, PERMISSION_OPTIONS) {
    var vm = this;
    vm.permissionOptions = PERMISSION_OPTIONS;

    vm.projectId = $stateParams.id;

    angular.element(document).ready(getProject(vm.projectId));
    angular.element(document).ready(getProjectMembers(vm.projectId));

    vm.isGuest = function() {
      if (angular.isDefined(vm.project)) {
        return vm.project.meta.role.name == 'guest';
      }

      return false;
    };

    vm.isCreator = function() {
      $log.debug('isCreator()');
      if (angular.isDefined(vm.project)) {
        return vm.project.meta.role.name == 'creator';
      }

      return false;
    };

    vm.isMember = function() {
      if (angular.isDefined(vm.project)) {
        return vm.project.meta.role.name == 'member';
      }

      return false;
    }

    vm.attend = function() {
      var onSuccess = function(response) {
        $log.debug('attendProject() success');
        $state.reload();
      };
      var onFailure = function(response) {
        $log.debug('attendProject() failure');
      }

      vmsClient.attendProject(vm.projectId)
        .then(onSuccess)
        .catch(onFailure);
    }

    function getProject(id) {
      var onSuccess = function(response) {
        vm.project = response.data;
        $log.debug(response.data);
      };
      var onFailure = function(response) {
        $log.debug(response);
      };

      vmsClient.getProject(id).then(onSuccess).catch(onFailure);
    }

    function getProjectMembers(id) {
      var onSuccess = function(response) {
        vm.membersList = response.data;
        $log.debug(response.data);
      };
      var onFailure = function(response) {
        $log.debug(response);
      };

      vmsClient.getProjectMembers(id)
        .then(onSuccess)
        .catch(onFailure);
    }
  }
})();
