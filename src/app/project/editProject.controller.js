(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .controller('EditProjectController', EditProjectController);

  /** @ngInject */
  function EditProjectController($log, $stateParams, vmsClient, PERMISSION_OPTIONS) {
    var vm = this;
    vm.permissionOptions = PERMISSION_OPTIONS;

    vm.projectId = $stateParams.id;

    angular.element(document).ready(getProject(vm.projectId));

    vm.update = function() {
      var onSuccess = function(response) {
        $log.debug('project update successfully');
        $log.debug(response.data);
      };
      var onFailure = function(response) {
        $log.error('project update failure');
        $log.error(response);
      };

      vmsClient.updateProject(vm.project).then(onSuccess).catch(onFailure);
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
