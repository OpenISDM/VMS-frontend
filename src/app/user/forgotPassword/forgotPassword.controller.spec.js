(function() {
  'use strict';

  describe('ForgotPasswordController', function() {

    var vm,
      $log,
      userPassword;

    beforeEach(module('vmsFrontend'));

    beforeEach(inject(function(
      _$log_,
      _userPassword_
    ) {
      $log = _$log_;
      userPassword = _userPassword_;
    }));


    describe('in vm.submit()', function() {

      describe('userPassword.forgotPassword()', function() {

        it('should receive correct paramters', function() {});

      });

      describe('when userPassword.forgotPassword() is resolveed', function() {

        it('should get a success alert', function() {});

      });

    });
  });

})();
