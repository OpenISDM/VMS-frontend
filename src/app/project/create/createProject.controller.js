(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .controller('CreateProjectController', CreateProjectController);

  /** @ngInject */
  function CreateProjectController(
    $log,
    $state,
    $translate,
    project,
    projectHyperlink,
    PERMISSION_OPTIONS,
    FROALA_OPTIONS
  ) {
    var vm = this;
    vm.permissionOptions = PERMISSION_OPTIONS;
    vm.froalaOptions = FROALA_OPTIONS;
    vm.hyperlinks = [
      {
        name: '',
        link: ''
      }
    ];

    vm.create = function() {
      vm.alert = [];

      project
        .create(vm.project)
        .then(function(value) {
          $log.debug(value);

          var projectId = value.id;

          storeHyperlinks(projectId);
        })
        .catch(function(alert) {
          vm.alert.push(alert);
        });
    };

    function storeHyperlinks(projectId) {
      projectHyperlink
        .create(projectId, vm.hyperlinks)
        .then(function() {
          $log.debug("storeHyperlinks() success");
          $log.debug("projectId = " + projectId);

          $state.go('projectDetail', {
            id: projectId
          });
        })
        .catch(function() {
          $log.debug("storeHyperlinks() failure");
        })
    }
  }
})();
