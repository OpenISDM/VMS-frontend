(function() {
  'use strict';
  angular
    .module('vmsFrontend')
    .factory('volunteerProfileEndPoint', volunteerProfileEndPoint);

  /** @ngInject */
  function volunteerProfileEndPoint($log, $http, apiBaseUrl) {
    var service = {
      getAttendingProjects: getAttendingProjects
    };
    return service;

    function getAttendingProjects(id) {
      return $http({
        method: 'GET',
        url: apiBaseUrl + '/users/' + id + '/attending_projects'
      });
    }
  }

})();
