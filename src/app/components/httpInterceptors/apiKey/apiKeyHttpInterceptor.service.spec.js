(function() {
  'use strict';

  describe('apiKeyHttpInterceptor service', function() {
    var apiKeyHttpInterceptor,
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

    beforeEach(inject(function(_apiKeyHttpInterceptor_) {
      apiKeyHttpInterceptor = _apiKeyHttpInterceptor_;
    }));

    it('should contain API key in the X-VMS-API-Key of the HTTP header', function() {
      expect(apiKeyHttpInterceptor.request(configMock).headers).toEqual(jasmine.objectContaining({
        'X-VMS-API-Key': 'fooWaHahAQQ'
      }));
    });

  });
})();
