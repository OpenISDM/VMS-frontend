(function() {
  'use strict';

  describe('arrayHelpersService', function() {

    var arrayHelpersService;

    beforeEach(module('vmsFrontend'));

    beforeEach(inject(function(_arrayHelpersService_) {
      arrayHelpersService = _arrayHelpersService_
    }));

    describe('getExistingIndexes()', function() {

      var origin,
        update;

      beforeEach(function() {
        origin = [
          {
            name: 'aO0oOFoO'
          },
          {
            name: 'bBoOb000'
          },
          {
            name: 'Cc0oOO'
          },
          {
            name: 'dDDDoO0000'
          }
        ];

        update = [
          {
            name: 'bBoOb000'
          },
          {
            name: 'AaAAaAAA'
          },
          {
            name: 'Cc0oOO'
          },
          {
            name: 'GGFooOOFOL'
          },
          {
            name: 'LolLoL0L'
          },
          {
            name: 'QQQ00QQQQOOOO0'
          }
        ];
      });

      it('should return correct exsiting indexes', function() {
        var existingIndexes = arrayHelpersService.getExistingIndexes(origin, update);
        expect([0, 2]).toEqual(existingIndexes);
      });
    });
  });
})();
