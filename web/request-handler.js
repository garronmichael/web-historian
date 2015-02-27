var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');
var urlParser = require('url');
// require more modules/folders here!

exports.handleRequest = function (req, res) {

  var actions = {
    'GET': function(req, res) {
      var parts = urlParser.parse(req.url);
      var urlPath = parts.pathname === '/' ? '/index.html' : parts.pathname;
      httpHelpers.serveAssets(res, urlPath, function(){
         archive.isUrlInList(urlPath.slice(1), function(found){
            if( found ){ // yes:
              // redirect to loading
              httpHelpers.sendRedirect(res, '/loading.html');
            } else {
              // 404
              httpHelpers.send404(res);
            }
          });
       });
    },

    'POST': function (req, res) {
      httpHelpers.collectData(req, function(data){
            var url = data.split('=')[1]; // www.google.com
            // in sites.txt ?
            archive.isUrlInList(url, function(found){
              if( found ){ // yes:
                // is archived ?
                archive.isURLArchived(url, function(exists){
                  if( exists ){ // yes:
                    // redirect to page
                    httpHelpers.sendRedirect(res, '/' +url);
                  } else { // no:
                    // redirect to loading
                    httpHelpers.sendRedirect(res, '/loading.html');
                  }
                });
              } else { // no:
                // append to sites
                archive.addUrlToList(url, function(){
                  // redirect to loading
                  httpHelpers.sendRedirect(res, '/loading.html');
                });
              }
            });
          });
        }
  };

  actions[req.method](req, res);

};





















