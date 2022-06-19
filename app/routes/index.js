import Route from '@ember/routing/route';
import ENV from 'weather-app/config/environment';
import { tracked } from '@glimmer/tracking';

const api = `https://api.openweathermap.org/data/2.5/weather`;

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
      const response = await fetch(
        `${api}?lat=${latitude}&lon=${longitude}&appid=${ENV.OPEN_WEATHER_MAP_API_KEY}&units=metric`
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
