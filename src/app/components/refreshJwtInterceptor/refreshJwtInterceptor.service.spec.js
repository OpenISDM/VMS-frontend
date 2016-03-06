(function() {
  'use strict';

  describe('refreshJwtInterceptor', function() {
    var authMock,
      $q,
      $httpBackend,
      $state,
      response,
      refreshJwtInterceptor,
      apiBaseUrl = 'http://fake.vms.app/api';

    beforeEach(function() {
      module('vmsFrontend');
    });

    describe('when the reponse status is 401', function() {

      // create a fake response
      beforeEach(function() {
        response = {
          status: 401,
          config: {
            method: 'GET',
            url: apiBaseUrl + '/my_endpoint',
            headers: {
              Authorization: 'FakeKeRKEr'
            }
          }
        }
      });

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
            }
          };

          module(function($provide) {
            $provide.value('auth', authMock);
          });
        });

        // get dependencies
        beforeEach(inject(function(_refreshJwtInterceptor_, _$httpBackend_) {
          refreshJwtInterceptor = _refreshJwtInterceptor_;
          $httpBackend = _$httpBackend_;
        }));

        it('should request again with the refreshed JWT', function() {
          $httpBackend.expectGET(apiBaseUrl + '/my_endpoint', {
            'Authorization': 'Bearer fooOpenFoO',
            'Accept': 'application/json, text/plain, */*'
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
        beforeEach(inject(function(_refreshJwtInterceptor_, _$q_, _$state_) {
          refreshJwtInterceptor = _refreshJwtInterceptor_;
          $q = _$q_;
          $state = _$state_;
        }));

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

    describe('and the response status is not 401', function() {});
  });
})();
