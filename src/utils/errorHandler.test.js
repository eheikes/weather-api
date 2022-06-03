import { expect } from 'chai';
import createError from 'http-errors';
import { handleError } from './errorHandler';

const mockResponse = () => {
  const res = {};
  // eslint
  res.header = (headerName, headerValue) => (res.header = {
    headerName,
    headerValue,
  });
  res.status = (status) => (res.status = status);
  res.send = (body) => (res.body = body);
  return res;
};

describe('errorHandler', () => {
  describe('handleError', () => {
    it('returns json error', () => {
      const testError = createError.BadRequest('this was a bad request');
      const req = {};
      const res = mockResponse();
      handleError(testError, req, res);

      expect(res.header).to.eql({
        headerName: 'Content-Type',
        headerValue: 'application/json',
      });
      expect(res.status).to.eql(400);
      expect(res.body.message).to.equal('this was a bad request');
    });

    it('returns unexpected error', () => {
      const testError = new Error('unexpected error');
      const req = {};
      const res = mockResponse();
      handleError(testError, req, res);

      expect(res.header).to.eql({
        headerName: 'Content-Type',
        headerValue: 'application/json',
      });
      expect(res.status).to.eql(500);
    });
  });
});
