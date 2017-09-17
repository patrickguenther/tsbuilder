# tsbuilder
gulp plugin to streamline my typescript building process

Example Usage
=============

other options and their defaults are commented out.

gulpfile.js

```javascript
var gulp = require("gulp");
var tsbuilder = require("tsbuilder");

gulp.task('default', function() {
	tsbuilder.getBundler({
		//logging: tsbuilder.createLogger('LOG'),
		//error: tsbuilder.createLogger('ERROR'),
		//outDir: 'dist',
		//baseDir: 'src',
		//watch: false,
		entry: 'src/index.ts' // required
	});
});
```

The above gulpfile will compile two javascript files 'dist/exmpl.js' and 'dist/exmpl-test.js' from their 
typescript source files 'src/foo.ts' and 'src/foo.ts', 'src/foo-test.ts' respectively.