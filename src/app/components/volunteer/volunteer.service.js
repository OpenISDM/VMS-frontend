(function() {
  'use strict';
  angular.module('vmsFrontend').factory('volunteer', volunteer);
  /** @ngInject */
  function volunteer($q, $log, vmsClient, defaultAvatarPath, cities) {
    var service = {
      getProfile: getProfile,
      updateProfile: updateProfile,
      getExperiences: getExperiences,
      addExperience: addExperience,
      updateExperience: updateExperience,
      deleteExperience: deleteExperience,
      getEducations: getEducations,
      addEducation: addEducation,
      updateEducation: updateEducation,
      deleteEducation: deleteEducation
    };
    return service;

    function getProfile() {
      var deferred = $q.defer();

      var handleRequestSucess = function(response) {
        var profile;

        $log.debug("success");
        $log.debug(response.data);

        profile = response.data;

        cities.forEach(function(city) {
          if (city.id == profile.city.id) {
            $log.debug(city.name_zh_tw);
            profile.city.name_zh_tw = city.name_zh_tw;
          }
        });

        // TODO: The avatar string need to be refactored
        if (profile.avatar_url == "http://vms-openisdm.s3-website-ap-northeast-1.amazonaws.com/upload/avatars/") {
          profile.avatar_url = defaultAvatarPath;
        }

        deferred.resolve(profile);
      };
      var handleRequestError = function(response) {
        $log.debug('error');
        $log.debug(response);

        deferred.reject(response);
      };

      vmsClient.getProfile()
        .then(handleRequestSucess)
        .catch(handleRequestError);

      return deferred.promise;
    }

    function updateProfile(profile) {
      var deferred = $q.defer();

      // remove the avatar_url property
      delete profile.avatar_url;
      delete profile.email;

      var onSuccess = function(response) {
        $log.debug('update profile successfully');

        deferred.resolve(response.data);
      };

      var onFailure = function(response) {
        $log.debug('update profile failed');

        deferred.reject(response.data);
      };

      vmsClient.updateProfile(profile)
        .then(onSuccess)
        .catch(onFailure);

      return deferred.promise;
    }

    function getExperiences() {
      var deferred = $q.defer();

      var onSuccess = function(response) {
        $log.debug('get experiences successfully');

        deferred.resolve(response.data.experiences);
      };
      var onFailure = function(response) {
        $log.debug('get experiences failed');

        deferred.reject(response.data);
      };

      vmsClient.getExperiences()
        .then(onSuccess)
        .catch(onFailure);

      return deferred.promise;
    }

    function addExperience(data) {
      var deferred = $q.defer();

      var onSuccess = function(response) {
        $log.debug('add experience successfully');

        deferred.resolve(response.data);
      };
      var onFailure = function(response) {
        $log.debug('add experience failed');

        deferred.reject(response.data);
      };

      vmsClient.addExperience(data)
        .then(onSuccess)
        .catch(onFailure);

      return deferred.promise;
    }

    function updateExperience(data) {
      var deferred = $q.defer();

      var onSuccess = function() {
        $log.debug('update experience successfully');

        deferred.resolve();
      };
      var onFailure = function(response) {
        $log.debug('update experience failed');

        deferred.reject(response.data);
      };

      vmsClient.updateExperience(data)
        .then(onSuccess)
        .catch(onFailure);

      return deferred.promise;
    }

    function deleteExperience(id) {
      var deferred = $q.defer();

      var onSuccess = function() {
        $log.debug('delete experience successfully');

        deferred.resolve();
      };
      var onFailure = function(response) {
        $log.debug('delete experience failed');

        deferred.reject(response.data);
      };

      vmsClient.deleteExperience(id)
        .then(onSuccess)
        .catch(onFailure);

      return deferred.promise;
    }

    function getEducations() {
      var deferred = $q.defer();

      var onSuccess = function(response) {
        $log.debug('get educations successfully');

        deferred.resolve(response.data.educations);
      };
      var onFailure = function(response) {
        $log.debug('get educations failed');

        deferred.reject(response.data);
      };

      vmsClient.getEducations()
        .then(onSuccess)
        .catch(onFailure);

      return deferred.promise;
    }

    function addEducation(data) {
      var deferred = $q.defer();

      var onSuccess = function(response) {
        $log.debug('add education successfully');

        deferred.resolve(response.data);
      };
      var onFailure = function(response) {
        $log.debug('add education failed');

        deferred.reject(response.data);
      };

      vmsClient.addEducation(data)
        .then(onSuccess)
        .catch(onFailure);

      return deferred.promise;
    }

    function updateEducation(data) {
      var deferred = $q.defer();

      var onSuccess = function() {
        $log.debug('update education successfully');

        deferred.resolve();
      };
      var onFailure = function(response) {
        $log.debug('update education failed');

        deferred.reject(response.data);
      };

      vmsClient.updateEducation(data)
        .then(onSuccess)
        .catch(onFailure);

      return deferred.promise;
    }

    function deleteEducation(id) {
      var deferred = $q.defer();

      var onSuccess = function() {
        $log.debug('delete education successfully');

        deferred.resolve();
      };
      var onFailure = function(response) {
        $log.debug('delete education failed');

        deferred.reject(response.data);
      };

      vmsClient.deleteEducation(id)
        .then(onSuccess)
        .catch(onFailure);

      return deferred.promise;
    }
  }
})();
