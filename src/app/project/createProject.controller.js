(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .controller('CreateProjectController', CreateProjectController);

  /** @ngInject */
  function CreateProjectController($log, $state, vmsClient, projectService, PERMISSION_OPTIONS) {
    var vm = this;
    vm.permissionOptions = PERMISSION_OPTIONS;
    vm.hyperlinks = [
      {
        name: '',
        link: ''
      }
    ];

    vm.create = function() {
      var value = {
        data: {
          type: 'projects',
          attributes: vm.project
        }
      };
      var onSuccess = function(response) {
        $log.debug('project create successfully');
        $log.debug(response);

        $log.debug('= projectId =');
        $log.debug(response.data.id);

        storeHyperlinks(response.data.id);
      };
      var onFailure = function(response) {
        $log.error('project create failure');
        $log.error(response);
      };

      vmsClient.addProject(value).then(onSuccess).catch(onFailure);
    };

    function storeHyperlinks(projectId) {
      projectService.storeHyperlinks(projectId, vm.hyperlinks)
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
