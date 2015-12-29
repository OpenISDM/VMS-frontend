(function() {
    'use strict';
    angular.module('vmsFrontend').factory('volunteerProfile', volunteerProfile);
    /** @ngInject */
    function volunteerProfile($q, $log, vmsClient, defaultAvatarPath, cities) {
        var service = {
            get: get
        };
        return service;

        function get() {
            var deferred = $q.defer(),
                handleRequestSucess = function(response) {
                    var profile;
                    $log.debug("success");
                    $log.debug(response.data);
                    profile = response.data;
                    cities.forEach(function(city) {
                        if (city.id == profile.city.id) {
                            $log.debug(city.name_zh_tw);
                            profile.city.name_zh_tw = city.name_zh_tw;
                        }
                    });
                    // TODO: The avatar string need to be refactored
                    if (profile.avatar_url == "http://vms-openisdm.s3-website-ap-northeast-1.amazonaws.com/upload/avatars/") {
                        profile.avatar_url = defaultAvatarPath;
                    }
                    deferred.resolve(profile);
                },
                handleRequestError = function(response) {
                    $log.debug('error');
                    $log.debug(response);
                    deferred.reject(response);
                };
            vmsClient.getProfile(handleRequestSucess, handleRequestError);
            return deferred.promise;
        }
    }
})();