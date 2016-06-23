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
        projectId: '='
      },
      controller: ProjectHyperlinksDirectiveController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;
  }

  /** @ngInject */
  function ProjectHyperlinksDirectiveController($log, projectHyperlink) {
    var vm = this;
    vm.data = [];

    $log.debug("ProjectHyperlinksDirectiveController");

    $log.debug("vm.projectId = " + vm.projectId);

    if (angular.isDefined(vm.projectId)) {
      $log.debug("vm.projectId is defined.");
      $log.debug("vm.projectId = " + vm.projectId);

      var onSuccess = function(hyperlinks) {
        vm.data = hyperlinks;
      };

      projectHyperlink
        .getByProjectId(vm.projectId)
        .then(onSuccess);
    }
  }
})();
