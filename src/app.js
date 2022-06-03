import express from 'express';
import { getLogger } from 'log4js';

import { config } from './config';
import { currentWeatherService } from './routes/weather/currentWeatherService';
import { handleError } from './utils/errorHandler';
import { wrapRouteWithLoggingAndErrorHandling } from './utils/routeHelper';

// set up global config
config();

const logger = getLogger();
const app = express();

// Adds the current weather route to the express app
app.get(
  '/weather/current',
  wrapRouteWithLoggingAndErrorHandling(currentWeatherService),
);

// register the error handler with express
app.use(handleError);

// start the express listener on the configured port
app.listen(process.env.PORT, () => {
  logger.info(`weather-api listening on port ${process.env.PORT}`);
});
