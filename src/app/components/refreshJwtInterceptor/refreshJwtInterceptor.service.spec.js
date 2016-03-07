(function() {
  'use strict';

  describe('refreshJwtInterceptor', function() {
    var authMock,
      $q,
      $httpBackend,
      $state,
      response,
      refreshJwtInterceptor,
      apiKey,
      apiBaseUrl = 'http://fake.vms.app/api',
      isAuthenticated;

    beforeEach(function() {
      module('vmsFrontend');
    });

    describe('when the reponse status is 401', function() {

      // create a fake response
      function createFakeResponse() {
        response = {
          status: 401,
          config: {
            method: 'GET',
            url: apiBaseUrl + '/my_endpoint',
            headers: {
              'Authorization': 'FakeKeRKEr',
              'X-VMS-API-Key': apiKey
            }
          }
        }
      }

      describe('auth.isAuthenticated() is true', function() {
        isAuthenticated = true;

        describe('and the refreshing token is successful', function() {

          // Mock auth service
          beforeEach(function() {
            authMock = {
              refreshToken: function() {

                return {

                  then: function(successCallback) {
                    successCallback('fooOpenFoO');

                    return {

                      catch: function(failureCallback) {
                        //failureCallback();
                      }
                    };
                  }
                };
              },
              isAuthenticated: function() {
                return isAuthenticated;
              }
            };

            module(function($provide) {
              $provide.value('auth', authMock);
            });
          });

          // get dependencies
          beforeEach(inject(function(_refreshJwtInterceptor_, _$httpBackend_, _apiKey_) {
            refreshJwtInterceptor = _refreshJwtInterceptor_;
            $httpBackend = _$httpBackend_;
            apiKey = _apiKey_
          }));

          beforeEach(createFakeResponse());

          it('should request again with the refreshed JWT', function() {
            $httpBackend.expectGET(apiBaseUrl + '/my_endpoint', {
              'Authorization': 'Bearer fooOpenFoO',
              'Accept': 'application/json, text/plain, */*',
              'X-VMS-API-Key': 'QLolLOlFooFooFooFoo'
            }).respond({
              'message': 'fakeerrr'
            });
            refreshJwtInterceptor.responseError(response);
            $httpBackend.flush();
          });
        });

        describe('and the refreshing token is failed', function() {

          // Mock auth service for calling failure callback
          beforeEach(function() {
            authMock = {
              refreshToken: function() {

                return {

                  then: function(successCallback) {
                    // successCallback('fooOpenFoO');

                    return {

                      catch: function(failureCallback) {
                        failureCallback();
                      }
                    };
                  }
                };
              }
            };

            module(function($provide) {
              $provide.value('auth', authMock);
            });
          });

          // get dependencies
          beforeEach(inject(function(_refreshJwtInterceptor_, _$q_, _$state_,
            _apiKey_) {
            refreshJwtInterceptor = _refreshJwtInterceptor_;
            $q = _$q_;
            $state = _$state_;
            apiKey = _apiKey_;
          }));

          beforeEach(createFakeResponse());

          // create spies for $q
          beforeEach(function() {
            var deferredMock = {
              resolve: jasmine.createSpy('resolve'),
              reject: jasmine.createSpy('reject'),
              promise: {
                then: jasmine.createSpy('then')
              }
            };

            spyOn($q, 'defer').and.returnValue(deferredMock);
          });

          // create a spy for $state
          beforeEach(function() {
            spyOn($state, 'go').and.callThrough();
          });

          it('should go login state', function() {
            refreshJwtInterceptor.responseError(response);
            expect($state.go).toHaveBeenCalledWith('login');
          });
        });
      });

      describe('auth.isAuthenticated() is false', function() {

        isAuthenticated = false

        beforeEach(function() {
          authMock = {
            isAuthenticated: function() {
              return isAuthenticated;
            }
          }

          module(function($provide) {
            $provide.value('auth', authMock);
          });
        });

        // get services
        beforeEach(inject(function(_refreshJwtInterceptor_, _$q_, _apiKey_) {
          refreshJwtInterceptor = _refreshJwtInterceptor_;
          $q = _$q_;
          apiKey = _apiKey_;
        }));

        beforeEach(createFakeResponse());

        // create a spy on $q service
        beforeEach(function() {
          spyOn($q, 'reject');
        });

        it('should reject the promise', function() {
          refreshJwtInterceptor.responseError(response);
          expect($q.reject).toHaveBeenCalledWith(response);
        });

      });

    });


    describe('and the response status is not 401', function() {

      // create a fake response
      function createFakeResponse() {
        response = {
          status: 400
        };
      }

      describe('auth.isAuthenticated() is true', function() {

        var $q;
        isAuthenticated = true;

        // mock the auth service and response
        beforeEach(function() {
          authMock = {
            isAuthenticated: function() {
              return isAuthenticated;
            }
          };

          module(function($provide) {
            $provide.value('auth', authMock);
          });

          createFakeResponse();
        });

        // get services
        beforeEach(inject(function(_refreshJwtInterceptor_, _$q_) {
          refreshJwtInterceptor = _refreshJwtInterceptor_;
          $q = _$q_;
        }));

        // create a spy on $q service
        beforeEach(function() {
          spyOn($q, 'reject');
        });

        it('should reject the promise', function() {
          refreshJwtInterceptor.responseError(response);
          expect($q.reject).toHaveBeenCalledWith(response);
        });
      });
    });
  });
})();
