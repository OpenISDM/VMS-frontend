(function() {
  'use strict';

  describe('getById filter', function() {

    var getByIdFilter,
      mockData = [
        {
          id: 2,
          name: 'aoooO'
        },
        {
          id: 5,
          name: 'abC9O'
        },
        {
          id: 19,
          name: '6Dbddfd'
        }
      ];

    beforeEach(function() {
      module('vmsFrontend');
    });

    beforeEach(inject(function(_$filter_) {
      getByIdFilter = _$filter_('getById');
    }));

    describe('when it is found', function() {

      it('should return a correct element', function() {
        expect(getByIdFilter(mockData, 5)).toEqual({
          id: 5,
          name: 'abC9O'
        });
      });
    });

  });
})();
