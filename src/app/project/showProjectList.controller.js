(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .controller('ShowProjectListController', ShowProjectListController);

  /** @ngInject */
  function ShowProjectListController($log, projectList) {
    var vm = this;
    vm.projectList = projectList;

    $log.debug(vm.projectList);
  }
})();
