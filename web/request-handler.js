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
        asset = path.resolve('web/public', 'index.html');
      } else {
        asset = path.resolve('web', '../archives/sites' + req.url);
      }
      console.log(asset);
      httpHelpers.serveAssets(res, asset, function (err, data) {
        // if (err) {
        //   throw err;
        // }
        res.end(data);
      });
    },
    'POST': function () {

    }
  };

  actions[req.method](req, res);

};
