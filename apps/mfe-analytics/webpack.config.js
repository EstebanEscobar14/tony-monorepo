const { join } = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = (_, argv = {}) => {
  const mode = argv.mode ?? 'development';
  const isProduction = mode === 'production';

  return {
    mode,
    entry: {
      'analytics-element': join(__dirname, 'src/analytics-bootstrap.tsx'),
    },
    output: {
      path: join(__dirname, '../../dist/mfe-analytics'),
      filename: '[name].js',
      publicPath: 'auto',
      clean: true,
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      plugins: [
        new TsconfigPathsPlugin({
          configFile: join(__dirname, '../../tsconfig.base.json'),
        }),
      ],
    },
    module: {
      rules: [
        {
          test: /\.[jt]sx?$/,
          exclude: /node_modules/,
          use: {
            loader: require.resolve('babel-loader'),
            options: {
              babelrc: false,
              configFile: false,
              presets: [
                [
                  require.resolve('@babel/preset-typescript'),
                  {
                    allExtensions: true,
                    isTSX: true,
                  },
                ],
                [
                  require.resolve('@babel/preset-react'),
                  {
                    runtime: 'automatic',
                    development: !isProduction,
                  },
                ],
              ],
            },
          },
        },
        {
          test: /\.css$/i,
          use: [require.resolve('style-loader'), require.resolve('css-loader')],
        },
        {
          test: /\.(png|jpe?g|gif|svg|woff2?|ttf|eot)$/i,
          type: 'asset/resource',
        },
      ],
    },
    devtool: isProduction ? 'source-map' : 'eval-cheap-module-source-map',
    devServer: {
      port: 4203,
      hot: false,
      liveReload: true,
      historyApiFallback: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': '*',
      },
      static: {
        directory: join(__dirname, 'public'),
      },
    },
    optimization: {
      runtimeChunk: false,
      splitChunks: false,
      minimize: isProduction,
    },
  };
};
