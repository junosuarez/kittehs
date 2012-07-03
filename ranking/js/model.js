/*globals define */

define(['observable', 'lodash'], function (Observable, _) {
	'use strict';
	var kittehs = new Observable('')

	var getKittehById = function (id) {
		return _.find(kittehs.get(), function (kitteh) {
			return kitteh.id === +id;
		});
	}

	return {
		kittehs: kittehs,
		getKittehById: getKittehById
	};

});