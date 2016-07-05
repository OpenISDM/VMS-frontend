(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .controller('ForgotPasswordController', ForgotPasswordController);

  /** @ngInject */
  function ForgotPasswordController(
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
        .forgotPassword(vm.data)
        .then(function() {
          vm.alert.push({
            type: 'success',
            data: {
              message: 'alert.success.sent_password_reset'
            }
          });
        })
        .catch(function(alert) {
          vm.alert.push(alert);
        });
    }
  }
})();
