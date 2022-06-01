import createError from 'http-errors';

/**
 * Validates that the parameter specified exists and if not throws a BadRequest error (status 400)
 * @param expectedParamName
 * @param params
 */
export const ensureParamExists = (
  expectedParamName,
  params,
) => {
  if (!params[expectedParamName]) {
    throw new createError.BadRequest(
      `Required parameter ${expectedParamName} not specified`,
    );
  }
};
