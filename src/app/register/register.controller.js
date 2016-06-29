(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .controller('RegisterController', RegisterController);

  /** @ngInject */
  function RegisterController($log, $state, fieldName, defaultAvatarPath, userProfile, vmsErrorMessage, $scope, cities, vmsLocalStorage) {
    var vm = this;
    vm.cities = cities;

    $log.log('RegisterController');

    vm.showAvatar = defaultAvatarPath;

    vm.datePicker = {
      mode: 'year',
      dateOptions: {
        datepickerMode: "'year'",
        minMode: "'year'",
        minDate: "minDate",
        showWeeks: "false"
      },
      status: {
        opened: false
      },
      format: 'yyyy'
    };

    vm.register = function() {
      $log.debug('=== register ===');

      $log.debug(vm.volunteer);

      if (vm.showAvatar != defaultAvatarPath) {
        vm.volunteer.avatar = vm.showAvatar;
      }

      var onSuccess = function(response) {
        $state.go('registerSuccess', {
          last_name: vm.volunteer.last_name,
          email: vm.volunteer.email
        });
      };
      var onFailure = function(alert) {
        $log.debug(alert);
        vm.alerts = [];
        vm.alerts.push(alert);

        $log.debug(vm.alerts);
      };

      // Password confirmation
      if (vm.volunteer.password != vm.passwordConfirm) {
        vm.alert = [];
        vm.alert.push({
          type: 'danger',
          message: '密碼不相符'
        });

        return;
      }
      userProfile
        .create(vm.volunteer, 'volunteer')
        .then(onSuccess)
        .catch(onFailure);
    };

    vm.selectAvatar = function(event, fileReader, file, fileList, fileObjects, object) {
      var base64Image = "data:" + object.filetype + ';base64,' + object.base64
      vm.showAvatar = base64Image;
    };

    vm.openDatePicker = function($event) {
      $log.debug("click openDatePicker");
      $event.preventDefault();
      $event.stopPropagation();
      vm.datePicker.status.opened = true;
    };
  }
})();
