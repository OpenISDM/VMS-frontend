(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .controller('ShowProjectListController', ShowProjectListController);

  /** @ngInject */
  function ShowProjectListController($log, projects) {
    var vm = this;
    vm.setSearchField = setSearchField;

    vm.searchField = 'name';
    vm.projects = projects;

    function setSearchField(field) {
      vm.searchProject = undefined;
      vm.searchField = field;
    }
  }
})();
