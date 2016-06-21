(function() {
  'use strict';
  angular.module('vmsFrontend').factory('volunteer', volunteer);

  /** @ngInject */
  function volunteer($q, $log, vmsClient, volunteerProfileEndPoint, defaultAvatarPath, cities) {
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
      deleteEducation: deleteEducation,
      getSkillCandidatedKeywords: getSkillCandidatedKeywords,
      getEquipmentCandidatedKeywords: getEquipmentCandidatedKeywords,
      getSkills: getSkills,
      updateSkills: updateSkills,
      getEquipment: getEquipment,
      updateEquipment: updateEquipment,
      getAttendingProjects: getAttendingProjects
    };
    return service;

    function getProfile() {
      var deferred = $q.defer();

      var handleRequestSucess = function(response) {
        var profile;

        $log.debug("success");
        $log.debug(response.data);

        profile = response.data.data;

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

    function getSkillCandidatedKeywords(keyword) {
      var deferred = $q.defer();

      $log.debug('volunteer.getSkillCandidatedKeywords()');

      if (angular.isDefined(keyword) && keyword != '') {

        var onSuccess = function(response) {
          $log.debug('get skill candidated keywords successfully');

          deferred.resolve(response.data.result);
        };
        var onFailure = function(response) {
          $log.debug('get skill candidated keywords failed');

          deferred.reject(response.data);
        };

        vmsClient.getSkillCandidatedKeywords(keyword)
          .then(onSuccess)
          .catch(onFailure);
      } else {
        deferred.reject();
      }

      return deferred.promise;
    }

    function getEquipmentCandidatedKeywords(keyword) {
      var deferred = $q.defer();

      var onSuccess = function(response) {
        $log.debug('get equipment candidated keywords successfully');

        deferred.resolve(response.data.result);
      };
      var onFailure = function(response) {
        $log.debug('get equipment candidated keywords failed');

        deferred.reject(response.data);
      };

      vmsClient.getEquipmentCandidatedKeywords(keyword)
        .then(onSuccess)
        .catch(onFailure);

      return deferred.promise;
    }

    function getSkills() {
      var deferred = $q.defer();

      var onSuccess = function(response) {
        $log.debug('get skills successfully');

        deferred.resolve(response.data.skills);
      };
      var onFailure = function(response) {
        $log.debug('get skills failed');

        deferred.reject(response.data);
      };

      vmsClient.getSkills()
        .then(onSuccess)
        .catch(onFailure);

      return deferred.promise;
    }

    function updateSkills(skills, existingIndexes) {
      var deferred = $q.defer();

      var onSuccess = function() {
        $log.debug('update skills successfully');

        deferred.resolve();
      };
      var onFailure = function(response) {
        $log.debug('update skills failed');

        deferred.reject(response.data);
      };

      var sSkills = [];
      angular.forEach(skills, function(value) {
        sSkills.push(value.name);
      });

      var updateSkills = {
        'skills': sSkills,
        'existing_skill_indexes': existingIndexes
      }

      vmsClient.updateSkills(updateSkills)
        .then(onSuccess)
        .catch(onFailure);

      return deferred.promise;
    }

    function getEquipment() {
      var deferred = $q.defer();

      var onSuccess = function(response) {
        $log.debug('get equipment successfully');

        deferred.resolve(response.data.equipment);
      };
      var onFailure = function(response) {
        $log.debug('get equipment failed');

        deferred.reject(response.data);
      };

      vmsClient.getEquipment()
        .then(onSuccess)
        .catch(onFailure);

      return deferred.promise;
    }

    function updateEquipment(equipment, existingIndexes) {
      var deferred = $q.defer();

      var onSuccess = function() {
        $log.debug('update equipment successfully');

        deferred.resolve();
      };
      var onFailure = function(response) {
        $log.debug('update equipment failed');

        deferred.reject(response.data);
      };

      var sEquipment = [];
      angular.forEach(equipment, function(value) {
        sEquipment.push(value.name);
      });

      var updateEquipment = {
        'equipment': sEquipment,
        'existing_equipment_indexes': existingIndexes
      }

      vmsClient.updateEquipment(updateEquipment)
        .then(onSuccess)
        .catch(onFailure);

      return deferred.promise;
    }

    function getAttendingProjects(userId) {
      var deferred = $q.defer();

      volunteerProfileEndPoint
        .getAttendingProjects(userId)
        .then(function(response) {
          $log.debug(response);

          deferred.resolve(response.data);
        })
        .catch(function(response) {
          $log.error(response);

          deferred.reject(response);
        });

      return deferred.promise;
    }
  }
})();
