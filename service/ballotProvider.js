module.exports.config = function (kittehStore) {

	var makeBallot,
		castBallot,
		recalcRankings;

	makeBallot = function (host) {

		var imgDir = 'http://' + host + '/images/';

		var kittehs = [],
			tmpRand;

		while(kittehs.length < 2){
			tmpRand = Math.floor(Math.random()*8);
			if(kittehs.indexOf(tmpRand) === -1) {
				kittehs.push(tmpRand);
			}
		}

		var ballot = {
			kittehA: {
				id: kittehs[0],
				photo: imgDir + kittehs[0] + '.jpg'
			},
			kittehB: {
				id: kittehs[1],
				photo: imgDir + kittehs[1] + '.jpg'
			}
		};
			// generate request token
		ballot.requestToken = 'fwhqhads' + kittehStore.count.ballots();
		ballot.id = ballot.requestToken;
		kittehStore.add.ballot(ballot);

		console.dir(ballot);
		return ballot;
	};


	castBallot = function (vote) {
		console.log('castBallot ------');
		console.dir(vote);
		// validate requestToken
		var ballot = kittehStore.get.ballot.byId(vote.requestToken);
		console.dir(ballot);
		if (ballot === undefined) {
			throw 404;
		}
		if (!(ballot.expired || ballot.cast)) {

			if (vote.choice === ballot.kittehA.id || vote.choice === ballot.kittehB.id){
				//record ballot
				ballot.choice = vote.choice;
				ballot.cast = true;
				kittehStore.update.ballot(ballot.id, ballot);

				// todo: run recalcRankings as a scheduled worker task
				recalcRankings();

			} else {
				throw [400, 'Invalid choice'];
			}

		} else {
			throw [400, 'Invalid ballot'];
		}
	};

	recalcRankings = function () {

		var newVotes = kittehStore.get.ballots.all().filter(
			function (vote) {
				return !vote.tabulated && vote.choice !== undefined;
			});

		newVotes.forEach(function (vote) {

			console.log('calculating vote...')
			console.log(vote);
			var winnar = kittehStore.get.kitteh.byId(vote.choice);
			console.log('winnar');
			console.log(winnar);
			var loser = kittehStore.get.kitteh.byId(vote.choice === vote.kittehA.id ? vote.kittehB.id : vote.kittehA.id);
			console.log('loser');
			console.log(loser);
			console.log(kittehStore.get.kittehs.all());
			winnar.totalVotes++;
			winnar.totalAppearances++;
			loser.totalAppearances++;

			kittehStore.update.kitteh(winnar.id, winnar);
			kittehStore.update.kitteh(loser.id, loser);

			vote.tabulated = true;
			kittehStore.update.ballot(vote.id, vote);

		});

	};



	return {
		makeBallot: makeBallot,
		castBallot: castBallot
	};

};