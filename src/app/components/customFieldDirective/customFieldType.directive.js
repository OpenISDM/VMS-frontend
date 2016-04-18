(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .directive('customFieldType', customFieldType);

  /** @ngInject */
  function customFieldType($compile) {
    var directive = {
      template: '<ng-include src="vm.getTemplateUrl()"/>',
      restrict: 'E',
      scope: {
        type: '=',
        metadata: '='
      },
      controller: CustomFieldTypeController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function CustomFieldTypeController($log) {
      var vm = this;
      var type;

      // Display the delete button
      // vm.optionView = [];

      $log.debug(vm);

      vm.getTemplateUrl = function() {
        switch (vm.type) {
          case 'radioButton':
            $log.debug('=== radioButton ===');
            setRadioButton();
            return getUrl(vm.type);
          default:
            return null;
        }
      };

      function setRadioButton() {
        if (!angular.isDefined(vm.metadata) || vm.metadata.length == 0) {
          $log.debug('push.....');
          vm.metadata = {
            options: [
              {
              }
            ]
          };

          $log.debug(vm.metadata);
        }

        vm.hoverDelete = function(index) {
          return option.showDelete = !option.showDelete;
        };
        vm.appendOption = function() {
          vm.metadata.options.push({
          });
        };

        vm.delete = function(index) {
          $log.debug('=== vm.delete() ===');
          $log.debug(index);
          vm.metadata.options.splice(index, 1);
        }
      }

      function getUrl(type) {
        return 'app/components/customFieldDirective/' + type + 'FieldType.html';
      }
    }
  }

})();
