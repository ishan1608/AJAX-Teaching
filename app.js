
var http = require('http');
var nodeStatic = require('node-static');
var staticServer = new(nodeStatic.Server)();
var formidable = require('formidable');

var port = Number(process.env.PORT || 8080);

http.createServer(function(req, res) {
    console.log(req);
    if(req.url === '/send') {
        var form = new formidable.IncomingForm();
        form.parse(req, function(err, fields, files) {
            res.writeHead(200, {"Content-Type": "text/plain"});
            res.write("URL : " + req.url + "\nMETHOD : " + req.method + "\nHEADERS : \n" + JSON.stringify(req.headers));
            res.end("\nPARAMETERS : \n" + JSON.stringify(fields));
        });
    } else {
        staticServer.serve(req, res);
    }
}).listen(port);