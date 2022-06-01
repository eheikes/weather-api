import axios from 'axios';
import { getLogger } from 'log4js';
import createError from 'http-errors';
import { v4 as uuidv4 } from 'uuid';

const logger = getLogger();

/**
 * Retrieves the current weather data from the openweathermap rest api
 * @param lat
 * @param lon
 * @returns {Promise<*>}
 */
export const getCurrentWeather = async (
  lat,
  lon,
) => {
  try {
    const weatherUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily&units=imperial&appid=${process.env.OPEN_WEATHER_API_KEY}`;
    logger.debug(`Requesting data from openweathermap weather api: ${weatherUrl}`);
    const apiResult = await axios.get(weatherUrl);
    logger.debug(`api result status:${(apiResult.status)} data:${JSON.stringify(apiResult.data)}`);

    if (apiResult.status !== 200) {
      throw new Error(`Openweathermap api call failed with status ${apiResult.status}`);
    }

    return apiResult.data;
  } catch (error) {
    const errorUuid = uuidv4();
    logger.error(`Encountered unexpected error ${errorUuid}: ${error}`);
    throw createError.InternalServerError(`Unexpected error occurred. Review logs for details of error ${errorUuid}`);
  }
};
