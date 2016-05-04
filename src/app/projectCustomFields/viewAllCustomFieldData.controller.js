(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .controller('ViewAllCustomFieldDataController', ViewAllCustomFieldDataController);

  /** @ngInject */
  function ViewAllCustomFieldDataController($log, $stateParams, vmsClient) {
    var vm = this;
    var projectId = $stateParams.projectId;

    angular.element(document).ready(getAllMembersCustomFieldData);

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
        var memberId = parseInt(item.relationships.member.data.id);
        $log.debug(item);

        if (!angular.isDefined(result[memberId])) {
          result[memberId] = [];
        }

        result[memberId].push(item);
      });

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
