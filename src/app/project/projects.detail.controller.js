(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .controller('MyProjectDetailController', MyProjectDetailController);

  /** @ngInject */
  function MyProjectDetailController($log, $uibModal, vmsClient, projectData, members, PERMISSION_OPTIONS, $sce) {
    var vm = this;
    vm.permissionOptions = PERMISSION_OPTIONS;
    vm.project = projectData.data;
    vm.membersList = members;

    vm.attend = function() {
      var onSuccess = function(response) {
        $log.debug('attendProject() success');
      };
      var onFailure = function(response) {
        $log.debug('attendProject() failure');
      }

      vmsClient.attendProject(projectId)
        .then(onSuccess)
        .catch(onFailure);
    };

    vm.trustAsHtml = function(html) {
      return $sce.trustAsHtml(html);
    };

    vm.showMember = function(member) {
      $log.debug("showMemeber");
      $log.debug(member);

      var templateString = '<div class="modal-header"><h4>{{ vm.member.attributes.username }} 已參加的專案</h4></div>' +
        '<div class="modal-body"><show-attending-projects member-id="vm.member.id"></show-attending-projects></div>'

      $uibModal.open({
        animation: true,
        template: templateString,
        controller: function(member) {
          $log.debug("modal Controller");

          var vm = this;
          vm.member = member;

          $log.debug("vm.member");
          $log.debug(vm.member);
        },
        controllerAs: 'vm',
        resolve: {
          member: function() {
            return member;
          }
        }
      });
    };
  }
})();
