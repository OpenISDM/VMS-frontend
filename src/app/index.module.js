(function() {
    'use strict';

    angular
        .module('vmsFrontend', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria',
            'LocalStorageModule', 'restangular', 'ui.router', 'ui.bootstrap', 'toastr', 'angular-jwt', 'naif.base64',
            'angular-loading-bar', 'anim-in-out'
        ]);

})();