const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './index.web.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.[contenthash].js', 
    clean: true, 
  },
  resolve: {
    alias: {
      'react-native$': 'react-native-web',
    },
    extensions: ['.web.js', '.js', '.json'],
    modules: [
    path.resolve(__dirname, 'node_modules'), 
    'node_modules' 
  ],
    fallback: {
      path:false,
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'], 
            },}
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
        templateContent: `
        <html>
          <head><meta charset="UTF-8"><title>React Native Web</title></head>
          <body><div id="app"></div></body>
        </html>
      `,
    }),
  ],
  devServer: {
    static: './public',
    port: 3000,
  },
};
