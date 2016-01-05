
var http = require('http');
var nodeStatic = require('node-static');
var staticServer = new(nodeStatic.Server)();
var formidable = require('formidable');
var wurl = require('wurl');
var url = require('url');

var port = Number(process.env.PORT || 8080);

http.createServer(function(req, res) {
    var firstLocation = wurl(1, req.url);
    console.log(firstLocation);
    switch(firstLocation) {
        case 'send':
            if(req.method === 'POST') {
                var form = new formidable.IncomingForm();
                form.parse(req, function(err, fields, files) {
                    res.writeHead(200, {"Content-Type": "text/plain"});
                    res.write("URL : " + req.url + "\nMETHOD : " + req.method + "\nHEADERS : \n" + JSON.stringify(req.headers));
                    res.end("\nPARAMETERS : \n" + JSON.stringify(fields));
                });
                break;
            } else {
                res.writeHead(200, {"Content-Type": "text/plain"});
                res.write("URL : " + req.url + "\nMETHOD : " + req.method + "\nHEADERS : \n" + JSON.stringify(req.headers));
                var url_parts = url.parse(req.url, true);
                var query = url_parts.query;
                res.end('\nPARAMETERS : \n' + JSON.stringify(query));
            }
        default:
            staticServer.serve(req, res);
            break;
    }
}).listen(port);
console.log('Server started on port ' + port);