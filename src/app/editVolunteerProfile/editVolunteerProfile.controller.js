(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .controller('EditVolunteerProfileController', EditVolunteerProfileController);

  /** @ngInject */
  function EditVolunteerProfileController($log, userProfile, cities) {
    var vm = this;
    vm.cities = cities;

    vm.datePicker = {
      mode: 'year',
      dateOptions: {
        datepickerMode: 'year',
        minMode: "'year'",
        // minDate: "minDate",
        showWeeks: "false"
      },
      status: {
        opened: false
      },
      format: 'yyyy'
    };

    vm.openDatePicker = function($event) {
      $event.preventDefault();
      $event.stopPropagation();
      vm.datePicker.status.opened = true;
    };

    // In the begining, it gets the volunteer's profile
    angular.element(document).ready(getProfile());

    function getProfile() {
      var doneCallbacks = function(value) {
          vm.profile = value.data;

          $log.debug(vm.profile);
        },
        failCallbacks = function(response) {
          $log.debug(response);
        };

      userProfile
        .get()
        .then(doneCallbacks, failCallbacks);
    }

    vm.updateAboutAndContact = function() {
      var onSuccess = function(value) {
        $log.debug(value);
        vm.profile = value.data;
      };

      $log.debug(vm.profile);

      userProfile
        .update(vm.profile)
        .then(onSuccess);
    };
  }
})();
