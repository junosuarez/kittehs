/*globals define */

define(['observable'], function (Observable) {
	'use strict';
	var kittehA = new Observable(''),
		kittehB = new Observable(''),
		requestToken = new Observable('');

	return {
		kittehA: kittehA,
		kittehB: kittehB,
		requestToken: requestToken
	};

});