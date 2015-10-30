(function() {
    'use strict';

    angular
        .module('vmsFrontend')
        .controller('ProfileController', ProfileController);

    /** @ngInject */

    function ProfileController($uibModal, vmsClient, cities, $log, defaultAvatarPath) {

        var vm = this;

        vm.open = function() {
            var modal = $uibModal.open({
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl',
                controllerAs: 'vm'
            });
        };

        vm.edit = function() {
            // ...
        };

        angular.element(document).ready(getProfile());

        function getProfile() {
            vmsClient.getProfile(function(response) {
                $log.debug("success");
                $log.debug(response.data);

                vm.profile = response.data;

                cities.forEach(function(city) {
                    $log.debug("== city ==");

                    if (city.id == vm.profile.city.id) {
                        $log.debug("found city");
                        $log.debug("=== city name ===");
                        $log.debug(city.name_zh_tw);
                        
                        vm.profile.city.name_zh_tw = city.name_zh_tw;
                    }
                });

                if (vm.profile.avatar_url == "http://vms-openisdm.s3-website-ap-northeast-1.amazonaws.com/upload/avatars/") {
                    vm.profile.avatar_url = defaultAvatarPath;
                }

            }, function(response) {
                $log.debug('error');
                $log.debug(response);
            })
        }
    }

    angular.module('vmsFrontend').controller('ModalInstanceCtrl', function($uibModalInstance, $log, localStorageService, vmsClient) {

        var vm = this;
        vm.remind = "提醒您，帳號刪除後無法再還原，如果您確定要刪除帳號。";

        vm.ok = function() {
            var credentials = {
                username: localStorageService.get("username"),
                password: vm.password
            };

            $log.debug("username = " + credentials.username);
            $log.debug("password = " + credentials.password);

            vmsClient.deleteAccount(credentials, function(response){
                $log.debug("delete success");
                $uibModalInstance.close();
            }, function(response) {
                $log.debug("delete failure");
                $log.debug(response);

                if(response.status == 401) {
                    vm.deleteMsg = "您的密碼輸入錯誤，請重新輸入";
                }
            });

        
        };

        vm.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
    });

})();