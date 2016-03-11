(function() {
  'use strict';

  describe('jwtInjector service', function() {
    var apiKeyInjector,
      apiKeyMock,
      configMock;

    beforeEach(function() {
      module('vmsFrontend');
    });

    beforeEach(function() {
      configMock = {
        headers: {}
      };
    });

    beforeEach(function() {
      apiKeyMock = 'fooWaHahAQQ';

      module(function($provide) {
        $provide.constant('apiKey', apiKeyMock);
      })
    });

    beforeEach(inject(function(_apiKeyInjector_) {
      apiKeyInjector = _apiKeyInjector_;
    }));

    it('should contain API key in the X-VMS-API-Key of the HTTP header', function() {
      expect(apiKeyInjector.request(configMock).headers).toEqual(jasmine.objectContaining({
        'X-VMS-API-Key': 'fooWaHahAQQ'
      }));
    });

  });
})();
