(function() {
    'use strict';

    angular
        .module('vmsFrontend')
        .run(runBlock);

    /** @ngInject */
    function runBlock($log, jwtRequest, jwtLocalStorage, Restangular) {
        Restangular.addFullRequestInterceptor(function(element, operation, what, url, headers, params, httpConfig) {
            $log.log('== what ==');
            $log.log(what);
            $log.debug(jwtRequest);

            var customHeaders = {};
            customHeaders['X-VMS-API-Key'] = '581dba93a4dbafa42a682d36b015d8484622f8e3543623bec5a291f67f5ddff1';

            if (jwtRequest.indexOf(what) != -1) {
                $log.log('NEED to ADD Token');

                if (jwtLocalStorage.tokenKeyExists()) {
                    $log.log('token key exists');

                    customHeaders['Authorization'] = 'Bearer ' + jwtLocalStorage.get();
                }
            }

            return {
                headers: customHeaders,
                params: params,
                element: element,
                httpConfig: httpConfig
            }
        });

        $log.debug('runBlock end');
    }

})();