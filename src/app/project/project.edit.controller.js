(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .controller('MyEditProjectController', MyEditProjectController);

  /** @ngInject */
  function MyEditProjectController($log, vmsClient, project, projectService, lodash, PERMISSION_OPTIONS) {
    var vm = this;
    vm.project = project;
    vm.hyperlinks;
    vm.permissionOptions = PERMISSION_OPTIONS;


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
      createOrUpdateHyperlinks();
    };

    function createOrUpdateHyperlinks() {
      var newHyperlinks = lodash.filter(vm.hyperlinks, function(item) {
        return !angular.isDefined(item.id);
      });

      var updateHyperlinks = lodash.filter(vm.hyperlinks, function(item) {
        return angular.isDefined(item.id);
      });

      $log.debug("newHyperlinks");
      $log.debug(newHyperlinks);

      $log.debug("updateHyperlinks");
      $log.debug(updateHyperlinks);

      projectService.createOrUpdateHyperlinks(
        vm.project.data.id,
        newHyperlinks,
        updateHyperlinks);
    }
  }
})();
