(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .controller('UserRegisterSuccessController', UserRegisterSuccessController);

  /** @ngInject */
  function UserRegisterSuccessController($log, $location) {
    var vm = this;
    vm.volunteer = $location.search();
  }
})();
