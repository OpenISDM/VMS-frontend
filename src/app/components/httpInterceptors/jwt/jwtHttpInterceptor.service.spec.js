(function() {
  'use strict';

  describe('jwtHttpInterceptor service', function() {
    var jwtHttpInterceptor,
      stateMock,
      authPrincipleMock,
      vmsLocalStorageMock,
      configMock;

    beforeEach(function() {
      module('vmsFrontend');
    });

    beforeEach(function() {
      authPrincipleMock = {
        identity: function() {}
      },
      vmsLocalStorageMock = {
        getJwt: function() {},
        jwtExists: function() {}
      }
      configMock = {
        headers: {}
      }
    });

    describe('when the state need to be authenticated', function() {

      beforeEach(function() {
        stateMock = {
          current: {
            data: {
              needAuth: true
            }
          }
        };

        module(function($provide) {
          $provide.value('$state', stateMock);
        });
      });

      describe('it was authenticated', function() {

        // create a spy
        beforeEach(function() {
          spyOn(authPrincipleMock, 'identity').and.returnValue('true');

          module(function($provide) {
            $provide.value('authPrinciple', authPrincipleMock);
          });
        });

        describe('with JWT in local storage', function() {

          // create a spy
          beforeEach(function() {
            spyOn(vmsLocalStorageMock, 'getJwt').and.returnValue('Bearer fooFoofooKerKer');
            spyOn(vmsLocalStorageMock, 'jwtExists').and.returnValue(true);

            module(function($provide) {
              $provide.value('vmsLocalStorage', vmsLocalStorageMock);
            });
          });

          // get service
          beforeEach(inject(function(_jwtHttpInterceptor_) {
            jwtHttpInterceptor = _jwtHttpInterceptor_;
          }));

          it('should add JWT into Authorization field in the HTTP header', function() {
            expect(jwtHttpInterceptor.request(configMock).headers).toEqual(jasmine.objectContaining({
              Authorization: 'Bearer fooFoofooKerKer'
            }));
          });
        });

        describe('without JWT in local storage', function() {

          // create a spy
          beforeEach(function() {
            spyOn(vmsLocalStorageMock, 'getJwt').and.returnValue(false);
            spyOn(vmsLocalStorageMock, 'jwtExists').and.returnValue(false);

            module(function($provide) {
              $provide.value('vmsLocalStorage', vmsLocalStorageMock);
            });
          });

          // get service
          beforeEach(inject(function(_jwtHttpInterceptor_) {
            jwtHttpInterceptor = _jwtHttpInterceptor_;
          }));

          it('should not contain JWT in Authorization field of the HTTP header', function() {
            expect(jwtHttpInterceptor.request(configMock).headers).not.toEqual(jasmine.objectContaining({
              Authorization: 'Bearer fooFoofooKerKer'
            }));
          });
        });
      });
    });

  // describe('when the state does not need to be authenticated', function() {
  //   beforeEach(function() {
  //     stateMock = {
  //       current: {
  //         data: {
  //           needAuth: false
  //         }
  //       }
  //     };
  //
  //     module(function($provide) {
  //       $provide.value('$state', stateMock);
  //     });
  //   });
  //
  //   it('should not contain JWT in Authorization field of the HTTP header', function() {
  //     expect(jwtHttpInterceptor.request(configMock).headers).not.toEqual(jasmine.objectContaining({
  //       Authorization: 'Bearer fooFoofooKerKer'
  //     }));
  //   });
  // });
  });
})();
