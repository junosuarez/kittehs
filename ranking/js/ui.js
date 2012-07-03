/*globals define */

define(['jquery',
		'lodash',
		'model',
		'tpl!templates/index.tpl',
		'tpl!templates/detail.tpl'], 
		function ($, _, model, indexTemplate, detailTemplate) {
	'use strict';

	var init = function () {

		/*var html = indexTemplate({
			kittehAimg: model.kittehA.get().photo,
			kittehBimg: model.kittehB.get().photo,
			//kittehs: model.topKittehs.get()
		});*/

		var showDetails = function () {
			var $this = $(this).closest('#kittehs > li'),
				id = +$this.attr('id'),
				kittehs = model.kittehs.get(),
				thisKitteh = model.getKittehById(id),
				mixinPhoto = function (kitteh) {
					kitteh.photo = model.getKittehById(kitteh.id).photo;
					return kitteh;
				};

			if (_.any($this.find('.detail'))) {
				return;
			}

			thisKitteh.lostTo = _.chain(thisKitteh.results).
				filter(function (result) {
					return result.l > result.w;
				}).
				map(mixinPhoto).
				value();

			thisKitteh.beat = _.chain(thisKitteh.results).
				filter(function (result) {
					return result.w > result.l;
				}).
				map(mixinPhoto).
				value();

			$('#kittehs .detail').remove();
			$this.append($(detailTemplate(thisKitteh)).hide().fadeIn());
		}

		$('#kittehs').on('click', '#kittehs > li', showDetails);

		$('#kittehs').on('click', '#kittehs .detail li', function (e) {
			e.stopPropagation();
			var $target = $('#' + $(this).data('id'));
			$('#kittehs .detail').remove();
			$(document).scrollTop($target.offset().top);
			$target.trigger('click');
		});

	};

	model.kittehs.onChange(function (val) {

		var html = indexTemplate({kittehs: val});

		$('#loading').remove();

		$(html).appendTo('#kittehs');
	});

	return {
		init: init
	};

});