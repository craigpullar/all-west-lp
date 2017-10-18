var webpack = require('webpack');
var LiveReloadPlugin = require('webpack-livereload-plugin');

var config = [{
  cache : true,
  devtool: 'cheap-source-map',
  plugins: [
  new LiveReloadPlugin({
    appendScriptTag : true
  }),
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  }),
  ],
  context: __dirname + '/client/js', 
  entry: {
    app: './app.js',
  },
  output: {
    path: __dirname + '/client/', // `dist` is the destination
    filename: 'dist/[name].bundle.js',
  },
  module: {
    rules: [

    {
      test: /\.js$/,
      exclude: /node_modules/,
      loaders: "babel-loader",
      options: {
        presets: ['es2015']
      },
      include: __dirname + '/client/js'

    },
    {
      test: /\.(sass|scss)$/, //Check for sass or scss file names
      exclude: /node_modules/,
      use: [
      'style-loader',
      'css-loader',
      'sass-loader',
      ],
      include: __dirname + '/client/css',
    },{
      test: /\.(gif|png|jpg|svg)$/i,
      include: __dirname + '/client/images',
      loaders: [
      'file-loader?name=dist/[hash].[ext]',
      {
        loader: 'image-webpack-loader',
        query: {
          mozjpeg: {
            dcScanOpt: 0,
          },
          optipng: {
            optimizationLevel: 0,
          },
          pngquant: {
            speed: 10,
          },
        },
      }
      ]
    }

    ]
  }
}];

module.exports = config;