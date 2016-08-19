(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .controller('ManagedProjectListController', ManagedProjectListController);

  /** @ngInject */
  function ManagedProjectListController($log, $uibModal, vmsClient, project) {
    var vm = this;

    angular.element(document).ready(getProjects());

    function getProjects() {
      var onSuccess = function(response) {
        vm.projects = response.data;
      };
      var onFailure = function() {};

      project
        .getManagedProjectList()
        .then(function(value) {
          $log.debug(value);
          vm.projects = value.data;
        })
        .catch(function(alert) {
          vm.alert = alert;
        });
    }

    // Modal
    vm.delete = function(projectId) {
      vm.deletedProjectId = projectId;

      var modal = $uibModal.open({
        animation: true,
        templateUrl: 'deleteProject.html',
        controller: function($uibModalInstance) {
          var vm = this;

          vm.remind = '提醒您，帳號刪除後無法再還原，如果您確定要刪除帳號。';
          vm.ok = function() {
            $log.debug('=== ok ===');
          };
          vm.cancel = function() {
            $uibModalInstance.dismiss('cancel');
          };
        },
        controllerAs: 'vm'
      });
    };
  }
})();
