// @ngInject
function formatFlavor($filter) {
  return function(resource) {
    if (resource) {
      let parts = [];
      if (resource.cores) {
        parts.push(resource.cores + ' vCPU');
      }
      if (resource.ram) {
        parts.push($filter('filesize')(resource.ram) + ' RAM');
      }
      if (resource.disk || resource.storage) {
        parts.push($filter('filesize')(resource.disk || resource.storage) + ' storage');
      }
      return parts.join(', ');
    }
  };
}

export default module => {
  module.filter('formatFlavor', formatFlavor);
};
