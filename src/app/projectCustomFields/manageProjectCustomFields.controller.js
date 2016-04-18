(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .controller('ManageProjectCustomFieldsController', ManageProjectCustomFieldsController);

  /** @ngInject */
  function ManageProjectCustomFieldsController($log, $stateParams, vmsClient) {
    var vm = this;
    vm.projectCustomFields = {
      data: []
    };

    $log.debug("==== $stateParams ===");
    $log.debug($stateParams);

    angular.element(document).ready(getProjectCustomFields);

    function getProjectCustomFields() {
      var projectId = $stateParams.projectId;
      var onSuccess = function(response) {
        vm.projectCustomFields = response.data;

        $log.debug('=== getProjectCustomFields ===');
        $log.debug(vm.projectCustomFields);
      };
      var onFailure = function(response) {
        $log.error('getProjectCustomFields() error');
      }

      vmsClient.getProjectCustomFields(projectId)
        .then(onSuccess)
        .catch(onFailure);
    }

    vm.isProjectCustomFieldEmpty = function() {
      if (angular.isDefined(vm.projectCustomFields)) {
        return vm.projectCustomFields.data <= 0;
      }

      return true;
    };

    vm.appendCustomField = function() {
      vm.projectCustomFields.data.push({
        attributes: {
          order: vm.projectCustomFields.data.length
        }
      });

      $log.debug('=== appendCustomField ===');
      $log.debug(vm.projectCustomFields.data);
    };
  }
})();
