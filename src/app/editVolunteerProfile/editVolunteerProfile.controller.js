(function() {
    'use strict';

    angular
        .module('vmsFrontend')
        .controller('EditVolunteerProfileController', EditVolunteerProfileController);

    /** @ngInject */
    function EditVolunteerProfileController($log, vmsClient, volunteerProfile, cities) {
        var vm = this;
        vm.cities = cities;
        angular.element(document).ready(getProfile());

        function getProfile() {
            var doneCallbacks = function(profile) {
                vm.profile = profile;
            },
            failCallbacks = function(response) {
                $log.debug(response);
            };

            volunteerProfile.get().then(doneCallbacks, failCallbacks)
        }
    }
})();