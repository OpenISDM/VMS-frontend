(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .filter('getIndexById', getIndexById);

  function getIndexById() {

    return function(input, id) {

      for (var i = 0; i < input.length; i++) {
        if (input[i].id == id) {
          return i;
        }
      }

      return null;
    };
  }
})();
