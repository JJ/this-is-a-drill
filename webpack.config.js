var path = require('path');

module.exports = {
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, 'docs'),
    compress: true,
    port: 31415,
  },
};