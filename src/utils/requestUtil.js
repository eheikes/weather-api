import createError from 'http-errors';

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
