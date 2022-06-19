import Route from '@ember/routing/route';
import { tracked } from '@glimmer/tracking';
import ENV from 'weather-app/config/environment';

const api = `https://api.openweathermap.org/data/2.5/weather`;
export default class ResultsRoute extends Route {
  @tracked isLoading = true;

  async model(params) {
    try {
      const response = await fetch(
        `${api}?q=${params.city}&appid=${ENV.OPEN_WEATHER_MAP_API_KEY}&units=metric`
      );
      let res = await response.json();

      // manipulate the response to make it more usable
      let main = { ...res.main };
      const temp = Math.floor(main.temp);
      main = { ...main, temp };
      res = { ...res, main };

      this.isLoading = false;
      return res;
    } catch (err) {
      console.log(err);
    }
  }
}
