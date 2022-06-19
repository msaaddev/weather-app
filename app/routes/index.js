import Route from '@ember/routing/route';
import ENV from 'weather-app/config/environment';
import { tracked } from '@glimmer/tracking';
import callAPI from '../utils/callAPI';

const baseURL = `https://api.openweathermap.org/data/2.5/weather`;

export default class IndexRoute extends Route {
  @tracked isLoading = true;

  getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve(position.coords);
        },
        (err) => {
          reject(err);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    });
  };

  async model() {
    try {
      const { latitude, longitude } = await this.getCurrentLocation();
      const api = `${baseURL}?lat=${latitude}&lon=${longitude}&appid=${ENV.OPEN_WEATHER_MAP_API_KEY}&units=metric`;
      const res = await callAPI(api);
      this.isLoading = false;
      return res;
    } catch (err) {
      console.log(err);
    }
  }
}
