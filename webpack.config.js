const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (ENV, argv) => {
  const isProd = argv.mode === 'production';
  const isDev = !isProd;

  const filename = (ext) => (isProd ? `[name].[contenthash]bundle.${ext}` : `[name].bundle.${ext}`);

  return {
    context: path.join(__dirname, 'src'),
    entry: {
      main: './index.js',
    },
    resolve: {
      extensions: ['.js'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@core': path.resolve(__dirname, 'src', 'core'),
      },
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: filename('js'),
      clean: true,
    },
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      hot: true,
      port: 3000,
      historyApiFallback: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        favicon: './favicon',
        template: './index.html',
      }),
      new MiniCssExtractPlugin({
        filename: filename('css'),
      }),
    ],
    devtool: isDev ? 'source-map' : false,
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            { loader: MiniCssExtractPlugin.loader },
            { loader: 'css-loader' },
            { loader: 'postcss-loader' },
            { loader: 'sass-loader' },
          ],
        },
      ],
    },
  };
};
