(function() {
    'use strict';

    angular
        .module('vmsFrontend')
        .controller('RegisterPrivacyController', RegisterPrivacyController);

    /** @ngInject */
    function RegisterPrivacyController() {
        var vm = this;
        vm.privacyStatements = "隱私權政策內容";
    }
})();