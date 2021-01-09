// webpack走らせる npx webpack

// dist先は絶対パス
const path = require('path');
// このディレクトリを動的に取得
const outputPath = path.resolve(__dirname);
// そのディレクトリに対してdistを追加
// console.log('パスです', outputPath);

// for react
// build時にhtmlをdist下に吐き出す
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

// uglify
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  // 取得先
  entry: './components/index.js',
  // 書き出し先
  output: {
    filename: 'bundle.js',
    path: outputPath,
  },
  // serverでどこを読み込むかとwatchする
  devServer: {
    contentBase: outputPath,
  },
  plugins: [
    new MiniCssExtractPlugin({
      // filename: '[name].[hash].css',
      filename: 'style.css',
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ],

  // optimizing
  optimization: {
    minimizer:
      [new UglifyJsPlugin(
        {
          uglifyOptions: {
            compress: {
              drop_console: true,
            },
          },
        },
      ),
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
        loader: 'babel-loader',
      },

      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { url: false } },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { url: false } },
          'sass-loader'
        ],
      },
    ],
  },
  devtool: 'eval-source-map',
};
