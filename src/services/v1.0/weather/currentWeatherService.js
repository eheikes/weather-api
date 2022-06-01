import { getLogger } from 'log4js';

import { ensureParamExists } from '../../../utils/requestUtil';
import { getCurrentWeather } from '../../../openweathermap/currentWeather';
import { convertResponse } from '../../../utils/weatherResponseConverter';

const logger = getLogger();

export const currentWeatherService = async (params) => {
  // validate required parameters
  ensureParamExists(
    'lat',
    params,
  );
  ensureParamExists(
    'lon',
    params,
  );

  const currentWeather = await getCurrentWeather(
    params.lat,
    params.lon,
  );

  const convertedResponse = convertResponse(currentWeather);
  logger.debug(`Converted response: ${JSON.stringify(convertedResponse)}`);

  return convertedResponse;
};
