(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .controller('ProfileController', ProfileController);

  /** @ngInject */

  function ProfileController($uibModal, vmsClient, cities, $log, defaultAvatarPath, volunteerProfile) {

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
      var doneCallbacks = function(profile) {
          vm.profile = profile;
        },
        failCallbacks = function(response) {
          $log.debug(response);
        };

      volunteerProfile.get().then(doneCallbacks, failCallbacks)
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

      vmsClient.deleteAccount(credentials, function(response) {
        $log.debug("delete success");
        $uibModalInstance.close();
      }, function(response) {
        $log.debug("delete failure");
        $log.debug(response);

        if (response.status == 401) {
          vm.deleteMsg = "您的密碼輸入錯誤，請重新輸入";
        }
      });


    };

    vm.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };
  });

})();
