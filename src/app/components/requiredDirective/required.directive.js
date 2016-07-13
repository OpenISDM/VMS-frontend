(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .directive('requiredLabel', requiredLabel);

  /** @ngInject */
  function requiredLabel() {
    var directive = {
      restrict: 'A',
      compile: function(element) {
        element.append("<span class='required-star'>*</span>");
      }
    };

    return directive;
  }

})();
