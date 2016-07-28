(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .controller('ManageProjectCustomFieldsController', ManageProjectCustomFieldsController);

  /** @ngInject */
  function ManageProjectCustomFieldsController(
    $log,
    $stateParams,
    $uibModal,
    projectCustomField
  ) {
    var vm = this;
    var projectId = $stateParams.projectId;

    angular.element(document).ready(getProjectCustomFields);

    vm.preview = preview;
    vm.appendCustomField = appendCustomField;

    function getProjectCustomFields() {
      projectCustomField
        .getAllByProjectId(projectId)
        .then(function(value) {
          if (value.data.length == 0) {
            vm.alerts = [
              {
                type: 'info',
                data: {
                  message: 'alert.info.non_custom_field'
                }
              }
            ];
          }

          vm.customFields = value.data;
        })
        .catch(function(alert) {
          vm.alerts = [];
          vm.alerts.push(alert);
        });
    }

    function appendCustomField() {
      vm.alerts = [];
      vm.customFields.push({
        order: vm.customFields.length
      });
    }

    function preview(data) {
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
