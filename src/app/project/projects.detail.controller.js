(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .controller('MyProjectDetailController', MyProjectDetailController);

  /** @ngInject */
  function MyProjectDetailController($log, vmsClient, project, members, PERMISSION_OPTIONS, $sce) {
    var vm = this;
    vm.permissionOptions = PERMISSION_OPTIONS;
    vm.project = project;
    vm.membersList = members;

    vm.attend = function() {
      var onSuccess = function(response) {
        $log.debug('attendProject() success');
      };
      var onFailure = function(response) {
        $log.debug('attendProject() failure');
      }

      vmsClient.attendProject(projectId)
        .then(onSuccess)
        .catch(onFailure);
    };

    vm.trustAsHtml = function(html) {
      return $sce.trustAsHtml(html);
    }
  }
})();
