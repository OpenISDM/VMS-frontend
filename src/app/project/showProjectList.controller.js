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

    vm.getManager = function(id) {
      // $log.debug('=== vm.getManager() ===');
      // $log.debug(id);

      var manager;

      angular.forEach(projectList.included, function(value) {
        if (value.type == 'managers') {
          if (value.id == id) {
            manager = value.attributes;
          }
        }
      });

      return manager;
    }
  }
})();
