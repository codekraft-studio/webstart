const path = require('path')
const webpack = require('webpack')
const pkg = require('./package.json')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const CopyWebpackPlugin = require('copy-webpack-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

const extractSass = new ExtractTextPlugin({
  filename: `css/bundle.css`,
  // disable: isDevelopment()
})

const NODE_ENV = process.env.NODE_ENV || 'development';

console.log('current env', NODE_ENV);

const src = path.resolve(__dirname, 'src')
const dist = path.resolve(__dirname, 'dist')

module.exports = {
  context: src,
  entry: './index.js',
  output: {
    path: dist,
    filename: `js/bundle.js`
  },
  devServer: {
    contentBase: src
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: extractSass.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: {
                sourceMap: (NODE_ENV === 'development')
              }
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: (NODE_ENV === 'development'),
                outputStyle: (NODE_ENV === 'development') ? 'expanded' : 'compressed'
              }
            },
          ]
        })
      }
    ]
  },
  plugins: [

    // Recursive clean all files in dist directory
    new CleanWebpackPlugin(['dist/**/*']),

    // Uglify all the script files
    new UglifyJSPlugin({
      sourceMap: (NODE_ENV === 'development')
    }),

    // Extract the compiled css into separate file
    extractSass,

    // Add build banner
    new webpack.BannerPlugin({
      banner:
      '* Package: <%= pkg.name %> - v<%= pkg.version %> \n' +
      '* Description: <%= pkg.description %> \n' +
      '* @author <%= pkg.author %> \n' +
      '* @license <%= pkg.license %> \n',
      entryOnly: true
    }),
    
    // Start browser sync server with proxy
    new BrowserSyncPlugin({
        host: 'localhost',
        port: 8088,
        proxy: 'http://localhost:8080/'
      },
      {
        // prevent BrowserSync from reloading the page
        // and let Webpack Dev Server take care of this
        reload: false
      }
    ),

    // Copy source files into distribution folder
    new CopyWebpackPlugin([
      { from: './index.html' },
      { from: './robots.txt' },
    ])

  ]
};
