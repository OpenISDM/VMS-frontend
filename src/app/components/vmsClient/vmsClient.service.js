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
      refreshToken: refreshToken,
      deleteAccount: deleteAccount
    };

    return service;

    function register(volunteer) {
      // Restangular.all('register').post(volunteer).then(function(response) {
      //   successCallback(response);
      // }, function(response) {
      //   failureCallback(response);
      // });

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
      // Restangular.all('auth').remove().then(function(response) {
      //   successCallback(response);
      // }, function(response) {
      //   failureCallback(response);
      // });

      return $http({
        method: 'DELETE',
        url: apiBaseUrl + '/auth'
      });
    }

    function emailVerification(email, verification_token) {
      // Restangular.one('email_verification/' + email + '/' + verification_token)
      //   .get()
      //   .then(function(response) {
      //     successCallback(response);
      //   }, function(response) {
      //     failureCallback(response);
      //   });

      return $http({
        'method': 'GET',
        'url': apiBaseUrl + '/email_verification/' + email + '/verification_token'
      });
    }

    function getProfile() {
      // Restangular.one('users/me')
      //   .get()
      //   .then(function(response) {
      //     successCallback(response);
      //   }, function(response) {
      //     failureCallback(response);
      //   });

      return $http({
        method: 'GET',
        url: apiBaseUrl + '/users/me'
      });
    }

    function refreshToken() {
      return $http({
        method: 'POST',
        url: apiBaseUrl + '/auth/refresh_token',
      });
    }

    function deleteAccount(credentials) {
      // Restangular.all('users/me/delete')
      //   .post(credentials)
      //   .then(successCallback, failureCallback);

      /**
       * @TODO: change the POST action into DELETE (?)
       */
      return $http({
        method: 'POST',
        url: apiBaseUrl + '/users/me/delete',
        data: 'credentials'
      });
    }
  }
})();
