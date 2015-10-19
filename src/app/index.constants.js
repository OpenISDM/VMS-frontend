/* global malarkey:false, moment:false */
(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .constant('malarkey', malarkey)
    .constant('moment', moment)
    .constant('apiBaseUrl', 'https://vms-dev.herokuapp.com/api')
    .constant('apiKey', '581dba93a4dbafa42a682d36b015d8484622f8e3543623bec5a291f67f5ddff1');

})();
