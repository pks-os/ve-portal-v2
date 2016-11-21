(function() {
  angular.module('ncsaas').filter('filesize', function() {
    var units = ['MB', 'GB', 'TB', 'PB'];

    return function(input) {
      if (isNaN(parseFloat(input)) || ! isFinite(input)) {
        return '?';
      }
      var unit = 0;

      while (input >= 1024) {
        input /= 1024;
        unit++;
      }

      return input.toFixed(0) + ' ' + units[unit];
    }
  });

  angular.module('ncsaas').filter('titleCase', function() {
    return function(input) {
      if (input) {
        return input.charAt(0).toUpperCase() + input.slice(1);
      }
    }
  });

  angular.module('ncsaas').filter('defaultCurrency', ['ENV', '$filter', defaultCurrency]);
  function defaultCurrency(ENV, $filter) {
    return function(value) {
      if (value.indexOf && value.indexOf(ENV.currency) !== -1) {
        return value;
      }
      return $filter('currency')(value, ENV.currency);
    }
  }

  angular.module('ncsaas').filter('shortDate', function() {
    return function(input) {
      if (input) {
        return moment(input).format('YYYY-MM-DD');
      }
    }
  });

  angular.module('ncsaas').filter('dateTime', function() {
    return function(input) {
      if (input) {
        return moment(input).format('YYYY-MM-DD HH:mm');
      }
    }
  });

})();
