(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .directive('vmsMessage', vmsMessage);

  /** @ngInject */
  function vmsMessage() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/vmsMessageDirective/vmsMessageDirective.html',
      scope: {
        data: '='
      },
      controller: VmsMessageController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;
  }

  /** @ngInject */
  function VmsMessageController($log) {
    var vm = this;

    vm.isArray = isArray;

    $log.debug('VmsMessageController');

    vm.data.forEach(function(element, index, array) {
      $log.debug('forEach');
      $log.debug(element);

      if (vm.data[index].type === 'info') {
        array[index]['timeout'] = 6500;
      } else {
        array[index]['timeout'] = 'none';
      }
    });

    function isArray(value) {
      return angular.isArray(value);
    }
  }
})();
