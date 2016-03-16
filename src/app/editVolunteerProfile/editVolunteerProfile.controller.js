(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .controller('EditVolunteerProfileController', EditVolunteerProfileController);

  /** @ngInject */
  function EditVolunteerProfileController($log, vmsClient, volunteer, cities) {
    var vm = this;
    vm.cities = cities;

    // In the begining, it gets the volunteer's profile
    angular.element(document).ready(getProfile());

    function getProfile() {
      var doneCallbacks = function(profile) {
          vm.profile = profile;
        },
        failCallbacks = function(response) {
          $log.debug(response);
        };

      volunteer.getProfile().then(doneCallbacks, failCallbacks)
    }

    vm.updateAboutAndContact = function() {
      var onSuccess = function(data) {
        vm.profile = data;
      };

      volunteer.updateProfile(vm.profile)
        .then(onSuccess);
    };
  }
})();
