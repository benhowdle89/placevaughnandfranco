var fs = require('fs');
var gm = require('gm'),
	imageMagick = gm.subClass({
		imageMagick: true
	});

module.exports = {
	showRandomImage: function(req, res, next) {
		var dir = function() {
			return './images/';
		}

		var width = req.params.width || 600,
			height = req.params.height || 500;

		fs.readdir(dir(), function(err, files) {
			imageMagick(dir() + files[Math.floor(Math.random() * files.length - 1)])
				.resize(width, height, '^')
				.gravity('North')
				.crop(width, height)
				.stream('png', function(err, stdout) {
					if (err) return next(err);
					res.setHeader('Content-Type', 'image/png');
					stdout.pipe(res);
				});
		});
	}
};