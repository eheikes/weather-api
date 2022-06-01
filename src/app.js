import express from 'express';
import { getLogger } from 'log4js';

import { config } from './config';
import { api } from './routes/weather/current';
import { handleError } from './utils/errorHandler';

// set up global config
config();

const logger = getLogger();
const app = express();

app.get('/weather/current', async (req, res, next) => {
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
