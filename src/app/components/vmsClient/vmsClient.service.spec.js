(function() {
  'use strict';

  describe('vmsClient', function() {
    var httpBackend,
      vmsClient,
      apiBaseUrl;

    beforeEach(function() {
      module('vmsFrontend', 'vmsFrontend.mock');
    });

    beforeEach(inject(function(_vmsClient_, _$httpBackend_, _apiBaseUrl_) {
      vmsClient = _vmsClient_;
      httpBackend = _$httpBackend_;
      apiBaseUrl = _apiBaseUrl_;
    }));

    describe('with unauthorized request', function() {

      describe('register()', function() {
        var data,
          responseMock,
          headerMock;

        // get mock data
        beforeEach(inject(function(_registerVolunteerPostMock_,
          _registerSuccessfulResponseMock_, _unauthorizedHeaderMock_) {
          data = _registerVolunteerPostMock_;
          responseMock = _registerSuccessfulResponseMock_;
          headerMock = _unauthorizedHeaderMock_;
        }));

        it('should send a request successfully', function() {

          httpBackend.expectPOST(apiBaseUrl + '/register', data, headerMock).respond(201, responseMock);
          vmsClient.register(data).then(function(response) {
            expect(response.data).toEqual(responseMock);
          });
          httpBackend.flush();
        });
      });

      describe('login()', function() {
        var headerMock,
          data,
          responseMock;

        beforeEach(inject(function(_unauthorizedHeaderMock_,
          _correctCredentials_, _loginSuccessfulResponseMock_) {
          headerMock = _unauthorizedHeaderMock_;
          data = _correctCredentials_;
          responseMock = _loginSuccessfulResponseMock_;
        }));

        it('should send a request successfully', function() {
          httpBackend.expectPOST(apiBaseUrl + '/auth', data, headerMock).respond(responseMock);
          vmsClient.login(data).then(function(response) {
            expect(response.data).toEqual(responseMock);
          });
          httpBackend.flush();
        });
      });
    });

    // the begining of the authorized request
    describe('with authorized request', function() {

      var headerMock;

      beforeEach(inject(function(_authorizedHeaderMock_) {
        headerMock = _authorizedHeaderMock_;
      }));

      describe('logout()', function() {

        it('should send a request successfully', function() {
          httpBackend.expectDELETE(apiBaseUrl + '/auth', headerMock).respond(204);
          vmsClient.logout();
          httpBackend.flush();
        });
      });

      describe('emailVerification()', function() {
        var responseMock;

        beforeEach(inject(function(_emailVerificationSuccessfulResponseMock_) {
          responseMock = _emailVerificationSuccessfulResponseMock_;
        }));

        it('should send a request successfully', function() {

          httpBackend.expectGET(apiBaseUrl + '/email_verification/abc@abc.com/MYEMAIL1807', headerMock).respond(200, responseMock);
          vmsClient.emailVerification('abc@abc.com', 'MYEMAIL1807')
            .then(function(response) {
              expect(response.data).toEqual(responseMock);
            });
          httpBackend.flush();
        });
      });

      describe('getProfile()', function() {

        var responseMock;

        beforeEach(inject(function(_volunteerProfileMock_) {
          responseMock = _volunteerProfileMock_;
        }));

        it('should get volunteer profile successfully', function() {
          httpBackend.expectGET(apiBaseUrl + '/users/me', headerMock).respond(function() {
            return [200, responseMock];
          });
          vmsClient.getProfile(function(response) {
            expect(response.data).toEqual(responseMock);
          });
          httpBackend.flush();
        });
      });

      describe('refreshToken', function() {

        it('shoud refresh token successfully', function() {
          httpBackend.expectPOST(apiBaseUrl + '/auth/refresh_token')
            .respond(204);

          vmsClient.refreshToken();
          httpBackend.flush();
        });
      });

      describe('deleteAccount', function() {

        var data;

        beforeEach(inject(function(_correctCredentials_) {
          data = _correctCredentials_;
        }));

        it('should delete an account successfully', function() {
          httpBackend.expectPOST(apiBaseUrl + '/users/me/delete')
            .respond(204);

          vmsClient.deleteAccount(data);
        });
      });

    });
    // the end of the authorized request

  });
})();
