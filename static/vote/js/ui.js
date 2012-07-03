/*globals define */

define(['jquery', 'tpl!templates/index.tpl', 'model', 'kittehService'], function ($, indexTemplate, model, kittehService) {
	'use strict';

	var init = function () {

		var html = indexTemplate({
			kittehAimg: model.kittehA.get().photo,
			kittehBimg: model.kittehB.get().photo
		});

		$(html).appendTo('body');

		$('.kitteh').on('click', function (e) {
			e.preventDefault();
			kittehService.vote($(this).hasClass('a') ? 'a' : 'b');
		});

		model.kittehA.onChange(function (val) {
			$('.kitteh.a img').attr('src', val.photo);
		});

		model.kittehB.onChange(function (val) {
			$('.kitteh.b img').attr('src', val.photo);
		});


	};

	return {
		init: init
	};

});