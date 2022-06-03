import { expect } from 'chai';
import { wrapRouteWithLoggingAndErrorHandling } from './routeHelper';

describe('routeHelper', () => {
  describe('wrapRouteWithLoggingAndErrorHandling', () => {
    it('should call next with errors', async () => {
      const mockError = new Error('mock error');
      const mockServiceFunction = () => {
        throw mockError;
      };
      const wrappedFunction = wrapRouteWithLoggingAndErrorHandling(mockServiceFunction);

      let errorCaught;
      await wrappedFunction(
        {},
        {},
        (error) => {
          expect(error).to.equal(mockError);
          errorCaught = true;
        },
      );
      expect(errorCaught).to.equal(true);
    });
  });
});
