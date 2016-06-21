(function() {
  'use strict';
  angular
    .module('vmsFrontend')
    .factory('userSkill', userSkill);

  /** @ngInject */
  function userSkill($log, $q, userSkillEndpoint) {
    var service = {
      getAll: getAll,
      update: update,
      getCandidatedKeywords: getCandidatedKeywords
    };

    return service;

    function getAll() {
      var deferred = $q.defer();

      userSkillEndpoint
        .getAll()
        .then(function(response) {
          deferred.resolve(response.data);
        })
        .catch(function(response) {
          deferred.resolve(response.data);
        });

      return deferred.promise;
    }

    function update(values, existingIndexes) {
      var deferred = $q.defer();

      var skills = [];

      angular.forEach(values, function(value) {
        skills.push(value.name);
      });

      var data = {
        'skills': skills,
        'existing_skill_indexes': existingIndexes
      };

      userSkillEndpoint
        .update(data)
        .then(function(response) {
          deferred.resolve();
        })
        .catch(function(response) {
          deferred.reject(response.data);
        });

      return deferred.promise;
    }

    function getCandidatedKeywords(keyword) {
      var deferred = $q.defer();

      userSkillEndpoint
        .getCandidatedKeywords(keyword)
        .then(function(response) {
          deferred.resolve(response.data);
        })
        .catch(function(response) {
          deferred.reject(response.data);
        });

      return deferred.promise;
    }
  }

})();
