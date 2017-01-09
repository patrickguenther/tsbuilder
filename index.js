var browserify = require("browserify");
var source = require("vinyl-source-stream");
var tsify = require("tsify");
var gutil = require("gulp-util");
var watchify = require("watchify");

module.exports = PgBuild;

function PgBuild(gulp, files) {
	if(!(this instanceof PgBuild)) {
		console.log("Calling constructor");
		return new PgBuild(gulp, files);
	}
	else {
		console.log("Is constructor");
	}
	
	this.taskNames = [];
	this.bundlers = [];
	
	for(var name in files) {
		var dep = files[name];
		var depFiles;
		if(typeof(dep) === 'string') {
			depFiles = [dep];
		}
		else {
			depFiles = dep;
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
		
		var bundler = function() {
			return w.bundle()
					.pipe(source(name + '.js'))
					.pipe(gulp.dest('dist/'))
					.on('error', function(e) {console.error(e);})
			;
		};
		
		var taskName = 'tsbuilder-' + name;
		gulp.task(taskName, bundler);
		this.taskNames.push(taskName);
		
		this.bundlers.push(bundler);
		
		w.on("update", bundler);
		w.on("log", gutil.log);
	}
}

PgBuild.prototype.getTaskNames = function() {
	return this.taskNames;
};
