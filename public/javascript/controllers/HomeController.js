(function() {
	'use strict';
	angular.module('app')
	.controller('HomeController', HomeController);

	function HomeController(HomeFactory) {
		var vm = this;
		vm.title = 'Welcome to our App!';

		HomeFactory.getAllChirps().then(function(res) {
			vm.chirps = res;
		});

		vm.createChirp = function() {
			HomeFactory.createChirp(vm.chirp).then(function(res) {
				vm.chirps.push(res);
				vm.chirp = "";
			});
		};
	}
})();
