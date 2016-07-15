(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .controller('UserExperienceController', UserExperienceController);

  function UserExperienceController(
    $log,
    userExperience,
    $filter
  ) {
    var vm = this;
    var beginYear = 1970;
    vm.years = new Array();
    vm.isShowAddExperience = false;

    angular.element(document).ready(getExperiences);
    angular.element(document).ready(setYear);

    function getExperiences() {
      var onSuccess = function(value) {
        $log.debug(value);

        vm.experiences = value.experiences;

        if (angular.isDefined(value)) {
          $log.debug('vm.experiences.length');
          $log.debug(vm.experiences.length);

          if (vm.experiences.length == 0) {
            vm.isShowAddExperience = true;
          }
        } else {
          $log.debug('experience value is not defined');

          vm.isShowAddExperience = true;
        }

      };

      userExperience
        .getAll()
        .then(onSuccess);
    }

    function setYear() {
      var nowDate = new Date();

      for (var year = beginYear; year <= nowDate.getFullYear(); year++) {
        vm.years.push({
          value: year,
          text: year + ' 年'
        });
      }
    }

    function getEditableObject(id) {
      var objName = 'experience' + id;
      var editableObj = vm[objName];

      return editableObj;
    }

    function transformToDate(year) {
      return new Date(year, 1);
    }

    vm.addExperience = function() {

      var onSuccess = function(data) {
        getExperiences();
        vm.isShowAddExperience = false;
      };
      var onFailure = function(data) {};

      $log.debug('addExperiences()');
      $log.debug(vm.sExperience);

      userExperience
        .create(vm.sExperience)
        .then(onSuccess)
        .catch(onFailure);
    };

    vm.updateExperience = function(id) {
      var getByIdFilter = $filter('getById');
      var experience = getByIdFilter(vm.experiences, id);

      $log.debug(experience);

      var onSuccess = function() {
        getEditableObject(id).$hide();
      };
      var onFailure = function() {
        /**
         * TODO: show error msg
         */
      };

      userExperience
        .update(experience)
        .then(onSuccess)
        .catch(onFailure);
    };

    vm.deleteExperience = function(id) {
      var onSuccess = function() {
        getEditableObject(id).$hide();
        getExperiences();
      };
      var onFailure = function() {
        /**
         * TODO: show error msg
         */
      };

      userExperience
        .dropById(id)
        .then(onSuccess)
        .catch(onFailure);
    };

    vm.editableFormShow = function(id) {

      getEditableObject(id).$show();
    };

    vm.editableIsVisible = function(id) {

      $log.debug('vm.editableIsVisible()');

      var editableObj = getEditableObject(id);

      if (editableObj == null) {
        return false;
      }

      var visible = editableObj.$visible;

      return visible;
    };

    vm.editableFormCancel = function(id) {
      getEditableObject(id).$cancel();
    };

    vm.setAddExperienceVisible = function() {
      vm.isShowAddExperience = true;
    };

    vm.setAddExperienceInvisible = function() {
      vm.isShowAddExperience = false;
    };

    vm.onShowEditableForm = function(id) {
      var formElement = angular.element(document).find('form[name="vm.experience' + id + '"]');
      formElement.addClass('editable-form-section');
    };

    vm.onHideEditableForm = function(id) {
      var formElement = angular.element(document).find('form[name="vm.experience' + id + '"]');
      formElement.removeClass('editable-form-section');
    }
  }
})();
