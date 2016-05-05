(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .filter('customFieldDataToText', customFieldDataToText);

  /** @ngInject */
  function customFieldDataToText($filter, $log) {
    var filter = function(input, type, metadata) {
      var transformedInput;

      switch (type) {
        case 'RADIO_BUTTON':
          transformRadioButton();

          break;
        case 'TEXT':
          transformedInput = input.value;

          break;
        default:
          transformedInput = 'NONE';
      }

      $log.debug('### type ###');
      $log.debug(type);
      $log.debug('### transformedInput ###');
      $log.debug(transformedInput);

      return transformedInput;

      function transformRadioButton() {
        $log.debug('=== transformRadioButton ===');
        $log.debug('### input ###');
        $log.debug(input);
        $log.debug('### metadata ###');
        $log.debug(metadata);

        angular.forEach(metadata.options, function(item) {
          $log.debug(item);

          if (item.value == input.option.value) {
            transformedInput = item.display_name;
            $log.debug('--- equal ---');
          }
        });
      }
    };

    return filter;
  }
})();
