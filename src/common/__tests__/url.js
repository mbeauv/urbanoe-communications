import { Map } from 'immutable';
import { url } from '../url';


describe('url', () => {
  describe('url', () => {
    it('works with null', () => {
      expect(url(null)).toEqual(null);
    });

    it('works with null with empty args', () => {
      expect(url(null, {})).toEqual(null);
    });

    it('works with undefined args', () => {
      expect(url('test')).toEqual('test');
    });

    it('works with value with null args', () => {
      expect(url('test', null)).toEqual('test');
    });

    it('works with value and empty args', () => {
      expect(url('test', Map())).toEqual('test');
    });

    it('works with on arg', () => {
      expect(url('test', Map({ one: 'ONE' }))).toEqual('test?one=ONE');
    });

    it('works with two args', () => {
      expect(url('test', Map({ one: 'ONE', two: 'TWO' }))).toEqual('test?one=ONE&two=TWO');
    });
  });
});
