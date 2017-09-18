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

The above gulpfile will compile a javascript file 'dist/index.js' from its 
typescript source file 'src/index.ts'.