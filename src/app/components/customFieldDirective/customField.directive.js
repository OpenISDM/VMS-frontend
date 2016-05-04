(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .directive('customField', customField);

  /** @ngInject */
  function customField() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/customFieldDirective/customFieldDirective.html',
      scope: {
        data: '='
      },
      controller: CustomFieldDirectiveController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;
  }

  /** @ngInject */
  function CustomFieldDirectiveController($log, $stateParams, vmsClient, CUSTOM_FIELD_TYPES) {
    var vm = this;
    vm.typeOptions = CUSTOM_FIELD_TYPES;

    angular.element(document).ready(setFieldType);

    vm.store = function() {
      vm.data['type'] = 'project_custom_field';
      vm.data.attributes['type'] = vm.type.value;
      $log.debug('customFieldData');
      $log.debug(vm.data);

      switch (vm.type.value) {
        case 'RADIO_BUTTON':
          setRadioButtonMetadataValue(vm.data.attributes.metadata);
          break;
      }

      removeDateTime();

      vmsClient.updateProjectCustomField($stateParams.projectId, {
        data: vm.data
      });
    };

    function setRadioButtonMetadataValue(metadata) {
      angular.forEach(metadata.options, function(item, key) {
        item['value'] = key;
      });
    }

    function removeDateTime() {
      if (angular.isDefined(vm.data.attributes.created_at)) {
        delete vm.data.attributes.created_at;
      }

      if (angular.isDefined(vm.data.attributes.updated_at)) {
        delete vm.data.attributes.updated_at;
      }
    }

    function setFieldType() {
      $log.debug('=== setFieldType() ===');
      $log.debug(vm.data.attributes);
      if (angular.isDefined(vm.data.attributes.type)) {
        $log.debug('=== type is defined ===');

        angular.forEach(CUSTOM_FIELD_TYPES, function(type) {
          if (vm.data.attributes.type == type.value) {
            vm.type = type;
          }
        });
      } else {
        $log.debug('=== type is not defined ===');

        vm.type = {
          label: '文字',
          typeName: 'text',
          value: 'TEXT'
        };
      }
    }
  }

})();
