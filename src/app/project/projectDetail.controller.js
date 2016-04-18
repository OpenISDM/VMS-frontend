(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .controller('ProjectDetailController', ProjectDetailController);

  /** @ngInject */
  function ProjectDetailController($log, $stateParams, vmsClient, PERMISSION_OPTIONS) {
    var vm = this;
    vm.permissionOptions = PERMISSION_OPTIONS;

    var projectId = $stateParams.id;

    angular.element(document).ready(getProject(projectId));

    vm.isGuest = function() {
      if (angular.isDefined(vm.project)) {
        return vm.project.meta.role.name == 'guest';
      }

      return false;
    };

    vm.isCreator = function() {
      if (angular.isDefined(vm.project)) {
        return vm.project.meta.role.name == 'creator';
      }

      return false;
    };

    function getProject(id) {
      var onSuccess = function(response) {
        vm.project = response.data;
        console.log(response.data);
      };
      var onFailure = function(response) {
        console.log(response);
      };

      vmsClient.getProject(id).then(onSuccess).catch(onFailure);
    }
  }
})();
