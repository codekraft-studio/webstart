const path = require('path')
const webpack = require('webpack')
const pkg = require('./package.json')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const CopyWebpackPlugin = require('copy-webpack-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const extractSass = new ExtractTextPlugin({
  filename: `css/bundle.css`
})

const NODE_ENV = process.env.NODE_ENV || 'development';

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
              loader: 'postcss-loader',
              options: {
                sourceMap: (NODE_ENV === 'development'),
                plugins: (loader) => [
                  require('autoprefixer')()
                ]
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
    
    // Minify the main html entry
    new HtmlWebpackPlugin({
      template: './index.html',
      minify: {
        html5: true,
        removeComments: true,
        collapseWhitespace: true
      }
    }),

    // Copy source files into distribution folder
    new CopyWebpackPlugin([
      { from: './robots.txt' },
      { from: './img/**/*' }
    ])

  ]
};
