import { getLogger } from 'log4js';

const logger = getLogger();

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
