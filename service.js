var express = require('express');


var app = express.createServer(express.logger());

app.configure(function () {
	app.use(express.static(__dirname + '/static'));
	app.use(express.bodyParser());	
})


app.configure('development', function () {
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  app.set('baseUrl','http://localhost:5000/');
});

app.configure('production', function () {
  app.use(express.errorHandler());
  app.set('baseUrl','http://freezing-snow-6975.herokuapp.com/');
});

var kittehStore = require('./service/kittehStore').config(),
	rankingProvider = require('./service/rankingProvider').config(kittehStore, app.set('baseUrl')),
	ballotProvider = require('./service/ballotProvider').config(kittehStore, app.set('baseUrl'));


// routes

app.post('/ballot', function (req, res) {
	var ballot = ballotProvider.makeBallot(req.headers.host);
	res.send(ballot);
});

app.post('/vote', function (req, res) {
	ballotProvider.castBallot(req.body);
	res.send();
});

app.get('/rankings', function (req, res) {
	res.send(rankingProvider.getRankings());
});

app.get('/allVotes', function (req, res) {
	res.send({
		votes: kittehStore.get.ballots.all().filter(function (ballot) {
			return ballot.cast && !ballot.expired;
		}).map(function (ballot) {
			return {
				kittehA: ballot.kittehA,
				kittehB: ballot.kittehB,
				choice: ballot.choice
			}
		})
	});
});

app.get('/', function(req, res) {
  res.redirect('/ranking');
});

// app start

var fs = require('fs');

fs.readdirSync('./static/images/').
	filter(function (filename) {
		return /\.jpg$/.test(filename);
	}).
	forEach(function (filename) {
		kittehStore.add.kitteh({
			id: +filename.substr(0, filename.indexOf('.jpg')),
			totalVotes: 0,
			totalAppearances: 0,
			results: []
		});
	});

console.dir(kittehStore.get.kittehs.all());
console.dir(kittehStore.get.kitteh.byId(1));


var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});