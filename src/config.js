import { configure as configureLogging } from 'log4js';
import { config as configureDotEnv } from 'dotenv-flow';

/**
 * Global configuration like logging, env setup, etc
 */
export const config = () => {
  configureLogging({
    appenders: {
      console: { type: 'stdout' },
      file: {
        type: 'file',
        filename: 'output/weather-api.log',
      },
    },
    categories: {
      default: {
        appenders: ['file', 'console'],
        level: 'trace',
      },
    },
  });

  configureDotEnv();
};
