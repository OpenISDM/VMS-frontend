(function() {
    'use strict';

    angular
        .module('vmsFrontend')
        .factory('vmsErrorMessage', vmsErrorMessage);

    /** @ngInject */
    function vmsErrorMessage($log, fieldName) {
        var service = {
            getErrorMsg: getErrorMsg,
            fieldMsg: fieldMsg
        };

        return service;

        function getErrorMsg(errors) {
            $log.log('getErrorMsg');
            $log.log(errors);

            var errorMsgs = [];
            errors.forEach(function(error) {
                if (error.code == "used_field") {
                    errorMsgs.push("被使用的 " + fieldMsg(error));
                } else if (error.code == "missing_field") {
                    errorMsgs.push("未輸入的 " + fieldMsg(error));
                } else if (error.code == "not_enough_password_strength") {
                    errorMsgs.push("密碼強度不足");
                }
            });

            return errorMsgs.join(";");
        }

        function fieldMsg(error) {
            var fields = error.fields;

            return fields.join(", ");
        }
    }
})();