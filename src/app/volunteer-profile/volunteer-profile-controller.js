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
        };

        vm.open = function() {
            var modal = $uibModal.open({
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl',
                controllerAs: 'vm'
            });
        }
    }

})();

angular.module('vmsFrontend').controller('ModalInstanceCtrl', function($uibModalInstance) {

    var vm = this;
    vm.remind = "Warning: Account deletion cannot be undone. If you're absolutely sure you want to delete your account, enter your password to continue:";

    vm.ok = function() {
       // alert(vm.password); //testing ng-model password
        $uibModalInstance.close();
    };

    vm.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };
});
