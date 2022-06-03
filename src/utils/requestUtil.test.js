import { fail } from 'assert';
import { ensureParamExists } from './requestUtil';

describe('requestUtil', () => {
  describe('ensureParamExists', () => {
    it('should throw BadRequest error if parameter does not exist', () => {
      try {
        ensureParamExists(
          'doesNotExist',
          {},
        );
        fail('Error not thrown');
      } catch (e) {
        // expected
      }
    });

    it('should throw BadRequest error if parameter exists with null data', () => {
      try {
        ensureParamExists(
          'exists',
          { exists: null },
        );
        fail('Error not thrown');
      } catch (e) {
        // expected
      }
    });

    it('should not throw error if parameter is present', () => {
      ensureParamExists(
        'exists',
        { exists: 'exists' },
      );
    });
  });
});
