(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .filter('htmlize', htmlize);

  /** @ngInject */
  function htmlize($sce) {
    var filter = function(input) {
      return $sce.trustAsHtml(input);
    };

    return filter;
  }
})();
