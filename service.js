var express = require('express'),
	rankingProvider = require('./service/rankingProvider');

var app = express.createServer(express.logger());

app.configure('development', function () {
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  app.use(express.static(__dirname + '/static'));
});

app.configure('production', function () {
  app.use(express.errorHandler());
});



// routes

app.post('/ballot', function (req, res) {
	var imgDir = 'http://' + req.headers.host + '/images/';

	var kittehs = [],
		tmpRand;

	while(kittehs.length < 2){
		tmpRand = Math.floor(Math.random()*8);
		if(kittehs.indexOf(tmpRand) === -1) {
			kittehs.push(tmpRand);
		}
	}



	res.send({
		kittehA: {
			id: kittehs[0],
			photo: imgDir + kittehs[0] + '.jpg'
		},
		kittehB: {
			id: kittehs[1],
			photo: imgDir + kittehs[1] + '.jpg'
		},
		requestToken: 'fwhqhads'
	});
});

app.post('/vote', function (req, res) {

	// record the vote

	res.send();

});

app.get('/rankings', function (req, res) {

	res.send(rankingProvider.getRankings());

});

app.get('/', function(req, res) {
  res.redirect('/ranking');
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});