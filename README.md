# tsbuilder
gulp plugin to streamline my typescript building process

Example Usage
=============

gulpfile.js

```javascript
var gulp = require("gulp");
var tsbuilder = require("tsbuilder");

var builder = tsbuilder({'exmpl': ['foo'], 'exmpl-test': ['foo', 'foo-test']});

gulp.task("default", builder.getTask());
```

The above gulpfile will compile two javascript files 'dist/exmpl.js' and 'dist/exmpl-test.js' from their 
typescript source files 'src/foo.ts' and 'src/foo.ts', 'src/foo-test.ts' respectively.