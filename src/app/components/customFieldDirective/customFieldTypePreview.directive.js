(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .directive('customFieldTypePreview', customFieldTypePreview);

  /** @ngInject */
  function customFieldTypePreview($compile) {
    var directive = {
      template: '<ng-include src="vm.getTemplateUrl()"/>',
      restrict: 'E',
      scope: {
        type: '=',
        attribute: '='
      },
      controller: CustomFieldTypePreviewController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function CustomFieldTypePreviewController() {
      var vm = this;

      vm.getTemplateUrl = function() {
        return 'app/components/customFieldDirective/' + vm.type + 'FieldTypePreview.html'
      }
    }
  }

})();
