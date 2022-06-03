import axios from 'axios';
import { getLogger } from 'log4js';

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
  const weatherUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily&units=imperial&appid=${process.env.OPEN_WEATHER_API_KEY}`;
  logger.debug(`Requesting data from openweathermap weather api: ${weatherUrl}`);
  const apiResult = await axios.get(weatherUrl);
  logger.debug(`api result status:${(apiResult.status)} data:${JSON.stringify(apiResult.data)}`);

  return apiResult.data;
};
