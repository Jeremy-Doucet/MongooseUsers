(function() {
  "use strict";
  angular.module('app').controller('ProfileController', ProfileController);
  function ProfileController(HomeFactory, $state, UserFactory) {
      var vm = this;
      if(!UserFactory.status._id) $state.go('Home');

      HomeFactory.getMyChirps().then(function(res) {
        vm.chirps = res;
      });
  }
})();
