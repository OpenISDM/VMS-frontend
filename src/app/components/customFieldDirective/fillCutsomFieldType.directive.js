(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .directive('fillCustomFieldType', fillCustomFieldType);

  /** @ngInject */
  function fillCustomFieldType($compile) {
    var directive = {
      template: '<div class="form-group"><div class="row" ng-include="vm.getTemplateUrl()"></div></div>',
      restrict: 'E',
      scope: {
        type: '=',
        title: '=',
        fieldData: '=',
        metadata: '='
      },
      controller: FillCustomFieldTypeController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function FillCustomFieldTypeController($log) {
      var vm = this;
      var type;

      // Display the delete button
      // vm.optionView = [];

      $log.debug(vm);

      vm.getTemplateUrl = function() {
        switch (vm.type) {
          case 'RADIO_BUTTON':
          // $log.debug('=== RADIO_BUTTON ===');
          // $log.debug(vm.fieldData);

            setRadioButton();
            return getUrl('radioButton');
          case 'TEXT':
            // $log.debug('=== TEXT ===');
            // $log.debug(vm.fieldData);
            return getUrl('text');
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
        return 'app/components/customFieldDirective/' + type + 'FilledFieldType.html';
      }
    }
  }

})();
