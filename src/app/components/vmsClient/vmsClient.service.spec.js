(function() {
    'use strict';
    describe('vmsClient', function() {
        var httpBackend, vmsClient, Restangular;

        function sanitizeRestangularAll(items) {
            var all = _.map(items, function(item) {
                return sanitizeRestangularOne(item);
            });
            return sanitizeRestangularOne(all);
        }
        // Remove all Restangular/AngularJS added methods in order to use Jasmine toEqual between the retrieve resource and the model
        function sanitizeRestangularOne(item) {
            return _.omit(item, "route", "parentResource", "getList", "get", "post", "put", "remove",
                "head", "trace", "options", "patch", "$get", "$save", "$query", "$remove", "$delete",
                "$put", "$post", "$head", "$trace", "$options", "$patch", "$then", "$resolved", 
                "restangularCollection", "customOperation", "customGET", "customPOST", "customPUT", 
                "customDELETE", "customGETLIST", "$getList", "$resolved", "restangularCollection", 
                "one", "all", "doGET", "doPOST", "doPUT", "doDELETE", "doGETLIST", "addRestangularMethod", 
                "getRestangularUrl", "getRequestedUrl", "clone", "reqParams", "withHttpConfig", "plain",
                "restangularized", "several", "oneUrl", "allUrl", "fromServer", "save", "singleOne");
        }

        beforeEach(function() {
            module('vmsFrontend', 'vmsFrontend.mock');
        });
        beforeEach(inject(function($injector, _$httpBackend_, _Restangular_) {
            httpBackend = _$httpBackend_;
            vmsClient = $injector.get('vmsClient');
            Restangular = _Restangular_;
        }));
        it('should get volunteer\'s profile after successful registeration', function() {
            var result, data, responseMock, headerMock;
            inject(function($injector) {
                data = $injector.get('registerVolunteerPostMock');
                responseMock = $injector.get('registerSuccessfulResponseMock');
                headerMock = $injector.get('unauthorizedHeaderMock');
            });
            spyOn(Restangular, 'all').and.callThrough();
            httpBackend.expectPOST('http://vms.app/api/register', data, headerMock).respond(201, responseMock);
            vmsClient.register(data, function(response) {
                result = response.data;
            });
            httpBackend.flush();
            expect(Restangular.all).toHaveBeenCalledWith('register');
        });
        it('should login successfully', function() {
            var result, headerMock;
            var data = {
                'username': 'jimlin',
                'password': 'MYPASSW0RD'
            };
            var responseMock = {
                'href': 'https://vms.app/api/users/me',
                'auth_access_token': '56f4da226eb22caa0633023bfdd402658e5c6501c972e83bfb2866f2112b103f'
            };
            inject(function($injector) {
                headerMock = $injector.get('unauthorizedHeaderMock');
            });
            spyOn(Restangular, 'all').and.callThrough();
            httpBackend.expectPOST('http://vms.app/api/auth', data, headerMock).respond(responseMock);
            vmsClient.login(data, function(response) {
                result = response.data;
            });
            httpBackend.flush();
            expect(Restangular.all).toHaveBeenCalledWith('auth');
        });
        it('should logout successfully', function() {
            var result, headerMock;
            inject(function($injector) {
                headerMock = $injector.get('authorizedHeaderMock');
            });
            spyOn(Restangular, 'all').and.callThrough();
            httpBackend.expectDELETE('http://vms.app/api/auth', headerMock).respond(204);
            vmsClient.logout(function() {});
            httpBackend.flush();
        });
        it('should verificate email successfully', function() {
            var result, headerMock;
            var responseMock = {
                'message': 'Successful email verification'
            };
            inject(function($injector) {
                headerMock = $injector.get('authorizedHeaderMock');
            });
            spyOn(Restangular, 'one').and.callThrough();
            httpBackend.expectGET('http://vms.app/api/email_verification/abc@abc.com/MYEMAIL1807', headerMock).respond(200, responseMock);
            vmsClient.emailVerification('abc@abc.com', 'MYEMAIL1807', function(response) {
                result = response.data;
            });
            httpBackend.flush();
            expect(Restangular.one).toHaveBeenCalledWith('email_verification/abc@abc.com/MYEMAIL1807');
            expect(sanitizeRestangularOne(result)).toEqual(responseMock);
        });
        it('should get volunteer profile successfully', function() {
            var result, headerMock, responseMock;
            inject(function($injector) {
                headerMock = $injector.get('authorizedHeaderMock');
                responseMock = $injector.get('volunteerProfileMock');
            });
            spyOn(Restangular, 'one').and.callThrough();
            httpBackend.expectGET('http://vms.app/api/users/me', headerMock).respond(function(method, url, data, headers, params) {
                return [200, responseMock];
            });
            vmsClient.getProfile(function(response) {
                result = response.data;
            });
            httpBackend.flush();
            expect(Restangular.one).toHaveBeenCalledWith('users/me');
            expect(sanitizeRestangularOne(result)).toEqual(responseMock);
        });

        it('shoud refresh token successfully', function() {
            var headerMock;

            inject(function($injector) {
                headerMock = $injector.get('authorizedHeaderMock');
            });
            spyOn(Restangular, 'all').and.callThrough();
            httpBackend.expectPOST('http://vms.app/api/auth/refresh_token')
            .respond(204);

            vmsClient.refreshToken(function(){});
            httpBackend.flush();
            expect(Restangular.all).toHaveBeenCalledWith('auth/refresh_token');
        });

        it('should delete an account successfully', function() {
            var headerMock;
            var data = {
                'username': 'jimlin',
                'password': 'MYPASSW0RD'
            };

            inject(function($injector) {
                headerMock = $injector.get('authorizedHeaderMock');
            });
            spyOn(Restangular, 'all').and.callThrough();
            httpBackend.expectPOST('http://vms.app/api/users/me/delete')
            .respond(204);

            vmsClient.deleteAccount(data, function(){});
            expect(Restangular.all).toHaveBeenCalledWith('users/me/delete');
        });
    });
})();