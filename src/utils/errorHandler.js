import { getLogger } from 'log4js';

const logger = getLogger();

/**
 * Process and return the error via the Express response object
 * @param error
 * @param req
 * @param res
 * @param next
 */
// eslint-disable-next-line no-unused-vars
export const handleError = (error, req, res, next) => {
  logger.debug(`Processing error: ${JSON.stringify(error)}`);
  res.header(
    'Content-Type',
    'application/json',
  );
  res.status(error.statusCode);
  res.send(error);
};
