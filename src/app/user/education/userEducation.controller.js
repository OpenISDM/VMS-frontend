(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .controller('UserEducationController', UserEducationController);

  function UserEducationController(
    $log,
    userEducation,
    EDUCATION_DEGREES,
    $filter) {
    var vm = this;
    var beginYear = 1970;
    vm.years = new Array();
    vm.isShowAddEducation = false;

    angular.element(document).ready(getEducations);
    angular.element(document).ready(setYear);
    angular.element(document).ready(setDegree);

    function getEducations() {
      var onSuccess = function(value) {
        $log.debug(value);

        vm.educations = value.educations;

        if (angular.isDefined(value)) {
          $log.debug('vm.educations.length');
          $log.debug(vm.educations.length);

          if (vm.educations.length == 0) {
            vm.isShowAddEducation = true;
          }
        } else {
          $log.debug('education value is not defined');

          vm.isShowAddEducation = true;
        }

      };

      userEducation
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

    function setDegree() {
      vm.degrees = EDUCATION_DEGREES;
    }

    function getEditableObject(id) {
      var objName = 'education' + id;
      var editableObj = vm[objName];

      return editableObj;
    }

    function transformToDate(year) {
      return new Date(year, 1);
    }

    vm.addEducation = function() {

      var onSuccess = function(data) {
        getEducations();
        vm.isShowAddEducation = false;
      };
      var onFailure = function(data) {};

      $log.debug('addEducations()');
      $log.debug(vm.sEducation);

      userEducation
        .create(vm.sEducation)
        .then(onSuccess)
        .catch(onFailure);
    };

    vm.updateEducation = function(id) {
      var getByIdFilter = $filter('getById');
      var education = getByIdFilter(vm.educations, id);

      $log.debug(education);

      var onSuccess = function() {
        getEditableObject(id).$hide();
      };
      var onFailure = function() {
        /**
         * TODO: show error msg
         */
      };

      userEducation
        .update(education)
        .then(onSuccess)
        .catch(onFailure);
    };

    vm.deleteEducation = function(id) {
      var onSuccess = function() {
        getEditableObject(id).$hide();
        getEducations();
      };
      var onFailure = function() {
        /**
         * TODO: show error msg
         */
      };

      userEducation
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

    vm.setAddEducationVisible = function() {
      vm.isShowAddEducation = true;
    };

    vm.setAddEducationInvisible = function() {
      vm.isShowAddEducation = false;
    };

    vm.onShowEditableForm = function(id) {
      var formElement = angular.element(document).find('form[name="vm.education' + id + '"]');
      formElement.addClass('editable-form-section');
    };

    vm.onHideEditableForm = function(id) {
      var formElement = angular.element(document).find('form[name="vm.education' + id + '"]');
      formElement.removeClass('editable-form-section');
    }
  }
})();
