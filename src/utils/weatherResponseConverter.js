// Temperature thresholds are defined in Fahrenheit and temp is considered in threshold if the temp
// is greater than or equal to the min and less than max.
const TEMPERATURE_THRESHOLDS = [
  {
    name: 'hot',
    min: 85,
    max: Number.MAX_VALUE,
  },
  {
    name: 'moderate',
    min: 50,
    max: 85,
  },
  {
    name: 'cold',
    min: Number.MIN_VALUE,
    max: 50,
  },
];

/**
 * Determines the temperature threshold string based on the min/max thresholds
 * @param temp
 * @returns {*|string}
 */
export const tempToString = (temp) => {
  const tempThreshold = TEMPERATURE_THRESHOLDS
    .find((threshold) => temp >= threshold.min && temp < threshold.max);

  return tempThreshold
    ? tempThreshold.name
    : 'unknown';
};

/**
 * Converts alerts to a simpler format which includes the event type and description
 * @param alerts
 * @returns {*}
 */
export const simplifyAlerts = (alerts) => (alerts
  ? alerts.map((alert) => `${alert.event}: ${alert.description}`)
  : undefined
);

/**
 * Convert the openweathermap api response into the expected simplified response structure
 * @param weatherData
 * @returns {{alerts, currentTemperature: string, currentCondition: string}}
 */
export const convertResponse = (weatherData) => ({
  currentCondition: weatherData.current.weather[0].main.toLowerCase(),
  currentTemperature: tempToString(weatherData.current.temp),
  alerts: simplifyAlerts(weatherData.alerts),
});
