const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DotenvPlugin = require('webpack-dotenv-plugin');

const rootDir = path.resolve(__dirname, '.');
const dirs = {
  src: path.resolve(rootDir, 'src'),
  dist: path.resolve(rootDir, 'dist')
};

const webpackConfig = isProd => {
  const config = ({
    mode: isProd ? 'production' : 'development',
    devtool: 'inline-source-map',
    entry: path.resolve(dirs.src, 'app/index.tsx'),
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
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
    ],
  });
  if (!isProd) {
    config.plugins.push(
      new DotenvPlugin({
        path: path.resolve(rootDir, '.env'),
        sample: path.resolve(rootDir, '.env.sample'),
      })
    )
  }
  return config;
}


module.exports = {
  webpackConfig,
  default: webpackConfig(true),
};
