(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .controller('EditProjectController', EditProjectController);

  /** @ngInject */
  function EditProjectController(
    $log,
    $stateParams,
    vmsClient,
    project,
    PERMISSION_OPTIONS,
    FROALA_OPTIONS) {
    var vm = this;
    vm.permissionOptions = PERMISSION_OPTIONS;
    vm.froalaOptions = FROALA_OPTIONS;
    vm.projectId = $stateParams.id;
    vm.project = project;

    $log.debug('=== project ===');
    $log.debug(project);
    $log.debug("=== vm.froalaOptions ===");
    $log.debug(vm.froalaOptions);

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
  }
})();
