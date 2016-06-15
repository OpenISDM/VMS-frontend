(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .directive('editableProjectHyperlinks', editableProjectHyperlinks);

  /** @ngInject */
  function editableProjectHyperlinks() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/editableProjectHyperlinksDirective/editableProjectHyperlinksDirective.html',
      scope: {
        projectId: '=',
        data: '='
      },
      controller: EditableProjectHyperlinksDirectiveController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;
  }

  /** @ngInject */
  function EditableProjectHyperlinksDirectiveController($log, projectService) {
    var vm = this;
    vm.data = [];

    if (vm.data.length == 0) {
      vm.data.push({
        name: "",
        link: ""
      });
    }

    $log.debug("EditableProjectHyperlinksDirectiveController");

    $log.debug("vm.projectId = " + vm.projectId);

    if (angular.isDefined(vm.projectId)) {
      $log.debug("vm.projectId is defined.");
      $log.debug("vm.projectId = " + vm.projectId);

      var onSuccess = function(hyperlinks) {
        vm.data = hyperlinks;
      };

      projectService.getHyperlinks(vm.projectId)
        .then(onSuccess);
    }

    vm.remove = function(index) {
      $log.debug("remove a project hyperlink");
      $log.debug(index);

      var onSuccess = function() {
        vm.data.splice(index, 1);

        $log.debug(vm.data);
      };

      var onFailure = function(response) {
        $log.error(response);
      };

      if (angular.isDefined(vm.data[index].id)) {
        projectService.deleteHyperlinks(vm.projectId, vm.data[index].id)
          .then(onSuccess)
          .catch(onFailure);
      } else {
        vm.data.splice(index, 1);
      }
    }

    vm.append = function() {
      vm.data.push({
        name: "",
        link: ""
      });
    };
  }
})();
