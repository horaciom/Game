var connect = require('connect');
var serverStatic = require('serve-static');
connect().use(serverStatic(__dirname)).listen(8080,function(){
	console.log("Server runing on 8080..");
});