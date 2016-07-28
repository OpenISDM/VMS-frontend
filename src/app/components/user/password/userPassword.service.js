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
    alertMessage
  ) {
    var service = {
      update: update,
      forgotPassword: forgotPassword,
      verifyPasswordReset: verifyPasswordReset,
      resetPassword: resetPassword
    };

    return service;

    function update(password, newPassword) {
      var deferred = $q.defer();
      var data = {
        original_password: password,
        new_password: newPassword
      };

      userPasswordEndpoint
        .update(data)
        .then(function(response) {
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
      var data = {
        email: email,
        token: token
      };

      userPasswordEndpoint
        .verifyPasswordReset(data)
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
      var data = {
        email: email,
        token: token,
        password: password,
        password_confirmation: passwordConfirmation
      };

      userPasswordEndpoint
        .resetPassword(data)
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
