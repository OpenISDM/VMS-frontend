(function() {
    'use strict';
    /**
     * @todo Complete the test
     * This example is not perfect.
     * Test should check if MomentJS have been called
     */
    describe('Authorization service', function() {
        var authPrincipleMock, stateMock, authorizationService, $rootScope;
        // Crate a authPrinciple mock and set it into authenticated
        function createAuthenticatedAuthPrincipleMock() {
            authPrincipleMock = {
                isAuthenticated: jasmine.createSpy('isAuthenticated').and.returnValue(true),
                isIdentityResolved: jasmine.createSpy('isIdentityResolved').and.returnValue(true)
            };
        }

        function createUnauthenticatedAuthPrincipleMock() {
            authPrincipleMock = {
                isAuthenticated: jasmine.createSpy('isAuthenticated').and.returnValue(false),
                isIdentityResolved: jasmine.createSpy('isIdentityResolved').and.returnValue(true)
            };
        }

        function registerAuthPrincipleMock() {
            module(function($provide) {
                $provide.value('authPrinciple', authPrincipleMock);
            });
        }

        function createService() {
            inject(function($injector) {
                authorizationService = $injector.get('authorization');
            });
        }

        function createRootScopeMock(auth) {
            inject(function(_$rootScope_) {
                var data = {
                    data: {
                        needAuth: auth
                    }
                };
                $rootScope = _$rootScope_;
                $rootScope.toState = data;
            });
        }
        beforeEach(function() {
            module('vmsFrontend');
        });
        // Test postAuthorize() function
        describe('postAuthorize()', function() {
            var state, scope;

            function _inject(auth) {
                inject(function(_$state_) {
                    createRootScopeMock(auth);
                    state = _$state_;
                    spyOn(state, 'go');
                });
            }

            function registerRootStateName() {
                module(function($provide) {
                    $provide.value('$state', state);
                });
            }
            it('should be go to original page, if it needs to be authenticated', function() {
                createAuthenticatedAuthPrincipleMock();
                registerAuthPrincipleMock();
                _inject(true);
                createService();
                $rootScope.toState.name = 'dashboard';
                authorizationService.postAuthorize();
                expect(state.go).toHaveBeenCalledWith('dashboard');
            });
            it('should go to login page, if it needs to be authenticated', function() {
                createUnauthenticatedAuthPrincipleMock();
                registerAuthPrincipleMock();
                //mockAuthPrincipleIndentityPromise();
                _inject(true);
                createService();
                $rootScope.toState.name = 'dashboard';
                authorizationService.postAuthorize();
                expect(state.go).toHaveBeenCalledWith('login');
            });
            it('should go to login page, if it doesn\'t need to be authenticated', function() {
                createUnauthenticatedAuthPrincipleMock();
                registerAuthPrincipleMock();
                _inject(false);
                createService();
                $rootScope.toState.name = 'dashboard';
                authorizationService.postAuthorize();
                expect(state.go).not.toHaveBeenCalled();
            });
        });
        // Test authorize() function
        describe('authorize()', function() {
            var $scope, $rootScope, $q, promise, then;

            function _inject() {
                inject(function(_$rootScope_, _$q_) {
                    createRootScopeMock(false);
                    $rootScope = _$rootScope_;
                    $q = _$q_;
                    $scope = $rootScope.$new();
                });
            }

            function mockAuthPrincipleIndentityPromise() {
                then = jasmine.createSpy('then');
                promise = {
                    then: then
                };
                authPrincipleMock.identity = function() {
                    return promise;
                }
            }
            it('should receive a function', function() {
                createAuthenticatedAuthPrincipleMock();
                mockAuthPrincipleIndentityPromise();
                registerAuthPrincipleMock();
                _inject();
                createService();
                authorizationService.authorize();
                //expect(then).toHaveBeenCalledWith(jasmine.any(Function));
                expect(then).toHaveBeenCalled();
            });
        });
    });
})();