(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .controller('EditProjectController', EditProjectController);

  /** @ngInject */
  function EditProjectController(
    $log,
    project,
    projectData,
    projectHyperlink,
    lodash,
    PERMISSION_OPTIONS,
    FROALA_OPTIONS) {
    var vm = this;
    vm.project = projectData.data;
    vm.hyperlinks;
    vm.permissionOptions = PERMISSION_OPTIONS;
    vm.froalaOptions = FROALA_OPTIONS;

    vm.update = function() {
      var onSuccess = function(response) {
        $log.debug('project update successfully');
        $log.debug(response.data);
      };
      var onFailure = function(response) {
        $log.error('project update failure');
        $log.error(response);
      };

      project
        .update(vm.project)
        .then(onSuccess)
        .catch(onFailure);

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

      projectHyperlink.createOrUpdate(
        vm.project.id,
        newHyperlinks,
        updateHyperlinks);
    }
  }
})();
