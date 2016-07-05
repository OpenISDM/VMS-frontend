(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .controller('ResetPasswordController', ResetPasswordController);

  /** @ngInject */
  function ResetPasswordController(
    $log,
    $stateParams,
    userPassword
  ) {
    var vm = this;
    vm.submit = submit;
    vm.data = {};
    vm.showResetForm = false;

    var email = $stateParams.email;
    var token = $stateParams.token;

    angular.element(document).ready(function() {
      $log.debug('ready');

      verifyPasswordReset();
    });

    function submit() {
      vm.alert = [];

      userPassword
        .resetPassword(email, token, vm.data.password, vm.data.passwordConfirmation)
        .then(function() {
          vm.alert.push({
            type: 'success',
            data: {
              message: 'alert.success.reset_password_success'
            }
          });
        })
        .catch(function(alert) {
          vm.alert.push(alert);
        });
    }

    function verifyPasswordReset() {
      $log.debug('verifyPasswordReset()');

      userPassword
        .verifyPasswordReset(email, token)
        .then(function() {
          vm.showResetForm = true;
        })
        .catch(function(alert) {
          vm.alert = [alert];
        });
    }
  }
})();
