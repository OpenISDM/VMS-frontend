(function() {
  'use strict';

  describe('authService', function() {
    var vmsLocalStorageMock,
      auth,
      $httpBackend,
      $rootScope,
      $state,
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
      _BROADCAST_EVENTS_LIST_, _$state_) {
      auth = _auth_;
      $httpBackend = _$httpBackend_;
      $rootScope = _$rootScope_;
      BROADCAST_EVENTS_LIST = _BROADCAST_EVENTS_LIST_;
      $state = _$state_;
    }));

    // Spy $rootScope.$broadcast()
    beforeEach(function() {
      spyOn($rootScope, '$broadcast').and.callThrough();
    });

    // mock $httpBackend
    beforeEach(function() {

      $httpBackend.whenPOST('http://vms.app/api/auth', failedCredentialsMock)
        .respond(function(method, url, data) {
          return [401, authenticationFailureResponse];
        });
      $httpBackend.whenPOST('http://vms.app/api/auth', successfulCredentialsMock)
        .respond(function(method, url, data) {
          return [200, authenticationSuccessResponse];
        });
      $httpBackend.whenPOST('http://vms.app/api/auth/refresh_token')
        .respond(function(method, url, data, headers) {
          return [400];
        });
    });

    afterEach(function() {
      $httpBackend = undefined;
    });

    describe('authenticate() is called with successCallback', function() {

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
        expect(vmsLocalStorageMock.jwtExists).not.toHaveBeenCalled();
      });
    });

    describe('authenticate() is called with failureCallback', function() {

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

      var vmsLocalStorage,
        authPrinciple;

      beforeEach(function() {
        // successful response
        $httpBackend.whenPOST('http://vms.app/api/auth/refresh_token', {}, {
          'Authorization': 'Bearer FooFooLolKerKer0O.'
        })
          .respond(function(method, url, data) {
            return [200, {}, {
              'Authorization': 'Bearer NFoofO0Lo1Kk.099'
            }];
          });
        // error response
        $httpBackend.whenPOST('http://vms.app/api/auth/refresh_token', {}, {
          'Authorization': 'Bearer 0000000000000'
        })
          .respond(function(method, url, data) {
            return [400, {
              'error': 'token_expired'
            }];
          });
      });

      // Get services
      beforeEach(inject(function(_authPrinciple_) {
        authPrinciple = _authPrinciple_;
      }));

      // Create spies for $state
      beforeEach(function() {
        $state.current.data = {
          data: jasmine.createSpy('needAuth').and.returnValue(true)
        };
      });

      // Create spies for authPrinciple
      beforeEach(function() {
        spyOn(authPrinciple, 'identity').and.returnValue(true);
      });

      describe('when refreshing token is successful', function() {

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

    });

  });

})();
