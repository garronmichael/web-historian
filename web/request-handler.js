var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  //res.end(archive.paths.list);

  var actions = {
    'GET': function(req, res) {
      var asset;
       if(req.url === '/') {
        asset = path.join(__dirname, '/public/index.html');
        res.writeHead(200, httpHelpers.headers);
      } else if (req.url === '/styles.css') {
        asset = path.join(__dirname, '/public/styles.css');
        res.writeHead(200, {'Content-Type': 'text/css'});
      } else {
        asset = path.join(__dirname, '../archives/sites', req.url);
      }
      httpHelpers.serveAssets(res, asset, function (err, data) {
        if (err) {
          res.writeHead(404, headers);
          res.end(data);
        } else {
          res.end(data);
        }
      });

    },

    'POST': function (req, res) {
      httpHelpers.collectData(req, function(site) {
        archive.addUrlToList(archive.paths.list, site, function (err, site) {
          if (err) {
            throw err;
          }
          var asset = path.join(__dirname, '/public/loading.html');
          httpHelpers.serveAssets(res, asset, function (err, data) {
            if (err) {
              res.writeHead(404, headers);
              res.end(data);
            } else {
              res.writeHead(302, headers);
              res.end(data);
            }
          });

        });
      });
    }
  };

  actions[req.method](req, res);

};
