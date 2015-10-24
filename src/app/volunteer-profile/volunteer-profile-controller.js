(function() {
    'use strict';

    angular
        .module('vmsFrontend')
        .controller('ProfileController', ProfileController);

    /** @ngInject */
    function ProfileController() {
        var vm = this;
        vm.img = "profile.png";
    }
})();
