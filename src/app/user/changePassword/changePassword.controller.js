(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .controller('ChangePasswordController', ChangePasswordController);

  /** @ngInject */
  function ChangePasswordController(
    $log,
    userPassword
  ) {
    var vm = this;
    vm.submit = submit;
    vm.data = {};

    function submit() {
      $log.debug("vm.data");
      $log.debug(vm.data);

      vm.alert = [];

      userPassword
        .update(vm.data.password, vm.data.newPassword)
        .then(function() {
          vm.alert.push({
            type: 'success',
            data: {
              message: 'alert.success.change_password'
            }
          });
        })
        .catch(function(alert) {
          vm.alert.push(alert);
        });
    }
  }
})();
