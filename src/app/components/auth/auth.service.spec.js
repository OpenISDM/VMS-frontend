(function() {
  'use strict';

  describe('authService', function() {
    var vmsLocalStorageMock,
      auth,
      $httpBackend,
      $rootScope,
      deferred,
      apiBaseUrl,
      BROADCAST_EVENTS_LIST,
      authenticationFailureResponse = {
        'message': 'Authentication failed',
        'errors': [
          {
            'code': 'incorrect_login_credentials'
          }
        ]
      },
      authenticationSuccessResponse = {
        'href': 'https://vms.app/api/users/me',
        'auth_access_token': '123456'
      },
      failedCredentialsMock = {
        'username': 'abc',
        'password': 'LoloLo'
      },
      successfulCredentialsMock = {
        'username': 'abc',
        'password': 'aBc123456'
      };

    beforeEach(function() {
      module('vmsFrontend');
    });

    // create a vmsLocalStorageMock
    beforeEach(function() {
      vmsLocalStorageMock = {
        setJwt: jasmine.createSpy('setJwt'),
        setUsername: jasmine.createSpy('setUsername'),
        jwtExists: jasmine.createSpy('jwtExists')
      };

      module(function($provide) {
        $provide.value('vmsLocalStorage', vmsLocalStorageMock);
      });
    });

    // get services
    beforeEach(inject(function(_auth_, _$httpBackend_, _$rootScope_,
      _BROADCAST_EVENTS_LIST_, _$state_, _$q_, _apiBaseUrl_) {
      auth = _auth_;
      $httpBackend = _$httpBackend_;
      $rootScope = _$rootScope_;
      BROADCAST_EVENTS_LIST = _BROADCAST_EVENTS_LIST_;
      deferred = _$q_.defer();
      apiBaseUrl = _apiBaseUrl_;
    }));

    // Spy $rootScope.$broadcast()
    beforeEach(function() {
      spyOn($rootScope, '$broadcast').and.callThrough();
    });

    // mock $httpBackend
    beforeEach(function() {

      $httpBackend.whenPOST('http://vms.app/api/auth', failedCredentialsMock)
        .respond(function() {
          return [401, authenticationFailureResponse];
        });
      $httpBackend.whenPOST('http://vms.app/api/auth', successfulCredentialsMock)
        .respond(function() {
          return [200, authenticationSuccessResponse];
        });
    });

    describe('logout()', function() {

      beforeEach(function() {
        $httpBackend.whenPOST('http://vms.app/api/auth/refresh_token')
          .respond(function() {
            return [400];
          });
      });

      // create spies for vmsLocalStorageMock
      beforeEach(function() {
        vmsLocalStorageMock['removeJwt'] = jasmine.createSpy('removeJwt');
      });

      // Create spies for $q service
      beforeEach(function() {
        spyOn(deferred, 'resolve');
        spyOn(deferred, 'reject');
      });

      describe('when HTTP response status is 204', function() {

        // mock $httpBackend
        beforeEach(function() {
          $httpBackend.whenDELETE(apiBaseUrl + '/auth')
            .respond(function() {
              return [204];
            });
        });

        beforeEach(function() {
          vmsLocalStorageMock['getJwt'] = jasmine.createSpy('getJwt').and.returnValue('OUO0u0.0FooFoo');
        });

        it('should remove JWT from local storage', function() {
          auth.logout();
          $httpBackend.flush();
          expect(vmsLocalStorageMock.removeJwt).toHaveBeenCalled();
        });

        it('should the successful callback must be invoked', function() {
          auth.logout().then(function(response) {
            expect(response).toBeDefined();
          });
          $httpBackend.flush();
        });
      });

      describe('when HTTP response status is 404', function() {

        // mock $httpBackend
        beforeEach(function() {
          $httpBackend.whenDELETE(apiBaseUrl + '/auth')
            .respond(function() {
              return [404];
            });
        });

        beforeEach(function() {
          vmsLocalStorageMock['getJwt'] = jasmine.createSpy('getJwt').and.returnValue('OUO0u0.0FooFoo');
        });

        it('should remove JWT from local storage', function() {
          auth.logout();
          $httpBackend.flush();
          expect(vmsLocalStorageMock.removeJwt).toHaveBeenCalled();
        });

        it('should the failed callback must be invoked', function() {
          auth.logout().catch(function(response) {
            expect(response).toBeDefined();
          });
          $httpBackend.flush();
        });
      });

    });

    describe('authenticate() is called with successCallback', function() {

      beforeEach(function() {
        $httpBackend.whenPOST('http://vms.app/api/auth/refresh_token')
          .respond(function() {
            return [400];
          });
      });

      it('should set proper values into local storage', function() {
        auth.authenticate(successfulCredentialsMock);
        $httpBackend.flush();
        expect(vmsLocalStorageMock.setJwt).toHaveBeenCalledWith('123456');
        expect(vmsLocalStorageMock.setUsername).toHaveBeenCalledWith('abc');
      });

      it('should broadcast a successful authentication event', function() {
        auth.authenticate(successfulCredentialsMock);
        $httpBackend.flush();
        expect($rootScope.$broadcast).toHaveBeenCalledWith(BROADCAST_EVENTS_LIST.AUTHENTICATED_SUCCESS_EVENT);
      });

      it('should set authenticated variable into true', function() {
        auth.authenticate(successfulCredentialsMock);
        $httpBackend.flush();
        expect(auth.isAuthenticated()).toBe(true);
      });
    });

    describe('authenticate() is called with failureCallback', function() {

      beforeEach(function() {
        $httpBackend.whenPOST('http://vms.app/api/auth/refresh_token')
          .respond(function() {
            return [400];
          });
      });

      it('should set authenticated variable into false', function() {
        auth.authenticate(failedCredentialsMock);
        $httpBackend.flush();
        expect(auth.isAuthenticated()).toBe(false);
        expect(vmsLocalStorageMock.setJwt).not.toHaveBeenCalled();
      });

      it('should broadcast a failed authentication event', function() {
        auth.authenticate(failedCredentialsMock);
        $httpBackend.flush();
        expect($rootScope.$broadcast).toHaveBeenCalledWith(BROADCAST_EVENTS_LIST.AUTHENTICATED_FAILURE_EVENT);
      });
    });

    describe('the promise of the authenticate()', function() {

      beforeEach(function() {
        $httpBackend.whenPOST('http://vms.app/api/auth/refresh_token')
          .respond(function() {
            return [400];
          });
      });

      it('should call successful callback, when the deferred was resolved', function() {
        var success = false;
        var successfulCallback = function() {
          success = true;
        };
        auth.authenticate(successfulCredentialsMock).then(successfulCallback);
        $httpBackend.flush();
        expect(success).toBe(true);
      });

      it('should call failed callback, when the deferred was rejected', function() {
        var failure = false;
        var failedCallback = function() {
          failure = true;
        };
        auth.authenticate(failedCredentialsMock).catch(failedCallback);
        $httpBackend.flush();
        expect(failure).toBe(true);
      });
    });

    describe('refreshToken()', function() {

      var authPrinciple;

      // Get services
      beforeEach(inject(function(_authPrinciple_) {
        authPrinciple = _authPrinciple_;
      }));

      // Create spies for authPrinciple
      beforeEach(function() {
        spyOn(authPrinciple, 'identity').and.returnValue(true);
      });

      describe('when refreshing token is successful', function() {

        beforeEach(function() {
          // successful response
          $httpBackend.whenPOST('http://vms.app/api/auth/refresh_token')
            .respond(function() {
              return [200, {}, {
                'Authorization': 'Bearer NFoofO0Lo1Kk.099'
              }];
            });
        });

        beforeEach(function() {
          vmsLocalStorageMock['getJwt'] = jasmine.createSpy('getJwt').and.returnValue('FooFooLolKerKer0O');
          vmsLocalStorageMock.jwtExists.and.returnValue(true);
        });

        it('should set refreshing token into local storage', function(done) {
          auth.refreshToken();
          done();
          $httpBackend.flush();
          expect(vmsLocalStorageMock.setJwt).toHaveBeenCalledWith('NFoofO0Lo1Kk.099');
        });

      });

      describe('when refreshing token is failed', function() {

        beforeEach(function() {
          // error response
          $httpBackend.whenPOST('http://vms.app/api/auth/refresh_token')
            .respond(function() {
              return [400, {
                'error': 'token_expired'
              }];
            });
        });

      });

    });

  });

})();
