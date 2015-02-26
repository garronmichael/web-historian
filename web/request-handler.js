var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  //res.end(archive.paths.list);

  if (req.method === 'GET') {


    httpHelpers.serveAssets(res, path.resolve('/users', 'index.html'), function (err, data) {

      console.log(path.resolve('public', 'index.html'));
      // if (err) {
      //   throw err;
      // }
      res.end(data);
    });
  }


};
