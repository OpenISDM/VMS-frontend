(function() {
    'use strict';
    /**
     * @todo Complete the test
     * This example is not perfect.
     * Test should check if MomentJS have been called
     */
    describe('jwtLocalStorage', function() {
        var jwtLocalStorage, localStorageServiceMock;
       
        beforeEach(function() {
            module('vmsFrontend');
        });

        beforeEach(function() {
            localStorageServiceMock = {
                set: jasmine.createSpy('set').and.returnValue(true),
                get: jasmine.createSpy('get').and.returnValue('abc1234JWT'),
                remove: jasmine.createSpy('remove').and.returnValue(true),
                keys: jasmine.createSpy('keys').and.returnValue(['tokenKey']),
            };

            module(function($provide) {
                $provide.value('localStorageService', localStorageServiceMock);
            });
        });

        beforeEach(inject(function($injector) {
            jwtLocalStorage = $injector.get('jwtLocalStorage');
        }));

        it('should store jwt string into local storage', function() {
            expect(jwtLocalStorage.set('abc1234JWT')).toBe(true);
            expect(localStorageServiceMock.set).toHaveBeenCalledWith('jwt_token', 'abc1234JWT');
        });
        it('should get jwt string from local storage', function() {
            expect(jwtLocalStorage.get()).toEqual('abc1234JWT');
            expect(localStorageServiceMock.get).toHaveBeenCalled();
        });
        it('should remove jwt string from local storage', function() {
            expect(jwtLocalStorage.remove()).toEqual(true);
        });
    });
})();