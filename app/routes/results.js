import Route from '@ember/routing/route';
import { tracked } from '@glimmer/tracking';
import ENV from 'weather-app/config/environment';
import callAPI from '../utils/callAPI';

const baseURL = `https://api.openweathermap.org/data/2.5/weather`;
export default class ResultsRoute extends Route {
  @tracked isLoading = true;

  async model(params) {
    try {
      const api = `${baseURL}?q=${params.city}&appid=${ENV.OPEN_WEATHER_MAP_API_KEY}&units=metric`;
      const res = await callAPI(api);
      this.isLoading = false;
      return res;
    } catch (err) {
      console.log(err);
    }
  }
}
