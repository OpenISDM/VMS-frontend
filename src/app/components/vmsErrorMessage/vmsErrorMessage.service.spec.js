(function() {
  'use strict';
  /**
   * @todo Complete the test
   * This example is not perfect.
   * Test should check if MomentJS have been called
   */
  describe('vmsErrorMessage service', function() {
    var vmsErrorMessageService;

    function createService() {
      inject(function($injector) {
        vmsErrorMessageService = $injector.get('vmsErrorMessage');
      });
    }

    beforeEach(function() {
      module('vmsFrontend');
    });

    beforeEach(function() {
      createService();
    });

    describe('fieldMsg() function', function() {
      it('should transform array into string', function() {
        var error = {
          fields: ['abc1', 'abc2', 'abc3']
        };
        var fieldMsg = vmsErrorMessageService.fieldMsg(error);
        expect(fieldMsg).toEqual('abc1, abc2, abc3');
      });
    });

    describe('getErrorMsg() function', function() {
      var errorsMock;

      function createErrorMock() {
        errorsMock = [{
          "fields": ["username", "password"],
          "code": "missing_field"
        }];
      }

      beforeEach(function() {
        createErrorMock();
      });

      it('should get error message', function() {
        var errorMsg = vmsErrorMessageService.getErrorMsg(errorsMock);
        expect(errorMsg).toEqual('未輸入的 username, password');
      });
    })
  });
})();
