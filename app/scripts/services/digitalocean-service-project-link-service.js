'use strict';

(function() {
  angular.module('ncsaas')
    .service('digitalOceanServiceProjectLinkService', ['baseServiceClass', digitalOceanServiceProjectLinkService]);

  function digitalOceanServiceProjectLinkService(baseServiceClass) {
    var ServiceClass = baseServiceClass.extend({
      init: function() {
        this._super();
        this.endpoint = '/digitalocean-service-project-link/';
      }
    });
    return new ServiceClass();
  }

})();