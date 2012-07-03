/*globals define */

define(['jquery', 'model'], function ($, model) {
	'use strict';

	var getKittehs,
		vote,
		getRankings;


	getKittehs = function () {

		var updateModel = function (data) {
			model.kittehA.set(data.kittehA);
			model.kittehB.set(data.kittehB);
			model.requestToken.set(data.requestToken);
		}

		$.ajax({
			url: '/ballot',
			type: 'POST',
			cache: false,
			dataType: 'json',
			success: updateModel,
			error: function () { alert('teh kittehs are taking a nap. vote moar later!'); }
		});

	};

	/**
	 * returns a jqXHR deferred request registering a vote for kitteh `choice`
	 */
	vote = function (choice) {

		if (!(choice === 'a' || choice === 'b')) {
			throw new Exception('invalid choice');
		}

		var data = {
				choice: choice === 'a' ? model.kittehA.get().id : model.kittehB.get().id,
				requestToken: model.requestToken.get()
			},
			updateModel = function () {
				console.log('vote successful', data);
				getKittehs();
			}

		return $.ajax({
			url: '/vote',
			type: 'POST',
			data: JSON.stringify(data),
			contentType: 'application/json',
			success: updateModel,
			error: function () { 
				alert('teh kittehs are unhappy with your choice and have decided to ignore it.');
				getKittehs();
			}
		});

	};

	getRankings = function () {

		var updateModel = function (data) {
			model.kittehs.set(data.kittehs);
		}

		return $.ajax({
			url: '/rankings',
			type: 'GET',
			dataType: 'json',
			success: updateModel,
			error: function (e) {
				alert('teh kittehs are shy about their rankingings right now. mebbe later?');
			}
		});

	};



	return {
		getKittehs: getKittehs,
		vote: vote,
		getRankings: getRankings
	};

});