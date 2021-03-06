import { ENV } from '@waldur/core/services';
import { translate } from '@waldur/i18n';

export const format = response => {
  /*
  Status code -1 denotes network error.
  Usually it is caused by one of the following reasons:

  - client is not connected to the internet;
  - server is down;
  - server is inaccessible via VPN;
  - server is located in another domain and didn't return valid CORS headers;
  - request has timed out;
  - request was aborted, ie manually cancelled by the client.

  See also: https://fetch.spec.whatwg.org/#concept-filtered-response
  */

  if (response.status === -1) {
    // tslint:disable-next-line max-line-length
    return translate('Unfortunately, connection to server has failed. Please check if you can connect to {apiEndpoint} from your browser and contact support if the error continues.', {apiEndpoint: ENV.apiEndpoint});
  }

  let message = `${response.status}: ${response.statusText}.`;

  if (response.data) {
    if (response.data.non_field_errors) {
      message += ' ' + response.data.non_field_errors;
    }
    if (response.data.detail) {
      message += ' ' + response.data.detail;
    }
    if (Array.isArray(response.data)) {
      message += ' ' + response.data.map(item => {
        if (typeof item === 'object') {
          return Object.keys(item).map(key => `${key}: ${item[key]}`).join(', ');
        } else {
          return item;
        }
      }).join('. ');
    }
  }

  return message;
};

export default class ErrorMessageFormatter {

  format = format;

  formatErrorFields(error) {
    let errors = [];
    if (!(error.data instanceof Object)) {
      return [error.data];
    }

    for (const i in error.data) {
      if (error.data.hasOwnProperty(i)) {
        errors = errors.concat(i + ': ' + error.data[i]);
      }
    }
    return errors;
  }

  parseError(error) {
    const errors: any = {};
    if (error.data && typeof error.data === 'object') {
      for (const key of Object.keys(error.data)) {
        const errorValue = error.data[key];
        if (Array.isArray(errorValue)) {
          errors[key] = errorValue;
        } else {
          errors[key] = [errorValue];
        }
      }
    } else if (error.data) {
      errors.nonFieldErrors = [].concat(error.data);
    }
    return errors;
  }
}
