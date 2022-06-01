import express from 'express';
import { getLogger } from 'log4js';

import { config } from './config';
import {api, currentWeatherService} from './services/v1.0/weather/currentWeatherService';
import { handleError } from './utils/errorHandler';
import {apiDoc} from "./openapi";

// set up global config
config();

const logger = getLogger();
const app = express();

initialize({
  app,
  apiDoc: apiDoc,
  dependencies: {
    currentWeatherService: currentWeatherService,
  },
  paths: './routes/v1.0'
});

app.get('/v1.0/weather/current', async (req, res, next) => {
  logger.debug(`Received request for url:${req.url} params:${JSON.stringify(req.query)}`);
  try {
    res.send(await api(req.query));
  } catch (error) {
    next(error);
  }
});

app.use(handleError);

app.listen(process.env.PORT, () => {
  logger.info(`weather-api listening on port ${process.env.PORT}`);
});
