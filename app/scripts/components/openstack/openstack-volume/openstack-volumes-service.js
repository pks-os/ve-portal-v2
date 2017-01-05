// @ngInject
export default function openstackVolumesService(baseServiceClass) {
  /*jshint validthis: true */
  var ServiceClass = baseServiceClass.extend({
    init:function() {
      this._super();
      this.endpoint = '/openstacktenant-volumes/';
      this.filterByCustomer = false;
    }
  });
  return new ServiceClass();
}