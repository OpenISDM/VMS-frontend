(function() {
    'use strict';

    describe('navbar directive', function() {
        var element, $compile, $rootScope,
        validTemplate = '<vms-navbar></vms-navbar>';

        function createDirective() {
            return $compile(validTemplate)($rootScope);
        }

        function _inject() {
            inject(function (_$rootScope_, _$compile_) {
                $rootScope = _$rootScope_;
                $compile = _$compile_;
            });
        }

        beforeEach(module('vmsFrontend'));

        beforeEach(function (){
            _inject();

            element = createDirective();
            $rootScope.$digest();
        });

        it('should attach a navbar to the page', function() {
            expect(element.html()).toMatch('navbar navbar-default');
        });

    });
})();