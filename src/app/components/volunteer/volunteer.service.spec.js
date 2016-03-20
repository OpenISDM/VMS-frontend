(function() {
  'use strict';
  /**
   * @todo Complete the test
   * This example is not perfect.
   * Test should check if MomentJS have been called
   */
  describe('volunteer service', function() {
    var volunteerService,
      $httpBackend;

    function createService() {
      inject(function($injector) {
        volunteerService = $injector.get('volunteer');
      });
    }

    beforeEach(function() {
      module('vmsFrontend', 'vmsFrontend.mock');
    });

    beforeEach(function() {
      createService();
    });

    describe('getProfile() function with successful response', function() {
      var responseMock,
        $rootScope;

      function _inject() {
        inject(function($injector) {
          $httpBackend = $injector.get('$httpBackend');
          $rootScope = $injector.get('$rootScope');
          responseMock = $injector.get('volunteerProfileMock');
        });
      }

      beforeEach(function() {
        _inject();
      });

      it('should get correct profile', function() {
        $httpBackend.expectGET('http://vms.app/api/users/me').respond(function() {
          return [200, responseMock];
        });
        var successCallback = jasmine.createSpy('success');
        volunteerService.getProfile().then(successCallback);
        $httpBackend.flush();
        $rootScope.$digest();

        var profile = successCallback.calls.mostRecent().args[0];
        expect(successCallback).toHaveBeenCalled();
        expect(profile.city.name_zh_tw).toEqual('臺北市');
        expect(profile.avatar_url).toEqual('https://vms.app/upload/image/avatar/jimlin_366b4c757bff8643b9f97441a974d94d42f5877b.jpeg');
      });
    });

  // describe('update()', function() {
  //
  //   it('should update profile successfully', function() {});
  //
  // });
  });
})();
