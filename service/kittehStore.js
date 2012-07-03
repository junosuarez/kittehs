module.exports.config = function () {
	
/** 
 * usage:
 * get.kitteh.byId(5);
 * get.kitteh.all();
 *
 */

var getter = function (collection) {
		return {
			byId: function (id) {
				console.log(id);
				console.log(collection);
				var i, item;
				for (i = 0; i < collection.length; i++) {
					item = collection[i];
					console.log(item);
					if (item.id === id) {
						console.log('returning...')
						return item;
					}
				}
			},
			all: function () {
				return collection;
			}

		}
	},
	setter = function (collection) {
		return function (id, newVal) {
			var i, item;
			for (i = 0; i < collection.length; i++) {
				item = collection[i];
				if (item.id === id) {
					item = newVal;
					break;
				}
			}
		};
	};

	var kittehs = [],
		ballots = [],
		add = {
			kitteh: function (newKitteh) {
				kittehs.push(newKitteh);
			},
			ballot: function (newBallot) {
				ballots.push(newBallot);
			}
		},
		get = {
			kitteh: getter(kittehs),
			kittehs: getter(kittehs),
			ballot: getter(ballots),
			ballots: getter(ballots)
		},
		update = {
			kitteh: setter(kittehs),
			ballot: setter(kittehs)
		},
		count = {
			kittehs: function () {
				return kittehs.length;
			},
			ballots: function () {
				return ballots.length;
			}
		};

	return {
		add: add,
		get: get,
		update: update,
		count: count
	}
};