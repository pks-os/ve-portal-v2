'use strict';

(function() {
  angular.module('ncsaas')
    .service('hooksService', ['$http', '$q', 'ENV', hooksService]);

  function hooksService($http, $q, ENV) {
    var endpoints = {
      'email': '/hooks-email/',
      'webhook': '/hooks-web/',
    };

    function getListUrl(type) {
      var endpoint = endpoints[type];
      return ENV.apiEndpoint + 'api' + endpoint;
    }

    function getDetailUrl(type, uuid) {
      return getListUrl(type) + uuid + '/';;
    }

    function flattenList(items) {
      var result = [];
      for (var i = 0; i < items.length; i++) {
        for (var j = 0; j < items[i].length; j++) {
          result.push(items[i][j]);
        }
      }
      return result;
    }

    function annotate(item) {
      // Determine type of hook (ie web or email) by its URL in backend
      // so that type-specific URL for UI can be constructed ie
      // {'url': 'http://example.com/api/hooks-email/78119a72129e41b5ac749d64663818b0/'}
      // {'$type': 'email'}
      for (var type in endpoints) {
        if (item.url.indexOf(endpoints[type]) != -1) {
          item.$type = type;
        }
      };
    }

    function cleanData(resource) {
      var data = {};
      for(var key in resource) {
        if (key.charAt(0) != '$') {
          data[key] = resource[key];
        }
      }
      return data;
    }

    function initResource(resource) {
      resource.$save = function(success, error) {
        var data = cleanData(resource);
        var url = getListUrl(resource.$type);
        $http.post(url, data).success(success).error(function(response){
          error({data: response});
        });
      }

      resource.$delete = function(success, error) {
        var url = getDetailUrl(resource.$type, resource.uuid);
        $http.delete(url).success(success).error(error);
      }

      resource.$update = function(success, error) {
        var data = cleanData(resource);
        var url = getDetailUrl(resource.$type, resource.uuid);
        $http.put(url, data).success(success).error(function(response){
          error({data: response});
        });
      }
    }

    return {
      types: function() {
        var types = [];
        for (var type in endpoints) {
          types.push(type);
        }
        return types;
      },
      getList: function(filter) {
        var promises = [];
        for (var type in endpoints) {
          var promise = $http.get(getListUrl(type)).then(function(response){
            return response.data;
          })
          promises.push(promise);
        };
        return $q.all(promises).then(function(responses) {
          var items = flattenList(responses);
          angular.forEach(items, annotate);
          angular.forEach(items, initResource);
          return items;
        });
      },

      $get: function(type, uuid) {
        return $http.get(getDetailUrl(type, uuid)).then(function(response) {
          var resource = response.data;
          resource.$type = type;
          initResource(resource);
          return resource;
        })
      },

      $create: function() {
        var resource = {};
        initResource(resource)
        return resource;
      }
    }
  }
})();