(function() {
  "use strict";
  angular.module('app').factory('UserFactory', UserFactory);
  function UserFactory($http, $q, $window) {
    var o = { };

    o.register = function(user) {
      var q = $q.defer();
      $http.post('/api/v1/users/register', user).then(function(res) {
        o.setToken(res.data.token);
        q.resolve(res.data);
      });
      return q.promise;
    };

    o.login = function(user) {
      var q = $q.defer();
      $http.post('/api/v1/users/login', user).then(function(res) {
        o.setToken(res.data.token);
        q.resolve(res.data);
      });
      return q.promise;
    };

    o.getToken = function() {
      return $window.localStorage.getItem('token');
    };

    o.setToken = function(token) {
      $window.localStorage.setItem('token', token);
    };

    o.removeToken = function() {
      $window.localStorage.removeItem('token');
    };

    return o;
  }
})();
