(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .directive('customFieldPreview', customFieldPreview);

  /** @ngInject */
  function customFieldPreview($compile) {
    var directive = {
      templateUrl: 'app/components/customField/preview/customFieldPreview.html',
      restrict: 'E',
      scope: {
        data: '='
      },
      controller: CustomFieldPreviewController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function CustomFieldPreviewController(
      $log
    ) {
      var vm = this;
      $log.debug('CustomFieldPreviewController');
      $log.debug(vm.data);
    }
  }

})();
