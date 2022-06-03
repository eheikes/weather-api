import sinon from 'sinon';

import { currentWeatherService } from './currentWeatherService';

import * as requestUtil from '../../utils/requestUtil';
import * as currentWeather from '../../openweathermap/currentWeather';
import * as weatherResponseConverter from '../../utils/weatherResponseConverter';

const sandbox = sinon.createSandbox();

describe('currentWeatherService', () => {
  describe('currentWeatherService', () => {
    afterEach(() => {
      sandbox.restore();
    });

    it('calls expected functions', async () => {
      sandbox.stub(
        requestUtil,
        'ensureParamExists',
      );

      sandbox.stub(
        currentWeather,
        'getCurrentWeather',
      );

      sandbox.stub(
        weatherResponseConverter,
        'convertResponse',
      );

      await currentWeatherService({
        lat: 1,
        lon: 2,
      });
    });
  });
});
