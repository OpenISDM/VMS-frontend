(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .controller('UserProfileController', UserProfileController);

  /** @ngInject */

  function UserProfileController($uibModal, cities, $log, defaultAvatarPath, userProfile) {

    var vm = this;

    vm.open = function() {
      var modal = $uibModal.open({
        templateUrl: 'myModalContent.html',
        controller: 'ModalInstanceCtrl',
        controllerAs: 'vm'
      });
    };

    angular.element(document).ready(getProfile());

    function getProfile() {
      var doneCallbacks = function(result) {
          $log.debug("getProfile() done");
          $log.debug(result);

          vm.profile = result.data;
        },
        failCallbacks = function(response) {
          $log.debug(response);
        };

      userProfile.get().then(doneCallbacks, failCallbacks)
    }
  }

  angular.module('vmsFrontend').controller('ModalInstanceCtrl', function($state, $uibModalInstance, $log, vmsLocalStorage, userProfile) {

    var vm = this;
    vm.remind = "提醒您，帳號刪除後無法再還原，如果您確定要刪除帳號。";

    vm.ok = function() {
      $log.debug('deleteClickOk');

      var credentials = {
        username: vmsLocalStorage.getUsername(),
        password: vm.password
      };

      $log.debug("username = " + credentials.username);
      $log.debug("password = " + credentials.password);

      userProfile
        .drop(credentials)
        .then(function(response) {
          $log.debug("delete success");
          $uibModalInstance.close();

          $state.go('login');
        })
        .catch(function(response) {
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
