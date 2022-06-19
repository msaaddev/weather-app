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
        `${api}?lat=${latitude}&lon=${longitude}&appid=${ENV.APP.OPEN_WEATHER_MAP_API_KEY}&units=metric`
      );
      let res = await response.json();

      // manipulate the response to make it more usable
      let main = { ...res.main };
      let weather = { ...res.weather[0] };
      let description = weather.description;
      description = description.charAt(0).toUpperCase() + description.slice(1);
      weather = { ...weather, description };
      weather = [weather];
      const temp = Math.floor(main.temp);
      main = { ...main, temp };
      res = { ...res, main, weather };

      return res;
    } catch (err) {
      console.log(err);
    }
  }
}
