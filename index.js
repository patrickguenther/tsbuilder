var browserify = require("browserify");
var source = require("vinyl-source-stream");
var tsify = require("tsify");
var gutil = require("gulp-util");
var watchify = require("watchify");
var gulp = require("gulp");

module.exports = PgBuild;

function PgBuild(name, files) {
	if(!(this instanceof PgBuild)) {
		console.log("Calling constructor");
		return new PgBuild(name, files);
	}
	else {
		console.log("Is constructor");
	}
	
	var depFiles;
	if(typeof(files) === 'string') {
		depFiles = [files];
	}
	else {
		depFiles = files;
	}

	var depFilesCleaned = [];
	for(var i=0, f; f = depFiles[i]; ++i) {
		depFilesCleaned.push("src/" + f + ".ts");
	}

	console.log(depFilesCleaned);

	var w = watchify(browserify({
		baseDir: '.',
		debug: true,
		entries: depFilesCleaned,
		cache: {},
		packageCache: {}
	}).plugin(tsify).on('error', function(e) {console.error(e);}));

	this.bundler = function() {
		return w.bundle()
			.pipe(source(name + '.js'))
			.pipe(gulp.dest('dist/'))
			.on('error', function(e) {console.error(e);})
		;
	};

	w.on("update", this.bundler);
	w.on("log", gutil.log);
}

PgBuild.prototype.getTask = function() {
	var self = this;
	return function() {
		self.bundler();
	};
};
