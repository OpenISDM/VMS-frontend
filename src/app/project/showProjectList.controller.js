(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .controller('ShowProjectListController', ShowProjectListController);

  /** @ngInject */
  function ShowProjectListController($log, projects) {
    var vm = this;
    vm.projects = projects;

    $log.debug(vm.projects);
  }
})();
