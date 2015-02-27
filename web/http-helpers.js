var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
};

exports.sendResponse = function(response, data, statusCode){
  statusCode = statusCode || 200;
  response.writeHead(statusCode, headers);
  response.end(data);
};

exports.collectData = function(request, callback){
  var data = "";
  request.on('data', function(chunk){
    data += chunk;
  });
  request.on('end', function(){
    callback(data);
  });
};

exports.send404 = function(response){
  exports.sendResponse(response, '404: Page not found', 404);
};

exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...), css, or anything that doesn't change often.)
  var encoding = {encoding: 'utf8'};
  fs.readFile( archive.paths.siteAssets + asset, encoding, function(err, data) {
    // check public
    if(err) {
      // not there, check archive
      fs.readFile(archive.paths.archivedSites + asset, encoding, function(err, data) {
        //not there either -> send 404
        if(err) {
          callback ? callback() : exports.send404(res);
        } else {
        //file exits serve it
          exports.sendResponse(res, data);
        }
      });
    } else {
        // file exists, serve it
        exports.sendResponse(res, data);
    }
  });
};


exports.sendRedirect = function(response, location, status){
  status = status || 302;
  response.writeHead(status, {Location: location});
  response.end();
};


// As you progress, keep thinking about what helper functions you can put here!
