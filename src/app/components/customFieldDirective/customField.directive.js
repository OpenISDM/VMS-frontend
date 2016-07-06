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
  function CustomFieldDirectiveController(
    $log,
    $stateParams,
    projectCustomField,
    CUSTOM_FIELD_TYPES
  ) {
    var vm = this;
    var projectId = $stateParams.projectId;
    vm.typeOptions = CUSTOM_FIELD_TYPES;
    vm.store = store;

    angular.element(document).ready(setFieldType);

    function store() {
      // vm.data['type'] = 'project_custom_field';
      vm.data['type'] = vm.type.value;
      $log.debug('customFieldData');
      $log.debug(vm.data);

      switch (vm.type.value) {
        case 'RADIO_BUTTON':
          setRadioButtonMetadataValue(vm.data.metadata);
          break;
      }

      removeDateTime();

      projectCustomField
        .storeOrUpdateByProjectId(vm.data, projectId);
    }

    function setRadioButtonMetadataValue(metadata) {
      angular.forEach(metadata.options, function(item, key) {
        item['value'] = key;
      });
    }

    function removeDateTime() {
      if (angular.isDefined(vm.data.created_at)) {
        delete vm.data.created_at;
      }

      if (angular.isDefined(vm.data.updated_at)) {
        delete vm.data.updated_at;
      }
    }

    function setFieldType() {
      $log.debug('=== setFieldType() ===');
      $log.debug(vm.data);
      if (angular.isDefined(vm.data.type)) {
        $log.debug('=== type is defined ===');

        angular.forEach(CUSTOM_FIELD_TYPES, function(type) {
          if (vm.data.type == type.value) {
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
