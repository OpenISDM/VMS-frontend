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
        .getAllByProjectId(projectId)
        .then(function(data) {
          $log.debug('=== getProjectCustomFields ===');

          var customFields = data;

          $log.debug(customFields);

          projectCustomField
            .getMemberDataByProjectId(projectId)
            .then(function(data) {
              $log.debug('=== getProjectCustomFieldData ===');

              var customFieldData = data;

              $log.debug(customFieldData);

              combinedCustomFieldData(customFields.data, customFieldData.data);
            })
            .catch(function(response) {});
        })
        .catch(function(response) {
          $log.error('=== getProjectCustomFields error ===');
        });
    }

    function combinedCustomFieldData(fields, values) {
      $log.debug('=== combinedCustomFieldData() ===');
      $log.debug(fields);
      $log.debug(values);

      vm.sets = [];

      angular.forEach(fields, function(item) {
        var set = {
          customField: item
        };

        var customFieldData = getDataByRelationshipId(values, item.id);

        $log.debug('#### customFieldData ####');
        $log.debug(customFieldData);

        if (customFieldData !== false) {
          set['customFieldData'] = customFieldData;
        }

        vm.sets.push(set);
      });

      $log.debug('=== combinedCustomFieldData() ===');
      $log.debug(vm.sets);
    }

    function getDataByRelationshipId(values, id) {
      $log.debug('=== getDataByRelationshipId() ===');

      var result = false;

      angular.forEach(values, function(item) {
        $log.debug('=== item.relationships.project_custom_field.data.id ===');
        $log.debug(item.relationships.project_custom_field.data.id);
        $log.debug('=== id ===');
        $log.debug(id);

        if (item.relationships.project_custom_field.data.id == id) {
          $log.debug('BINGO');

          result = item.attributes;
        }
      });


      $log.debug('=== return result ===');
      $log.debug(result);

      return result;
    }

    vm.update = function() {
      $log.debug('=== vm.update() ===');
      $log.debug(vm.sets);

      var updatedData = {
        data: []
      };

      angular.forEach(vm.sets, function(item) {
        var value = {
          type: 'project_custom_field_data',
          attributes: {
            data: item.customFieldData.data
          },
          relationships: {
            project_custom_field: {
              data: {
                type: 'project_custom_field',
                id: item.customField.id
              }
            }
          }
        };

        updatedData.data.push(value);
      });

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
