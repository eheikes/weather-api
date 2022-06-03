import { getLogger } from 'log4js';

const logger = getLogger();

/**
 * Wrap the given route function with logging and error handling
 * @param service
 * @returns {Promise<(function(*, *, *): Promise<void>)|*>}
 */
export const wrapRouteWithLoggingAndErrorHandling = (service) => async (
  req,
  res,
  next,
) => {
  logger.debug(`Received request for url:${req.url} params:${JSON.stringify(req.query)}`);
  try {
    res.send(await service(req.query));
  } catch (error) {
    logger.error(`Passing error ${JSON.stringify(error)} to express.`);
    next(error);
  }
};
