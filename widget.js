/*jslint plusplus:true */
/*globals document */
(function (document, undefined) {
	'use strict';
	var first, each, JQwrapper, $, config, getConfig, template, cssRule, insertBug, init;

	// helper functions
	first = function (items, predicate) {
		var i,
			item;
		for (i = 0; i < items.length; i++) {
			item = items[i];
			if (predicate(item)) {
				return item;
			}
		}
	};

	each = function (items, effect) {
		var i,
			item;
		for (i = 0; i < items.length; i++) {
			item = items[i];
			effect(item, i, items);
		}
	};

	// jQuery-style API wrapper
	JQwrapper = function (id) {
		if (id[0] === '#') {
			id = id.substr(1);
		}
		this.el = document.getElementById(id);
		return this;
	};
	JQwrapper.prototype.get = function () {
		return this.el;
	};
	JQwrapper.prototype.on = function (eventName, callback) {
		this.el.addEventListener(eventName, callback);
		return this;
	};
	JQwrapper.prototype.show = function () {
		this.el.style.cssText = 'display: block !important;';
		return this;
	};
	JQwrapper.prototype.hide = function () {
		this.el.style.cssText = 'display:none !important;';
		return this;
	};
	$ = function (id) {
		return new JQwrapper(id);
	};

	getConfig = function () {
		// load config options from script tag
		// script tag 

		var configEle = first(document.getElementsByTagName('script'), function (s) {
				return s.getAttribute('data-catdownID') !== null;
			}),
			config = {},
			get = function (key) {
				var val = configEle.getAttribute('data-' + key);
				if (val !== null && val !== undefined) {
					config[key] = val;
				}
			};

		each(['catdownID', 'top', 'right', 'bottom', 'left'], get);

		config.id = config.catdownID;

		if (!(config.top || config.bottom)) {
			config.top = '0px';
		}
		if (!(config.left || config.right)) {
			config.right = '30%';
		}

		return config;
	};

	cssRule = function (selector, props) {
		var css = [selector, '{'],
			prop;
		for (prop in props) {
			if (props.hasOwnProperty(prop)) {
				css.push(prop + ': ' + props[prop] + ' !important;');
			}
		}
		css.push('}');
		return css.join('\n');
	};

	template = function (c) {
		var loadimg = 'data:image/gif;base64,R0lGODlhEAAQAPIAAP///8xqAPLbwuW1gsxqAAAAAAAAAAAAACH+GkNyZWF0ZWQgd2l0aCBhamF4bG9hZC5pbmZvACH5BAAKAAAAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAEAAQAAADGwi6MjRiSenIm9hqPOvljAOBZGmeaKqubOu6CQAh+QQACgABACwAAAAAEAAQAAADHAi63A5ikCEek2TalftWmPZFU/WdaKqubOu+bwIAIfkEAAoAAgAsAAAAABAAEAAAAxwIutz+UIlBhoiKkorB/p3GYVN1dWiqrmzrvmkCACH5BAAKAAMALAAAAAAQABAAAAMbCLrc/jDKycQgQ8xL8OzgBg6ThWlUqq5s604JACH5BAAKAAQALAAAAAAQABAAAAMbCLrc/jDKSautYpAhpibbBI7eOEzZ1l1s6yoJACH5BAAKAAUALAAAAAAQABAAAAMaCLrc/jDKSau9OOspBhnC5BHfRJ7iOXAe2CQAIfkEAAoABgAsAAAAABAAEAAAAxoIutz+MMpJ6xSDDDEz0dMnduJwZZulrmzbJAAh+QQACgAHACwAAAAAEAAQAAADGwi63P4wRjHIEBJUYjP/2dZJlIVlaKqubOuyCQAh+QQACgAIACwAAAAAEAAQAAADHAi63A5ikCEek2TalftWmPZFU/WdaKqubOu+bwIAOwAAAAAAAAAAAA==',
			html = ['<style type="text/css">'],
			add = function (a) { 
				html.push(a); 
			},
			bugPosition;

		add(cssRule('.' + c.id + '-reset', {
			margin: '0',
			padding: '0',
			background: 'transparent',
			border: 'none',
			font: 'normal normal normal 16px/16px Helvetica, arial, sans-serif',
			direction: 'ltr'
		}));

		add(cssRule('#' + c.id + '-dropshadow', {
			display: 'none',
			position: 'fixed',
			'z-index': '2147483646',
			top: '0',
			left: '0',
			background: '#444',
			opacity: '.5',
			width: '100%',
			height: '100%'
		}));

		bugPosition = {
			position: 'fixed',
			'z-index': '2147483645',
			padding: '5px',

			border: '2px solid #000',
			'border-top': 'none',

			'box-shadow': '0 0 10px #444',
			cursor: 'pointer',

			'background-color': 'orange',
			'border-radius': '0 0 4px 4px'
		};

		if (config.hasOwnProperty('bottom')) {
			bugPosition.bottom = config.bottom;
		} else {
			bugPosition.top = config.top;
		}

		if (config.hasOwnProperty('left')) {
			bugPosition.left = config.left;
		} else {
			bugPosition.right = config.right;
		}

		add(cssRule('#' + c.id + '-bug', bugPosition));

		add(cssRule('#' + c.id + '-overlay', {
			display: 'none',
			position: 'fixed',
			'z-index': '2147483647',
			top: '100px',
			left: '0',
			width: '100%',
			opacity: '1'
		}));

		add(cssRule('#' + c.id + '-close', {
			margin: 'auto',
			width: '700px',
			'text-align': 'right'
		}));

		add(cssRule('#' + c.id + '-close a', {
			width: '30px',
			padding: '3px 5px',
			'font-size': '12px',
			'text-decoration': 'none',
			color: '#000',

			'background-color': 'orange',
			'border-radius': '5px 5px 0 0'
		}));

		add(cssRule('#' + c.id + '-overlay iframe', {
			margin: 'auto',
			width: '700px',
			height: '500px',
			display: 'block',
			border: '0',
			'box-shadow': '0 0 20px #000',
			background: '#fff url(' + loadimg + ') center center no-repeat'
		}));

		add('</style>');

		add('<div id="' + c.id + '-bug" class="' + c.id + '-reset">bored? vote for kittehs!</div>');
		add('<div id="' + c.id + '-dropshadow" class="' + c.id + '-reset" title="Click to return to page"></div>');
		add('<div id="' + c.id + '-overlay" class="' + c.id + '-reset" title="Click to return to page">');
		add('<div id="' + c.id + '-close"><a href="#">close</a></div>');
		add('<iframe id="' + c.id + '-frame" title=""/></div>');

		return html.join('');
	};


	insertBug = function (config, template) {
		var widget = document.createElement('div');

		widget.innerHTML = template(config);
		document.getElementsByTagName('body')[0].appendChild(widget);
	};

	init = function (config) {
		var c = config,
			$bug = $('#' + c.id + '-bug'),
			$dropshadow = $('#' + c.id + '-dropshadow'),
			$overlay = $('#' + c.id + '-overlay'),
			$closeBtn = $('#' + c.id + '-close'),
			$frame = $('#' + c.id + '-frame'),
			close = function (e) {
				e.preventDefault();
				$overlay.hide();
				$dropshadow.hide();
				$bug.show();
			},
			open = function (e) {
				e.preventDefault();
				$bug.hide();
				$dropshadow.show();
				$overlay.show();
				$frame.get().contentWindow.location.href = '/kitteh/vote';
			};

		$bug.on('click', open);
		$dropshadow.on('click', close);
		$overlay.on('click', close);
		$closeBtn.on('click', close);

	};

	// run widget
	config = getConfig();
	insertBug(config, template);
	init(config);

}(document));