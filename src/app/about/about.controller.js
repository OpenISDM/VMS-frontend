(function() {
    'use strict';

    angular
        .module('vmsFrontend')
        .controller('AboutController', AboutController);


    function AboutController() {
        var vm = this;
        vm.aboutVMS = "志工管理系統(Volunteer Management System, VMS)";
    }
})();