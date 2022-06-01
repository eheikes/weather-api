import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import {
  expect,
  use,
} from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { getCurrentWeather } from './currentWeather';

use(chaiAsPromised);

describe('currentWeather', () => {
  describe('getCurrentWeather', () => {
    it('handles 500 errors', async () => {
      const mockAdapter = new MockAdapter(axios);
      const lat = 1;
      const lon = 2;
      process.env.OPEN_WEATHER_API_KEY = 'test';
      const expectedUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily&units=imperial&appid=${process.env.OPEN_WEATHER_API_KEY}`;
      mockAdapter.onGet(expectedUrl)
        .reply(
          500,
          { message: 'testing failures' },
        );

      await expect(getCurrentWeather(
        lat,
        lon,
      )).to.be.rejected;
    });

    it('handles exceptions', async () => {
      const mockAdapter = new MockAdapter(axios);
      const lat = 1;
      const lon = 2;
      process.env.OPEN_WEATHER_API_KEY = 'test';
      const expectedUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily&units=imperial&appid=${process.env.OPEN_WEATHER_API_KEY}`;
      mockAdapter.onGet(expectedUrl)
        .networkError();

      await expect(getCurrentWeather(
        lat,
        lon,
      )).to.eventually.be.rejected;
    });

    it('handles good requests', async () => {
      const mockAdapter = new MockAdapter(axios);
      const lat = 1;
      const lon = 2;
      process.env.OPEN_WEATHER_API_KEY = 'test';
      const expectedUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily&units=imperial&appid=${process.env.OPEN_WEATHER_API_KEY}`;
      const mockResponseData = {
        test: 'test',
      };
      mockAdapter.onGet(expectedUrl)
        .reply(
          200,
          mockResponseData,
        );

      await expect(getCurrentWeather(
        lat,
        lon,
      )).to.eventually.eql(mockResponseData);
    });
  });
});
