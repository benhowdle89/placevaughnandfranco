var fs = require('fs');
var gm = require('gm');

module.exports = {
	showRandomImage: function(req, res, next) {
		var dir = function() {
			return './images/';
		}

		var width = req.params.width || 600,
			height = req.params.height || 500;

		fs.readdir(dir(), function(err, files) {
			var imageMagick = gm.subClass({
				imageMagick: true
			});
			res.set('Content-Type', 'image/jpeg');
			imageMagick(dir() + files[Math.floor(Math.random() * files.length - 1)])
				.resize(width, height, '^')
				.gravity('North')
				.crop(width, height)
				.stream('jpg', function(err, stdout) {
					if (err) return next(err);
					stdout.pipe(res);
					stdout.on('error', next);
					stdout.on('close', next);
				});
		});
	}
};