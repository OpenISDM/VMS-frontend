(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .factory('vmsClient', vmsClient);

  /** @ngInject */
  function vmsClient($log, Restangular, $http, apiBaseUrl) {
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

    function register(volunteer, successCallback, failureCallback) {
      Restangular.all('register').post(volunteer).then(function(response) {
        successCallback(response);
      }, function(response) {
        failureCallback(response);
      });
    }

    function login(credentials, successCallback, failureCallback) {
      $http({
        method: 'POST',
        url: 'http://vms.app/api/auth',
        data: credentials
      }).then(successCallback, failureCallback);
    }

    function logout(successCallback, failureCallback) {
      Restangular.all('auth').remove().then(function(response) {
        successCallback(response);
      }, function(response) {
        failureCallback(response);
      });
    }

    function emailVerification(email, verification_token, successCallback, failureCallback) {
      Restangular.one('email_verification/' + email + '/' + verification_token)
        .get()
        .then(function(response) {
          successCallback(response);
        }, function(response) {
          failureCallback(response);
        });
    }

    function getProfile(successCallback, failureCallback) {
      Restangular.one('users/me')
        .get()
        .then(function(response) {
          successCallback(response);
        }, function(response) {
          failureCallback(response);
        });
    }

    function refreshToken() {
      return $http({
        method: 'POST',
        url: apiBaseUrl + '/auth/refresh_token',
      });
    }

    function deleteAccount(credentials, successCallback, failureCallback) {
      Restangular.all('users/me/delete')
        .post(credentials)
        .then(successCallback, failureCallback);
    }
  }
})();
