import { fail } from 'assert';
import { expect } from 'chai';
import createError from 'http-errors';
import { ensureParamExists } from './requestUtil';

describe('requestUtil', () => {
  describe('ensureParamExists', () => {
    it('should throw BadRequest error if parameter does not exist', () => {
      expect(() => ensureParamExists(
        'doesNotExist',
        { exists: 'exists' },
      ))
        .to
        .throw(createError.BadRequest);
    });

    it('should return if parameter is present', () => {
      try {
        ensureParamExists(
          'exists',
          { exists: 'exists' },
        );
      } catch (error) {
        fail('error thrown');
      }
    });
  });
});
