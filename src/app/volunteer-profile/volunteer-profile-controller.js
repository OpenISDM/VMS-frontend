(function() {
    'use strict';

    angular
        .module('vmsFrontend')
        .controller('ProfileController', ProfileController);

    /** @ngInject */

    function ProfileController($uibModal) {

        var vm = this;
        vm.volunteer = {
            img: "/assets/images/profile-default-avatar.png",
            name: "Jim Lim",
            introduction: "I'm a genius. I work on Data science/analytics and have excellent skills with Matlab and Ruby programming. My hobbies is sporting.",
            participating: "3",
            participated: "8"
        };

        vm.profile = {
            about: {
                firstName: "Lin",
                lastName: "Jim",
                userName: "jimlin",
                gender: "Male",
                address: "128 Academia Road, Section2, Nankang Dist.",
                birthDate: "1990/05/05",
                city: "Taipei City"
            },
            contact: {
                phoneNumber: "0912345678",
                emailAddress: "jimlin@citi.sinica.edu.tw",
                emergencyContact: "Jeremy Lin",
                emergencyPhone: "0919119119"
            },
            experience: {
                researchAssistant: "Research assistant",
                position: "Academia Sinica",
                date: "2014-now"
            },
            education: {
                background: "Master's degree, Computer science",
                school: "NCKU",
                schoolDate: "2012-2014"
            },
            skills: ["Swimming", "Programming"],
            equipments: ["Car", "Scooter", "Camera"]

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
