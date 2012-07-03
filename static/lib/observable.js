/*jslint plusplus:true */
/*global define */
define(function () {
	var Observable =  function (init) {
		var o = init,
			callbacks = [],
			get = function () {
				return o;
			},
			updated = function () {
				var i;
				for (i = 0; i < callbacks.length; i++) {
					callbacks[i](o);
				}
			},
			set = function (val) {
				if (o !== val) {
					o = val;
					updated();
				}
			},
			onChange = function (callback) {
				callbacks.push(callback);
			};

		return {
			get: get,
			set: set,
			onChange: onChange
		};
	};

	return Observable;

});