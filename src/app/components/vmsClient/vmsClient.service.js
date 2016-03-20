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
      deleteAccount: deleteAccount,
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
      updateEquipment: updateEquipment
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

    /**
     * @TODO: Unit testing
     */
    function getExperiences() {
      return $http({
        method: 'GET',
        url: apiBaseUrl + '/users/me/experiences',
      });
    }

    /**
     * @TODO: Unit testing
     */
    function addExperience(experience) {
      return $http({
        method: 'POST',
        url: apiBaseUrl + '/users/me/experiences',
        data: experience
      });
    }

    /**
     * @TODO: Unit testing
     */
    function updateExperience(experience) {
      return $http({
        method: 'PUT',
        url: apiBaseUrl + '/users/me/experiences',
        data: experience
      });
    }

    /**
     * @TODO: Unit testing
     */
    function deleteExperience(experienceId) {
      return $http({
        method: 'DELETE',
        url: apiBaseUrl + '/users/me/experiences/' + experienceId
      });
    }

    /**
     * @TODO: Unit testing
     */
    function getEducations() {
      return $http({
        method: 'GET',
        url: apiBaseUrl + '/users/me/educations',
      });
    }

    /**
     * @TODO: Unit testing
     */
    function addEducation(education) {
      return $http({
        method: 'POST',
        url: apiBaseUrl + '/users/me/educations',
        data: education
      });
    }

    /**
     * @TODO: Unit testing
     */
    function updateEducation(education) {
      return $http({
        method: 'PUT',
        url: apiBaseUrl + '/users/me/educations',
        data: education
      });
    }

    /**
     * @TODO: Unit testing
     */
    function deleteEducation(educationId) {
      return $http({
        method: 'DELETE',
        url: apiBaseUrl + '/users/me/educations/' + educationId
      });
    }

    /**
     * @TODO: Unit testing
     */
    function getSkillCandidatedKeywords(keyword) {
      $log.debug('vmsClient.getSkillCandidatedKeywords()');
      $log.debug(keyword);

      return $http({
        method: 'GET',
        url: apiBaseUrl + '/skill_candidates/' + keyword
      });
    }

    /**
     * @TODO: Unit testing
     */
    function getEquipmentCandidatedKeywords(keyword) {
      return $http({
        method: 'GET',
        url: apiBaseUrl + '/equipment_candidates/' + keyword,
      });
    }

    /**
     * @TODO: Unit testing
     */
    function getSkills() {
      return $http({
        method: 'GET',
        url: apiBaseUrl + '/users/me/skills',
      });
    }

    /**
     * @TODO: Unit testing
     */
    function updateSkills(skills) {
      return $http({
        method: 'POST',
        url: apiBaseUrl + '/users/me/skills',
        data: skills
      });
    }

    /**
     * @TODO: Unit testing
     */
    function getEquipment() {
      return $http({
        method: 'GET',
        url: apiBaseUrl + '/users/me/equipment',
      });
    }

    /**
     * @TODO: Unit testing
     */
    function updateEquipment(equipment) {
      return $http({
        method: 'POST',
        url: apiBaseUrl + '/users/me/equipment',
        data: equipment
      });
    }

  }
})();
