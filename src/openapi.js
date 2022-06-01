export const apiDoc = openapi({
  openapi: '3.0.0',
  info: {
    title: 'Weather-Api',
    description: 'The weather-api project exposes a Rest Api which proxies requests to the openweathermap apis to retrieve the weather for\n' +
      'a given lat/lon.',
    version: '1.0.0',
  },
  definitions: {
    Weather: {
      type: 'object',
      properties: {
        currentCondition: {
          description: 'String description of current weather condition',
          type: 'string'
        },
        currentTemperature: {
          description: 'String description of current temperature',
          type: 'string',
        },
        alerts: {
          description: 'Array of current weather alerts',
          type: 'array',
        }
      },
      required: [
        'currentCondition',
        'currentTemperature',
      ],
    }
  },
  paths: {}
});
