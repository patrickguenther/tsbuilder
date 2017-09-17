var path = require('path');
var gulp = require('gulp');
var browserify = require('browserify');
var tsify = require('tsify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');

var cache = {};
var packageCache = {};

function createLogger(name) {
	return function() {
		var args = ['[' + name + ']'];
		for(var i = 0; i !== arguments.length; ++i) {
			args.push(arguments[i]);
		}
		console.log.apply(console, args);
	};
}

var getBundlerDefaults = {
	entry: false,
	baseDir: 'src',
	logging: createLogger('BUNDLER'),
	error: createLogger('ERROR'),
	watch: false,
	outDir: 'dist'
};

function getBundler(opts) {
	var _ = {};
	for(var i in getBundlerDefaults) {
		_[i] = opts[i] || getBundlerDefaults[i];
	}
	if(!_.entry) {
		throw new Error('Need an entry file name.');
	}
	if(!_.baseDir) {
		throw new Error('Need a base directory.');
	}
	_.entry = path.resolve(_.entry);
	_.baseDir = path.resolve(_.baseDir);
	_.outDir = path.resolve(_.outDir);
	var plugins = [tsify];
	if(_.watch) plugins.push(watchify);
	var bundler = browserify({
		plugin: plugins,
		extension: ['ts'],
		entries: [_.entry],
		baseDir: _.baseDir,
		cache: cache,
		packageCache: packageCache
	});
	
	var target = path.basename(_.entry, '.ts') + '.js';
	var b = {
		options: _,
		bundler: bundler,
		target: target
	};
	
	bundler.on('update', function() {
		_.logging('Bundling', _.entry);
		executeBundler(b);
	});
	
	bundler.on('error', function(e) {
		_.error('Caught error while bundling.', e);
	});
	
	executeBundler(b);
	
	return b;
}

function executeBundler(b) {
	b.bundler.bundle()
		.on('error', b.options.error)
		.pipe(source(b.target))
		.pipe(gulp.dest(b.options.outDir))
	;
}

module.exports = {
	getBundler: getBundler,
	createLogger: createLogger,
	defaultOptions: getBundlerDefaults
};