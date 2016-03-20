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
          'aO0oOFoO',
          'bBoOb000',
          'Cc0oOO',
          'dDDDoO0000'
        ];

        update = [
          'bBoOb000',
          'AaAAaAAA',
          'Cc0oOO',
          'GGFooOOFOL',
          'LolLoL0L',
          'Q.QQQ00QQQQOOOO0'
        ];
      });

      it('should return correct exsiting indexes', function() {
        var existingIndexes = arrayHelpersService.getExistingIndexes(origin, update);
        expect(existingIndexes).toEqual([
          0,
          2
        ]);
      });
    });
  });
})();
