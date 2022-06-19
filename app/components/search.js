import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class SearchComponent extends Component {
  @service router;
  @tracked city = '';

  model() {
    return this.city;
  }

  @action updateCity(e) {
    e.preventDefault();
    this.router.transitionTo(`/search/${this.city}`);
  }
}
