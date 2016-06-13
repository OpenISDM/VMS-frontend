(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .directive('projectHyperlinks', projectHyperlinks);

  /** @ngInject */
  function projectHyperlinks() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/projectHyperlinksDirective/projectHyperlinksDirective.html',
      scope: {
        projectId: '=',
        data: '='
      },
      controller: ProjectHyperlinksDirectiveController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;
  }

  /** @ngInject */
  function ProjectHyperlinksDirectiveController($log, project) {
    var vm = this;
    vm.data = [];

    if (vm.data.length == 0) {
      vm.data.push({
        name: "",
        link: ""
      });
    }

    $log.debug("ProjectHyperlinksDirectiveController");

    if (angular.isDefined(vm.projectId)) {
      var onSuccess = function() {};

      project.getHyperlinks(vm.projectId)
        .then(onSuccess);
    }

    vm.remove = function(index) {
      $log.debug("remove a project hyperlink");
      $log.debug(index);
    }
  }
})();
