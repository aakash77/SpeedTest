/**Dividing the listeners on all available cores for distributed behaviour**/
var cluster = require('cluster');

if (cluster.isMaster) {
  // Fork workers.
  var numCPUs = require('os').cpus().length;
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
}
else{
	var express = require('express'),
	api = require('./routes/api'),
	bodyParser = require('body-parser');

	var app = express();
	/**Setting maximum data limit (in bytes) 20MB**/
	app.use(bodyParser.json({limit : 20971520}));
	app.use(bodyParser.urlencoded({ extended: false }));

	/**Middleware* */
	app.use(function(req, res, next) {
		console.log("Requesting URI : "+req.url);
		next();
	});

	/**Redirecting the request to the handler**/
	app.use('/speedtest', api);

	/**If invalid request**/
	app.use(function(req, res) {
		res.status(404).json({
			message:"Request not found"
		});
	});

	/**Server Start**/
	app.listen(8080, function() {
		console.log("Server Started ... ");
	});
}	