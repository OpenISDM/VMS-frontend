(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .controller('ManageProjectMemberController', ManageProjectMemberController);

  /** @ngInject */
  function ManageProjectMemberController($log, membersData, vmsClient) {
    var vm = this;
    vm.rawList = membersData;
    vm.memberCustomFieldDataList = mapping(membersData);

    // angular.element(document).ready(getAllMembersCustomFieldData);

    $log.debug(vm.rawList);

    function getAllMembersCustomFieldData() {
      var onSuccess = function(response) {
        $log.debug(response.data);
        vm.rawList = response.data;
        vm.memberCustomFieldDataList = mapping(response.data);
      };
      var onFailure = function(response) {
        $log.debug(response);
      };

      vmsClient.getAllMembersCustomFieldData(projectId)
        .then(onSuccess)
        .catch(onFailure);
    }

    function mapping(list) {
      $log.debug('### mapping() ###');
      var result = [];

      angular.forEach(list.data, function(item) {
        var memberId = item.relationships.member.data.id;
        $log.debug(item);

        if (!angular.isDefined(result[memberId])) {
          result[memberId] = [];
        }

        result[memberId].push(item);
      });

      $log.debug('=== result ===');
      $log.debug(result);

      return result;
    }

    vm.getIncludedMember = function(id) {
      var result = false;

      $log.debug('=== getIncludedMember ===');
      $log.debug(id);

      angular.forEach(vm.rawList.included, function(value) {
        if (value.type == 'members' && value.id == id) {
          result = value.attributes;
        }
      });

      return result;
    };

    vm.getIncludedCustomField = function(id) {
      var result = false;

      angular.forEach(vm.rawList.included, function(value) {
        if (value.type == 'project_custom_fields' && value.id == id) {
          result = value.attributes;
        }
      });

      return result;
    };
  }
})();
