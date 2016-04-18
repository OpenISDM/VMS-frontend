(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .controller('ManagedProjectListController', ManagedProjectListController);

  /** @ngInject */
  function ManagedProjectListController($log, vmsClient) {
    var vm = this;

    angular.element(document).ready(getProjects());

    function getProjects() {
      var onSuccess = function(response) {
        console.log(response.data);
        vm.projects = response.data;
      };
      var onFailure = function() {};

      vmsClient.getManagedProjects()
        .then(onSuccess).catch(onFailure);
    }
  }
})();
