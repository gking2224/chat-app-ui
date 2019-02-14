const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DotenvPlugin = require('webpack-dotenv-plugin');

const root = path.resolve(__dirname, '.');
const dirs = {
  src: path.resolve(root, 'src'),
  dist: path.resolve(root, 'dist')
};

const webpackConfig = isProd => ({
  mode: isProd ? 'production' : 'development',
  devtool: 'inline-source-map',
  entry: path.resolve(root, 'src/app/index.tsx'),
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      'chat-types': path.resolve(root, 'externals/chat-types')
    }
  },
  output: {
    path: path.resolve(__dirname, 'dist'), // string
    filename: 'bundle.js',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.tsx?$/, loader: 'ts-loader' },
      { test: /\.css?$/, loader: ['style-loader', 'css-loader'] },
    ],
  },
  devServer: {
    contentBase: dirs.dist,
    compress: true,
    port: 9000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(dirs.src, 'html/index.html'),
    }),
    new DotenvPlugin(),
  ],
});

module.exports = {
  webpackConfig,
  default: webpackConfig(true),
};
