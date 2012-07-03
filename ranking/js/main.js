/*globals require */

require.config({
	paths: {
		"jquery": "../../lib/jquery-1.7.2.min",
		"lodash": "../../lib/lodash-0.3.1.min",
		"text": "../../lib/text",
		"tpl": "../../lib/tpl",
		"templates": "../templates"
	}
});

require(['ui','kittehService'], function (ui, kittehService) {
	'use strict';

	ui.init();
	kittehService.getRankings();


});