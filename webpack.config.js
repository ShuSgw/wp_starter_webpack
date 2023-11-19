// webpack走らせる npx webpack

// dist先は絶対パス
const path = require("path");
// このディレクトリを動的に取得
const outputPath = path.resolve(__dirname) + "/dist";
// そのディレクトリに対してdistを追加
// console.log('パスです', outputPath);

// for react
// build時にhtmlをdist下に吐き出す
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const webpack = require("webpack");

// uglify
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const BrowserSyncPlugin = require("browser-sync-webpack-plugin");

module.exports = {
  // 取得先
  entry: "./src/components/index.js",
  // 書き出し先
  output: {
    filename: "bundle.js",
    path: outputPath,
    hotUpdateChunkFilename: "updates/[id].[hash].hot-update.js",
    hotUpdateMainFilename: "updates/[runtime].[hash].hot-update.json",
  },
  // serverでどこを読み込むかとwatchする
  devServer: {
    contentBase: outputPath,
    hot: true, // HMRを有効にする
    writeToDisk: true,
    proxy: {
      "/": {
        target: "http://1baken-test.lo/",
        changeOrigin: true,
      },
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      // filename: '[name].[hash].css',
      filename: "style.css",
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
  ],

  // optimizing
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            drop_console: true,
          },
        },
      }),
      new OptimizeCssAssetsPlugin(),
    ],
  },

  module: {
    rules: [
      // babel
      // jsもしくはjsx
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },

      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {loader: "css-loader", options: {url: false}},
        ],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {loader: "css-loader", options: {url: false}},
          "sass-loader",
        ],
      },
    ],
  },
  // devtool: 'eval-source-map'
  devtool: "eval",
};
