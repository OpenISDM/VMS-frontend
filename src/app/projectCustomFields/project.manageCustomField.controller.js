(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .controller('MyManageProjectCustomFieldsController', MyManageProjectCustomFieldsController);

  /** @ngInject */
  function MyManageProjectCustomFieldsController(
    $log,
    $stateParams,
    $uibModal,
    vmsClient
  ) {
    var vm = this;
    vm.preview = preview;
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

    function preview(data) {
      $log.debug("preview()");
      $log.debug(data);

      var modal = $uibModal.open({
        animation: true,
        templateUrl: 'customFieldPreview.html',
        controller: function($uibModalInstance) {
          var vm = this;
          vm.data = data;
          vm.cancel = function() {
            $uibModalInstance.dismiss('cancel');
          };
        },
        controllerAs: 'vm'
      });
    }
  }
})();
