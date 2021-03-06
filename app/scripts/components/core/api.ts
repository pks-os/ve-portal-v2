import { $http, ENV } from './services';

export function get<T = {}>(endpoint: string, options?: {}): angular.IHttpPromise<T> {
  return $http.get(`${ENV.apiEndpoint}api${endpoint}`, options);
}

export function getList<T = {}>(endpoint: string, params?: {}): angular.IPromise<T[]> {
  const options = params ? {params} : undefined;
  return get(endpoint, options).then(response =>
    Array.isArray(response.data) ?
    response.data :
    []
  );
}

export const getFirst = (endpoint, params?) =>
  getList(endpoint, params).then(data => data[0]);

export function getById<T = {}>(endpoint, id) {
  return get<T>(`${endpoint}${id}/`).then(response => response.data);
}

export const deleteById = (endpoint, id, options?) =>
  $http.delete(`${ENV.apiEndpoint}api${endpoint}${id}/`, options);

export function post<T = {}>(endpoint: string, options?: {}): angular.IHttpPromise<T> {
  return $http.post(`${ENV.apiEndpoint}api${endpoint}`, options);
}

export function sendForm<T = {}>(method: string, url: string, options): angular.IHttpPromise<T> {
  const data = new FormData();
  for (const name of Object.keys(options)) {
    if (options[name] !== undefined) {
      data.append(name, options[name]);
    }
  }
  return $http({
    method,
    url,
    data,
    transformRequest: x => x,
    headers: {'Content-Type': undefined},
  });
}

export async function getAll<T = {}>(endpoint: string, options?: {}): Promise<T[]> {
  let response = await get(endpoint, options);
  let result = [];

  while (true) {
    if (Array.isArray(response.data)) {
      result = result.concat(response.data);
    }
    const url = getNextPageUrl(response);
    if (url) {
      response = await $http.get(url);
    } else {
      break;
    }
  }
  return result;
}

export const getNextPageUrl = response =>  {
  // Extract next page URL from header links
  const link = response.headers('link');
  if (!link) {
    return null;
  }

  const nextLink = link.split(', ').filter(s => s.indexOf('rel="next"') > -1)[0];
  if (!nextLink) {
    return null;
  }

  return nextLink.split(';')[0].slice(1, -1);
};
