(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .filter('yesNo', yesNo);

  /** @ngInject */
  function yesNo() {
    var filter = function(input) {
      return input ? '是' : '否';
    };

    return filter;
  }
})();
