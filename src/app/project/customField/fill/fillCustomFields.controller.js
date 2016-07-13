(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .controller('FillCustomFieldsController', FillCustomFieldsController);

  /** @ngInject */
  function FillCustomFieldsController(
    $log,
    $stateParams,
    projectCustomField
  ) {
    var vm = this;
    var projectId = $stateParams.projectId;

    angular.element(document).ready(init);

    function init() {
      projectCustomField
        .getMemberDataByProjectId(projectId)
        .then(function(value) {
          vm.data = value.data
        })
        .catch(function(alert) {
          vm.alert = [alert];
        });
    }

    vm.update = function() {
      $log.debug('=== vm.update() ===');
      $log.debug(vm.data);

      var updatedData = [];

      angular.forEach(vm.data, function(item) {
        $log.debug(item);

        var value = item.custom_field_data;

        if (value != null) {
          $log.debug('value');
          $log.debug(value);

          delete value.created_at;
          delete value.updated_at;

          value['custom_field_id'] = item.id;
        }

        this.push(value);
      }, updatedData);

      $log.debug(updatedData);

      var onSuccess = function(response) {
        $log.debug(response);
        vm.msg = '已成功送出。'
      };
      var onFailure = function(response) {
        $log.debug(response);
      };

      projectCustomField
        .storeOrUpdateMemberDataByProjectId(updatedData, projectId)
        .then(onSuccess)
        .catch(onFailure);
    };

    vm.remove = function() {};
  }
})();
