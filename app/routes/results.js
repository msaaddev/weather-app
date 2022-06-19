import Route from '@ember/routing/route';

export default class ResultsRoute extends Route {
  model(params) {
    console.log(params.city);
    return params.city;
  }
}
