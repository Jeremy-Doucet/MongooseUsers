(function() {
	'use strict';
	angular.module('app')
	.factory('HomeFactory', HomeFactory);

	function HomeFactory($http, $q, $window) {
		var o = {};

		o.createChirp = function(chirp) {
			var chirp_obj = { message: chirp };
			var q = $q.defer();
			$http.post('/api/v1/chirps', chirp_obj, {
				headers: { authorization: 'Bearer ' + $window.localStorage.getItem('token') }
			}).then(function(res) {
				q.resolve(res.data);
			});
			return q.promise;
		};

		return o;
	}
})();
