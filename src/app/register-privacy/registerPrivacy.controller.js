(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .controller('RegisterPrivacyController', RegisterPrivacyController);

  /** @ngInject */
  function RegisterPrivacyController($scope) {
  	$scope.privacyStatements = "隱私權政策內容"
  }
})();
