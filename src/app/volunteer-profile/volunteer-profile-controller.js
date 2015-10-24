(function() {
    'use strict';

    angular
        .module('vmsFrontend')
        .controller('ProfileController', ProfileController);

    /** @ngInject */
    function ProfileController($uibModal) {
        var vm = this;

        vm.volunteer = {
            img: "profile.png",
            name: "Jim Lim",
            introduction: "I'm a genius. I work on Data science/analytics and have excellent skills with Matlab and Ruby programming. My hobbies is sporting.",
            participating: "3",
            participated: "8"
    }


})();
