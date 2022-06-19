import Route from '@ember/routing/route';
import ENV from 'weather-app/config/environment';

const api = `https://api.openweathermap.org/data/2.5/weather`;

export default class IndexRoute extends Route {
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
        `${api}?lat=${latitude}&lon=${longitude}&appid=${ENV.APP.OPEN_WEATHER_MAP_API_KEY}`
      );
      const res = await response.json();
      return res;
    } catch (err) {
      console.log(err);
    }
  }
}
