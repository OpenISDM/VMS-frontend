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
      update: update,
      forgotPassword: forgotPassword,
      verifyPasswordReset: verifyPasswordReset,
      resetPassword: resetPassword
    };

    return service;

    function update(data) {
      return $http({
        method: 'PUT',
        url: apiBaseUrl + '/users/me/password',
        data: data
      });
    }

    function forgotPassword(data) {
      return $http({
        method: 'POST',
        url: apiBaseUrl + '/users/forgot_password',
        data: data
      });
    }

    function verifyPasswordReset(data) {
      return $http({
        method: 'POST',
        url: apiBaseUrl + '/users/password_reset/verify',
        data: data
      });
    }

    function resetPassword(data) {
      return $http({
        method: 'POST',
        url: apiBaseUrl + '/users/password_reset',
        data: data
      });
    }
  }

})();
