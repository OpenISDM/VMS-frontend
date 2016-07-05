(function() {
  'use strict';
  angular
    .module('vmsFrontend')
    .factory('userPasswordEndpoint', userPasswordEndpoint);

  /** @ngInject */
  function userPasswordEndpoint(
    $log,
    $http,
    apiBaseUrl
  ) {
    var service = {
      forgotPassword: forgotPassword,
      verifyPasswordReset: verifyPasswordReset,
      resetPassword: resetPassword
    };

    return service;

    function forgotPassword(data) {
      return $http({
        method: 'POST',
        url: apiBaseUrl + '/users/forgot_password',
        data: data
      });
    }

    function verifyPasswordReset(email, token) {
      var data = {
        email: email,
        token: token
      };

      return $http({
        method: 'POST',
        url: apiBaseUrl + '/users/password_reset/verify',
        data: data
      });
    }

    function resetPassword(email, token, password, passwordConfirmation) {
      var data = {
        email: email,
        token: token,
        password: password,
        password_confirmation: passwordConfirmation
      };

      return $http({
        method: 'POST',
        url: apiBaseUrl + '/users/password_reset',
        data: data
      });
    }
  }

})();
