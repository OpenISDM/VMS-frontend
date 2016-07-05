(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .controller('EditSkillEquipmentController', EditSkillEquipmentController);

  function EditSkillEquipmentController(userEquipment, userSkill, arrayHelpersService, $scope, $log) {
    var vm = this;
    vm.equipment = [];
    vm.skills = [];
    vm.skillCandidatedKeywords = [];
    vm.equipmentCandidatedKeywords = [];
    $scope.originSkills = [];
    $scope.originEquipment = [];

    angular.element(document).ready(getSkills);
    angular.element(document).ready(getEquipment);

    function getSkills() {
      var onSuccess = function(value) {
        $log.debug(value.skills);

        vm.skills = value.skills;
        $scope.originSkills = angular.copy(value.skills);

        $log.debug('### $scope.originSkills ###');
        $log.debug($scope.originSkills);
      };

      var onFailure = function(data) {
        /**
         * TODO: show error msg
         */
      };

      userSkill.getAll()
        .then(onSuccess)
        .catch(onFailure);
    }

    function getEquipment() {
      var onSuccess = function(value) {
        $log.debug(value.equipment);

        vm.equipment = value.equipment;
        $scope.equipment = angular.copy(value.equipment);

        $log.debug('### $scope.equipment ###');
        $log.debug($scope.equipment);
      };

      var onFailure = function(data) {
        /**
         * TODO: show error msg
         */
      };

      userEquipment
        .getAll()
        .then(onSuccess)
        .catch(onFailure);
    }

    vm.refreshSkillCandidatedKeywords = function(skill) {
      $log.debug('search skill keyword');
      $log.debug(skill);

      var onSuccess = function(result) {
        $log.debug('refreshSkillCandidatedKeywords onSuccess()');
        $log.debug(result);
        return result;
      };

      return userSkill
        .getCandidatedKeywords(skill)
        .then(onSuccess);
    };

    vm.refreshEquipmentCandidateKeywords = function(equipment) {
      $log.debug('search equipment keyword');
      $log.debug(equipment);

      var onSuccess = function(result) {
        $log.debug('refreshEquipmentCandidateKeywords onSuccess()');
        $log.debug(result);
        return result;
      };

      return userEquipment
        .getCandidatedKeywords(equipment)
        .then(onSuccess);
    };

    vm.updateSkills = function() {
      $log.debug('updateSkills()');
      $log.debug(vm.skills);

      var onSuccess = function() {
        getSkills();
      };
      var onFailure = function(data) {
        /**
         * TODO: show error msg
         */
      };

      $log.debug('$scope.originSkills');
      $log.debug($scope.originSkills);

      var existingIndexes = arrayHelpersService.getExistingIndexes($scope.originSkills, vm.skills);

      $log.debug('existingIndexes');
      $log.debug(existingIndexes);

      userSkill.update(vm.skills, existingIndexes)
        .then(onSuccess)
        .catch(onFailure);
    };

    vm.updateEquipment = function() {
      $log.debug('updateEquipment()');
      $log.debug(vm.equipment);

      var onSuccess = function() {
        getSkills();
      };
      var onFailure = function(data) {
        /**
         * TODO: show error msg
         */
      };

      $log.debug('$scope.originEquipment');
      $log.debug($scope.originEquipment);

      var existingIndexes = arrayHelpersService.getExistingIndexes($scope.originEquipment, vm.equipment);

      $log.debug('existingIndexes');
      $log.debug(existingIndexes);

      userEquipment
        .update(vm.equipment, existingIndexes)
        .then(onSuccess)
        .catch(onFailure);
    };
  }
})();
