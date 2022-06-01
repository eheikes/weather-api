import express from 'express';
import { getLogger } from 'log4js';

import { config } from './config';
import { api } from './routes/weather/current';
import { handleError } from './utils/errorHandler';

// set up global config
config();

const logger = getLogger();
const app = express();

// Adds the current weather route to the express app
app.get('/weather/current', async (req, res, next) => {
  logger.debug(`Received request for url:${req.url} params:${JSON.stringify(req.query)}`);
  try {
    res.send(await api(req.query));
  } catch (error) {
    next(error);
  }
});

// register the error handler with express
app.use(handleError);

// start the express listener on the configured port
app.listen(process.env.PORT, () => {
  logger.info(`weather-api listening on port ${process.env.PORT}`);
});
