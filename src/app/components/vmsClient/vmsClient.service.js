(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .factory('vmsClient', vmsClient);

  /** @ngInject */
  function vmsClient($log, $http, apiBaseUrl) {
    var service = {
      register: register,
      login: login,
      logout: logout,
      emailVerification: emailVerification,
      getProfile: getProfile,
      updateProfile: updateProfile,
      refreshToken: refreshToken,
      deleteAccount: deleteAccount
    };

    return service;

    function register(volunteer) {
      return $http({
        method: 'POST',
        url: apiBaseUrl + '/register',
        data: volunteer
      });
    }

    function login(credentials) {
      return $http({
        method: 'POST',
        url: apiBaseUrl + '/auth',
        data: credentials
      });
    }

    function logout() {
      return $http({
        method: 'DELETE',
        url: apiBaseUrl + '/auth'
      });
    }

    function emailVerification(email, verification_token) {
      return $http({
        'method': 'GET',
        'url': apiBaseUrl + '/email_verification/' + email + '/' + verification_token
      });
    }

    function getProfile() {
      return $http({
        method: 'GET',
        url: apiBaseUrl + '/users/me'
      });
    }

    function updateProfile(profile) {
      return $http({
        method: 'PUT',
        url: apiBaseUrl + '/users/me',
        data: profile
      });
    }

    function refreshToken() {
      return $http({
        method: 'POST',
        url: apiBaseUrl + '/auth/refresh_token'
      });
    }

    function deleteAccount(credentials) {
      /**
       * @TODO: change the POST action into DELETE (?)
       */
      return $http({
        method: 'POST',
        url: apiBaseUrl + '/users/me/delete',
        data: credentials
      });
    }

  }
})();
