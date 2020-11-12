const path = require('path');
const SRC_Dir = path.join(__dirname, './client');
const DEST_Dir = path.join(__dirname, './public');

module.exports = {
  entry: `${SRC_Dir}/app.js`,
  output: {
    filename: 'bundle.js',
    path: DEST_Dir,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?/,
        include:SRC_Dir,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }

}