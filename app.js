var path = require('path');
var base = require(path.join(__dirname, 'lib', 'appBase'));

base.setup(80, true);
base.setup(8080, false);
//app.listen(80);
//ioServer.setup();
