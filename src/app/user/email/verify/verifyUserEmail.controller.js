(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .controller('VerifyUserEmailController', VerifyUserEmailController);

  /** @ngInject */
  function VerifyUserEmailController($log, $location, vmsClient, authPrinciple, $state, $rootScope, $timeout) {
    var vm = this;
    vm.verification = true;
    vm.verificationSuccess = false;
    vm.verificationStatus = vm.verification || vm.verificationSuccess;

    $log.debug("vm.verification " + vm.verification);
    $log.debug("vm.verificationSuccess " + vm.verificationSuccess);
    $log.debug("vm.verificationStatus " + vm.verificationStatus);

    vm.volunteer = $location.search();

    if (angular.isDefined(vm.volunteer.email) && angular.isDefined(vm.volunteer.verification_token)) {

      angular.element(document).ready(verify());
    } else {
      $log.debug("verification false");
      vm.verification = false;
      vm.verificationStatus = vm.verification || vm.verificationSuccess;

      $log.debug("vm.verificationStatus " + vm.verificationStatus);
    }

    function verify() {
      $log.debug("EmailVerificationController verify()");

      $log.debug("email = " + vm.volunteer.email);
      $log.debug("verification_token = " + vm.volunteer.verification_token);

      var successCallback = function(response) {
        $log.debug('emailVerification success');
        $log.debug(response);

        vm.verification = false;
        vm.verificationSuccess = true;
        vm.verificationStatus = vm.verification || vm.verificationSuccess;

        $timeout(function() {
          $state.go('profile')
        }, 5000);
      };

      var failureCallback = function(response) {
        $log.debug('emailVerification error');
        $log.debug(response);

        vm.verification = false;
        vm.verificationStatus = vm.verification || vm.verificationSuccess;
      };

      vmsClient.emailVerification(vm.volunteer.email,
        vm.volunteer.verification_token)
        .then(successCallback)
        .catch(failureCallback);
    }
  }
})();
