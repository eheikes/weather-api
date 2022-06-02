import { getLogger } from 'log4js';
import { isHttpError } from 'http-errors';
import { v4 as uuidv4 } from 'uuid';

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

  if (isHttpError(error)) {
    // if the error is a http error then use the status and message from the error
    res.send(error);
    res.status(error.statusCode);
  } else {
    // if the error was not a http error then log it, but return a 500 instead
    const errorUuid = uuidv4();
    logger.error(`Encountered unexpected error ${errorUuid}: ${error}`);
    res.status(500);
    res.send(JSON.stringify({ message: `Unexpected error occurred. Review logs for details of error ${errorUuid}` }));
  }
};
