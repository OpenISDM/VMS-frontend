// (function() {
//   'use strict';
//
//   describe('authService', function() {
//     var vmsLocalStorageMock,
//       auth,
//       $httpBackend,
//       credentialsMock,
//       $rootScope,
//       BROADCAST_EVENTS_LIST,
//       authenticationFailureResponse = {
//         'message': 'Authentication failed',
//         'errors': [
//           {
//             'code': 'incorrect_login_credentials'
//           }
//         ]
//       },
//       authenticationSuccessResponse = {
//         'href': 'https://vms.app/api/users/me',
//         'auth_access_token': '123456'
//       },
//       failedCredentialsMock = {
//         'username': 'abc',
//         'password': 'LoloLo'
//       },
//       successfulCredentialsMock = {
//         'username': 'abc',
//         'password': 'aBc123456'
//       };
//
//     beforeEach(function() {
//       module('vmsFrontend');
//     });
//
//     // create a vmsLocalStorageMock
//     beforeEach(function() {
//       vmsLocalStorageMock = {
//         setJwt: jasmine.createSpy('setJwt'),
//         setUsername: jasmine.createSpy('setUsername'),
//         jwtExists: jasmine.createSpy('jwtExists')
//       };
//
//       module(function($provide) {
//         $provide.value('vmsLocalStorage', vmsLocalStorageMock);
//       });
//     });
//
//     // get services
//     beforeEach(inject(function(_auth_, _$httpBackend_, _$rootScope_, _BROADCAST_EVENTS_LIST_) {
//       auth = _auth_;
//       $httpBackend = _$httpBackend_;
//       $rootScope = _$rootScope_;
//       BROADCAST_EVENTS_LIST = _BROADCAST_EVENTS_LIST_;
//     }));
//
//     // Spy $rootScope.$broadcast()
//     beforeEach(function() {
//       spyOn($rootScope, '$broadcast').and.callThrough();
//     });
//
//     // mock $httpBackend
//     beforeEach(function() {
//       $httpBackend.whenPOST('http://vms.app/api/auth', failedCredentialsMock)
//         .respond(function(method, url, data) {
//           console.log('### 401 response ###');
//           return [401, authenticationFailureResponse];
//         });
//       $httpBackend.whenPOST('http://vms.app/api/auth', successfulCredentialsMock)
//         .respond(function(method, url, data) {
//           console.log('### 200 response ###');
//           return [200, authenticationSuccessResponse];
//         });
//       $httpBackend.whenPOST('http://vms.app/api/auth/refresh_token')
//         .respond(function(method, url, data) {
//           console.log('### 400 response ###');
//           return [400];
//         });
//     })
//
//     describe('authenticate() is called with successCallback', function() {
//       it('should set proper values into local storage', function() {
//         auth.authenticate(successfulCredentialsMock);
//         $httpBackend.flush();
//         expect(vmsLocalStorageMock.setJwt).toHaveBeenCalledWith('123456');
//         expect(vmsLocalStorageMock.setUsername).toHaveBeenCalledWith('abc');
//       });
//
//       // it('should broadcast a successful authentication event', function() {
//       //   auth.authenticate(successfulCredentialsMock);
//       //   $httpBackend.flush();
//       //   expect($rootScope.$broadcast).toHaveBeenCalledWith(BROADCAST_EVENTS_LIST.AUTHENTICATED_SUCCESS_EVENT);
//       // });
//
//       it('should set authenticated variable into true', function() {
//         auth.authenticate(successfulCredentialsMock);
//         $httpBackend.flush();
//         expect(auth.isAuthenticated()).toBe(true);
//         expect(vmsLocalStorageMock.jwtExists).not.toHaveBeenCalled();
//       });
//     });
//
//     describe('authenticate() is called with failureCallback', function() {
//       it('should set authenticated variable into false', function() {
//         console.log('== should set authenticated variable into false ==');
//         auth.authenticate(failedCredentialsMock);
//         $httpBackend.flush();
//         expect(auth.isAuthenticated()).toBe(false);
//         expect(vmsLocalStorageMock.setJwt).not.toHaveBeenCalled();
//       });
//
//       it('should broadcast a failed authentication event', function() {
//         console.log('== should broadcast a failed authentication event ==');
//         auth.authenticate(failedCredentialsMock);
//         $httpBackend.flush();
//         expect($rootScope.$broadcast).toHaveBeenCalledWith(BROADCAST_EVENTS_LIST.AUTHENTICATED_FAILURE_EVENT);
//       });
//     });
//
//     describe('the promise of the authenticate()', function() {
//       it('should call successful callback, when the deferred was resolved', function() {
//         var success = false;
//         var successfulCallback = function() {
//           success = true;
//         };
//         auth.authenticate(successfulCredentialsMock).then(successfulCallback);
//         $httpBackend.flush();
//         expect(success).toBe(true);
//       });
//
//       it('should call failed callback, when the deferred was rejected', function() {
//         console.log('== should call failed callback, when the deferred was rejected ==');
//         var failure = false;
//         var failedCallback = function() {
//           failure = true;
//         };
//         auth.authenticate(failedCredentialsMock).catch(failedCallback);
//         $httpBackend.flush();
//         expect(failure).toBe(true);
//       });
//     });
//   });
//
// })();
