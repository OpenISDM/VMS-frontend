(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .controller('AttendingProjectListController', AttendingProjectListController);

  /** @ngInject */
  function AttendingProjectListController($log, vmsClient) {
    var vm = this;

    angular.element(document).ready(getProjects());

    function getProjects() {
      var onSuccess = function(response) {
        vm.projects = response.data;
      };
      var onFailure = function() {};

      vmsClient.getAttendingProject()
        .then(onSuccess).catch(onFailure);
    }
  }
})();
