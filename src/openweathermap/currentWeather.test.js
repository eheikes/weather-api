import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { fail } from 'assert';
import { expect } from 'chai';
import { getCurrentWeather } from './currentWeather';

describe('currentWeather', () => {
  describe('getCurrentWeather', () => {
    it('handles exceptions', async () => {
      const mockAdapter = new MockAdapter(axios);
      const lat = 1;
      const lon = 2;
      process.env.OPEN_WEATHER_API_KEY = 'test';
      const expectedUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily&units=imperial&appid=${process.env.OPEN_WEATHER_API_KEY}`;
      mockAdapter.onGet(expectedUrl)
        .networkError();

      try {
        await getCurrentWeather(
          lat,
          lon,
        );
        fail('Exception not thrown');
      } catch (e) {
        // expected
      }
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

      const result = await getCurrentWeather(
        lat,
        lon,
      );
      expect(result).to.eql(mockResponseData);
    });
  });
});
