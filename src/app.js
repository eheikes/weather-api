import express from 'express';
import { getLogger } from 'log4js';
import swaggerJsdoc from 'swagger-jsdoc';
import {
  serveFiles,
  setup,
} from 'swagger-ui-express';

import { config } from './config';
import { currentWeatherService } from './routes/weather/currentWeatherService';
import { handleError } from './utils/errorHandler';
import { wrapRouteWithLoggingAndErrorHandling } from './utils/routeHelper';

// set up global config
config();

const logger = getLogger();
const app = express();

const openapiHeader = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Weather-api',
      version: '1.0.0',
    },
  },
  apis: ['./src/app.js'], // files containing annotations as above
};

/**
 * @openapi
 * components:
 *   schemas:
 *     CurrentWeather:
 *       type: object
 *       properties:
 *         currentTemperature:
 *           type: string
 *         currentCondition:
 *           type: string
 *         alerts:
 *           type: array
 *           items:
 *             type: string
 * /weather/current:
 *   get:
 *     description: Get current weather
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: lat
 *         in: query
 *         type: number
 *         description: The latitude to search
 *       - name: lon
 *         in: query
 *         type: number
 *         description: The longitude to search
 *     responses:
 *       200:
 *         description: CurrentWeather
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CurrentWeather'
 */
app.get(
  '/weather/current',
  wrapRouteWithLoggingAndErrorHandling(currentWeatherService),
);

// Configure express to serve our openapi doc and swagger ui
const openapiSpecification = swaggerJsdoc(openapiHeader);
const options = {
  swaggerOptions: {
    url: '/api-docs/openapi.json',
  },
};
app.get(
  '/api-docs/openapi.json',
  (
    req,
    res,
  ) => res.json(openapiSpecification),
);
app.use(
  '/api-docs',
  serveFiles(
    null,
    options,
  ),
  setup(
    null,
    options,
  ),
);

// register the error handler with express
app.use(handleError);

// start the express listener on the configured port
app.listen(process.env.PORT, () => {
  logger.info(`weather-api listening on port ${process.env.PORT}`);
});
