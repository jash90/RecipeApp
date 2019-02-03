import { observable, action } from 'mobx';
import _ from 'lodash';

export default class AuthStore {
  @observable
  token = '';

  getToken() {
    return this.token;
  }

  setToken(token) {
    this.token = token;
  }
}
