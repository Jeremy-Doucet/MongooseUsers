(function() {
  "use strict";
  angular.module('app').controller('GlobalController', GlobalController);
  function GlobalController(UserFactory, $state) {
      var vm = this;
      vm.user = {};
      vm.isLoggedIn = false;

      vm.register = function() {
        UserFactory.register(vm.user).then(function(res) {
          alert('Logged in!');
          vm.isLoggedIn = true;
          $state.go('Home');
        });
      };

      vm.login = function() {
        UserFactory.login(vm.user).then(function(res) {
          alert('logged in!');
          vm.isLoggedIn = true;
          $state.go('Home');
        });
      };
  }
})();
