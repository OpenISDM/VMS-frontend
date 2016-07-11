(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .controller('ManageProjectMemberController', ManageProjectMemberController);

  /** @ngInject */
  function ManageProjectMemberController(
    $log,
    membersData,
    vmsClient
  ) {
    var vm = this;
    var customFields = membersData.data.custom_fields.data;
    vm.getCustomFieldById = getCustomFieldById;

    vm.members = membersData.data.members.data;

    $log.debug('vm.members');

    $log.debug(vm.members);

    function getCustomFieldById(id) {
      var customField;
      angular.forEach(customFields, function(item, key) {
        if (item.id == id) {
          customField = item;
        }
      });

      $log.debug('getCustomFieldById');
      $log.debug(customField);

      return customField;
    }
  }
})();
