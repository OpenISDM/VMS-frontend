(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .controller('ProjectPanelController', ProjectPanelController);

  /** @ngInject */
  function ProjectPanelController($log, projectData) {
    var vm = this;
    vm.project = projectData.data;
    vm.meta = projectData.meta;

    $log.debug(vm.project);

    vm.isGuest = function() {
      if (angular.isDefined(vm.project)) {
        return vm.meta.role.name == 'guest';
      }

      return false;
    };

    vm.isCreator = function() {
      $log.debug('isCreator()');
      if (angular.isDefined(vm.project)) {
        return vm.meta.role.name == 'creator';
      }

      return false;
    };

    vm.isMember = function() {
      if (angular.isDefined(vm.project)) {
        return vm.meta.role.name == 'member';
      }

      return false;
    };
  }
})();
