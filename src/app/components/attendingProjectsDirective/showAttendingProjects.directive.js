(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .directive('showAttendingProjects', showAttendingProjects);

  /** @ngInject */
  function showAttendingProjects() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/attendingProjectsDirective/showAttendingProjectDirective.html',
      scope: {
        memberId: '='
      },
      controller: ShowAttendingProjectsController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;
  }

  /** @ngInject */
  function ShowAttendingProjectsController($log, volunteer) {
    var vm = this;

    $log.debug("ShowAttendingProjectsController");

    volunteer.getAttendingProjects(vm.memberId)
      .then(function(attendingRecords) {
        $log.debug("getAttendingProjects().then()");

        vm.data = attendingRecords.data;

        $log.debug("vm.data");
        $log.debug(vm.data);
      });
  }
})();
