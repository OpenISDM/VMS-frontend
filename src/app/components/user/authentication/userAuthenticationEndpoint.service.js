(function() {
  'use strict';
  angular
    .module('vmsFrontend')
    .factory('userAuthenticationEndpoint', userAuthenticationEndpoint);

  /** @ngInject */
  function userAuthenticationEndpoint($log, $http, apiBaseUrl) {
    var service = {
      login: login,
      logout: logout,
      refreshToken: refreshToken,
      verifyEmail: verifyEmail
    };

    return service;

    function login(data) {
      return $http({
        method: 'POST',
        url: apiBaseUrl + '/auth',
        data: data
      });
    }

    function logout() {
      return $http({
        method: 'DELETE',
        url: apiBaseUrl + '/auth'
      });
    }

    function refreshToken() {
      return $http({
        method: 'POST',
        url: apiBaseUrl + '/auth/refresh_token'
      });
    }

    function verifyEmail(email, token) {
      return $http({
        'method': 'GET',
        'url': apiBaseUrl + '/email_verification/' + email + '/' + token
      });
    }
  }

})();
