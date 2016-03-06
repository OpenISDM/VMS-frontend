(function() {
  'use strict';

  describe('vmsLocalStorage', function() {
    var vmsLocalStorage,
      LOCAL_STORAGE_CONFIG,
      localStorageServiceMock;

    beforeEach(function() {
      module('vmsFrontend');
    });

    beforeEach(function() {
      localStorageServiceMock = {
        set: jasmine.createSpy('set').and.returnValue(true),
        get: jasmine.createSpy('get').and.returnValue('abc1234JWT'),
        remove: jasmine.createSpy('remove').and.returnValue(true),
        keys: jasmine.createSpy('keys').and.returnValue(['tokenKey'])
      };

      module(function($provide) {
        $provide.value('localStorageService', localStorageServiceMock);
      });
    });

    beforeEach(inject(function($injector) {
      vmsLocalStorage = $injector.get('vmsLocalStorage');
      LOCAL_STORAGE_CONFIG = $injector.get('LOCAL_STORAGE_CONFIG');
    }));

    it('should store jwt string into local storage', function() {
      expect(vmsLocalStorage.setJwt('abc1234JWT')).toBe(true);
      expect(localStorageServiceMock.set).toHaveBeenCalledWith(LOCAL_STORAGE_CONFIG.keys.jwt, 'abc1234JWT');
    });
    it('should get jwt string from local storage', function() {
      expect(vmsLocalStorage.getJwt()).toEqual('abc1234JWT');
      expect(localStorageServiceMock.get).toHaveBeenCalledWith(LOCAL_STORAGE_CONFIG.keys.jwt);
    });
    it('should remove jwt string from local storage', function() {
      expect(vmsLocalStorage.removeJwt()).toEqual(true);
    });
  });
})();
