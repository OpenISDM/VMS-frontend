(function() {
    'use strict';
    /**
     * @todo Complete the test
     * This example is not perfect.
     * Test should check if MomentJS have been called
     */
    describe('AuthPrinciple service', function() {
        var authPrincipleService, jwtLocalStorageMock, vmsClientMock;

        function _inject() {
            inject(function($injector) {
                authPrincipleService = $injector.get('authPrinciple');
            });
        }

        function createJwtLocalStorageMock() {
            jwtLocalStorageMock = jasmine.createSpyObj('jwtLocalStorage', ['set', 'remove']);
        }

        function registerJwtLocalStorageMock() {
            module(function($provide) {
                $provide.value('jwtLocalStorage', jwtLocalStorageMock);
            });
        }

        function createVmsClientMock() {
            vmsClientMock = jasmine.createSpyObj('vmsClient', ['refreshToken']);
        }

        function registerVmsClientMock() {
            module(function($provide) {
                $provide.value('vmsClient', vmsClientMock);
            })
        }

        beforeEach(function() {
            module('vmsFrontend');
        });

        describe('authenticate() function', function() {
            beforeEach(function() {
                createJwtLocalStorageMock();
                registerJwtLocalStorageMock();
                _inject();
            });

            it('should store token', function() {
                authPrincipleService.authenticate('abc1234MyToken');
                expect(jwtLocalStorageMock.set).toHaveBeenCalledWith('abc1234MyToken');
                expect(jwtLocalStorageMock.remove).not.toHaveBeenCalled();
            });

            it('should remove token', function() {
                authPrincipleService.authenticate();
                expect(jwtLocalStorageMock.set).not.toHaveBeenCalled();
                expect(jwtLocalStorageMock.remove).toHaveBeenCalled();
            });
        });

        describe('refreshToken() function', function() {
            var $timeout;

            beforeEach(function() {
                createVmsClientMock();
                registerVmsClientMock();
                _inject();
            });

            beforeEach(inject(function(_$timeout_) {
                $timeout = _$timeout_;
            }));

            it('should return promise object', function() {
                var promise = authPrincipleService.refreshToken();
                $timeout.flush();
                expect(promise.then).toEqual(jasmine.any(Function));
                expect(vmsClientMock.refreshToken).toHaveBeenCalledWith(jasmine.any(Function), jasmine.any(Function));
            });
        });

        describe('identity() function', function() {
            var $q, deferred;

            function createPromiseMock() {
                inject(function($injector) {
                    $q = $injector.get('$q');
                });

            }

            function createDeferMock() {
                deferred = $q.defer();
                spyOn(deferred, 'resolve').and.callThrough();
                spyOn($q, 'defer').and.returnValue(deferred);
            }

            beforeEach(function() {
                createJwtLocalStorageMock();
                registerJwtLocalStorageMock();
                _inject();
                createPromiseMock();
                createDeferMock();
            });

            it('should return promise object, when being authenticated', function() {
                var promise;

                authPrincipleService.authenticate('abc1234MyToken');
                promise = authPrincipleService.identity();
                expect(promise.then).toEqual(jasmine.any(Function));
                expect(deferred.resolve).toHaveBeenCalledWith('abc1234MyToken');
            });

            it('should resolve with token', function() {
                jwtLocalStorageMock.tokenKeyExists = function() {};
                jwtLocalStorageMock.get = function() {};

                spyOn(jwtLocalStorageMock, 'tokenKeyExists').and.returnValue(true);
                spyOn(jwtLocalStorageMock, 'get').and.returnValue('abc1234MyToken');
                authPrincipleService.identity().then(function (identity) {
                    expect(identity).toEqual('abc1234MyToken');
                });
            });

            it('should resolve with token', function() {
                jwtLocalStorageMock.tokenKeyExists = function() {};
                jwtLocalStorageMock.get = function() {};

                spyOn(jwtLocalStorageMock, 'tokenKeyExists').and.returnValue(false);
                authPrincipleService.identity().then(function (identity) {
                    expect(identity).toBe(null);
                });
            });
        })
    });
})();