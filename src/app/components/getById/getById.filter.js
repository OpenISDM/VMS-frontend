(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .filter('getById', getById);

  function getById() {

    return function(input, id) {

      for (var i = 0; i < input.length; i++) {
        if (input[i].id == id) {
          return input[i];
        }
      }

      return null;
    };
  }
})();
