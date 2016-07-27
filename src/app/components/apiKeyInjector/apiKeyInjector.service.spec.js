(function() {
  'use strict';

  describe('apiKeyInjector service', function() {
    var apiKeyInjector,
      configConstantMock,
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
      configConstantMock = {
        apiKey: 'fooWaHahAQQ'
      };

      module(function($provide) {
        $provide.constant('config', configConstantMock);
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
