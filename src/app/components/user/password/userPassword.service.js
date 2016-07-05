(function() {
  'use strict';
  angular
    .module('vmsFrontend')
    .factory('userPassword', userPassword);

  /** @ngInject */
  function userPassword(
    $log,
    $q,
    userPasswordEndpoint,
    alertMessage,
    apiBaseUrl
  ) {
    var service = {
      forgotPassword: forgotPassword,
      verifyPasswordReset: verifyPasswordReset,
      resetPassword: resetPassword
    };

    return service;

    function forgotPassword(data) {
      var deferred = $q.defer();

      userPasswordEndpoint
        .forgotPassword(data)
        .then(function(response) {
          deferred.resolve(response.data);
        })
        .catch(function(response) {
          var value = response.data;
          var errors = value.errors;
          var alerts;

          if (response.status === 422) {
            alerts = alertMessage.convertToValidationDanger(errors);
          } else {
            alerts = alertMessage.convertToDanger(errors);
          }

          deferred.reject(alerts);
        });

      return deferred.promise;
    }

    function verifyPasswordReset(email, token) {
      var deferred = $q.defer();

      userPasswordEndpoint
        .verifyPasswordReset(email, token)
        .then(function() {
          deferred.resolve();
        })
        .catch(function(response) {
          var value = response.data;
          var errors = value.errors;
          var alerts;

          if (response.status === 422) {
            alerts = alertMessage.convertToValidationDanger(errors);
          } else {
            alerts = alertMessage.convertToDanger(errors);
          }

          deferred.reject(alerts);
        });

      return deferred.promise;
    }

    function resetPassword(email, token, password, passwordConfirmation) {
      var deferred = $q.defer();

      userPasswordEndpoint
        .resetPassword(email, token, password, passwordConfirmation)
        .then(function(response) {
          deferred.resolve(response.data);
        })
        .catch(function(response) {
          var value = response.data;
          var errors = value.errors;
          var alerts;

          if (response.status === 422) {
            alerts = alertMessage.convertToValidationDanger(errors);
          } else {
            alerts = alertMessage.convertToDanger(errors);
          }

          deferred.reject(alerts);
        });

      return deferred.promise;
    }
  }

})();
