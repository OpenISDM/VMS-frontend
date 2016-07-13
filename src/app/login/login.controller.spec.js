(function() {
  'use strict';

  describe('LoginController', function() {

    var vm,
      $controller,
      $log,
      userAuthentication,
      $rootScope,
      $state;

    beforeEach(module('vmsFrontend'));

    beforeEach(inject(function(_$controller_, _$log_, _userAuthentication_, _$rootScope_,
      _$state_) {
      $controller = _$controller_;
      $log = _$log_;
      userAuthentication = _userAuthentication_;
      $rootScope = _$rootScope_.$new();
      $state = _$state_;
    }));

    describe('login()', function() {

      describe('when calling onSuccess()', function() {

        // mock userAuthentication.login() and $state.go()
        beforeEach(function() {
          spyOn(userAuthentication, 'login').and.callFake(function() {
            return {
              then: function(onSuccess) {
                onSuccess();

                return {
                  catch: jasmine.createSpy('catch')
                };
              }
            };
          });
          spyOn($state, 'go');
        });

        describe('the next state is login', function() {

          // Mock $rootScope.toState.name
          beforeEach(function() {
            $rootScope['toState'] = {
              name: 'login'
            };
          });

          beforeEach(function() {
            vm = $controller('LoginController', {
              $log: $log,
              userAuthentication: userAuthentication,
              $rootScope: $rootScope,
              $state: $state
            });
          });

          beforeEach(function() {
            vm['credentials'] = {
              username: 'abc1',
              password: 'FoOF0oooo0000'
            };
          });

          it('should go to profile state', function() {
            vm.login();
            expect($state.go).toHaveBeenCalledWith('profile');
          });

          afterEach(function() {
            vm = undefined;
          });
        });

        describe('the next state is not login', function() {

          // mock $rootScope.toState.name
          beforeEach(function() {
            $rootScope['toState'] = {
              name: 'foo'
            };
          });

          beforeEach(function() {
            vm = $controller('LoginController', {
              $log: $log,
              userAuthentication: userAuthentication,
              $rootScope: $rootScope,
              $state: $state
            });
          });

          beforeEach(function() {
            vm['credentials'] = {
              username: 'abc1',
              password: 'FoOF0oooo0000'
            };
          });

          it('should go to next state', function() {
            vm.login();
            expect($state.go).toHaveBeenCalledWith('foo');
          });

        });

      });

      describe('when calling onFailure()', function() {

        // mock userAuthentication.login() and $state.go()
        beforeEach(function() {
          spyOn(userAuthentication, 'login').and.callFake(function() {
            return {
              then: function() {

                return {
                  catch: function(onFailure) {
                    onFailure({
                      status: 401
                    });
                  }
                };
              }
            };
          });
        });

        beforeEach(function() {
          vm = $controller('LoginController', {
            $log: $log,
            userAuthentication: userAuthentication,
            $rootScope: $rootScope,
            $state: $state
          });
        });

        beforeEach(function() {
          vm['credentials'] = {
            username: 'abc1',
            password: 'FoOF0oooo0000'
          };
        });

      });
    });
  });
})();
