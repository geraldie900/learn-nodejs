var url = require('url');
var fs = require('fs');

function renderHTML(path, response){
    fs.readFile(path, null, function(error, data){
        if (error){
            response.writeHead(404);
            response.write('file not found');
        } else {
            response.write(data);
        }
        response.end();
    });
}

module.exports = {
    handleRequest: function(request, response){
        response.writeHead(200, {'Content-Type' : 'text/html'});

        var path = url.parse(request.url).pathname;
        //var path1 = url.parse(request.url);
        //console.log(path1);
        //console.log(path);
        switch(path) {
            case '/':
                renderHTML('./index.html', response);
                break;
            case '/login':
                renderHTML('./login.html', response);
                break;
            default:
                response.writeHead(404);
                response.write('not defined');
                response.end();

        }
    }
};