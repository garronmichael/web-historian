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
      } else {
        asset = path.join(__dirname, '../archives/sites', req.url);
      }
      httpHelpers.serveAssets(res, asset, function (err, data) {
        // if (err) {
        //   throw err;
        // }
        res.writeHead(200, headers);
        res.end(data);
      });

    },
    'POST': function (req, res) {
      httpHelpers.collectData(req, function(site) {
        archive.addUrlToList(site, archive.paths.list, function (err, site) {
          if (err) {
            throw err;
          }

          res.writeHead(302, headers);
          res.end('Posted: ' + site);
        });
      });
    }
  };

  actions[req.method](req, res);

};
