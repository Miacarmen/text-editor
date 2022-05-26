const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require("path");
// require InjectManifest class of WorkBoxPlugin
const { InjectManifest } = require("workbox-webpack-plugin");

// Configure workbox plugins for a service worker and manifest file.

module.exports = () => {
  return {
    mode: "development",
    // entry point for files
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    // outputs dist for bundles
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    plugins: [
      // webpack that generates html file and injects bundles
      new HtmlWebpackPlugin({
        template: "./index.html",
        title: "JATE",
      }),
      // injects custom service worker
      new InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "src-sw.js",
      }),
      // creates manifest.json file
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: "Just Another Text Editor",
        short_name: "JATE",
        description: "Take notes with Javascript syntax highlighting!",
        background_color: "#21211e",
        theme_color: "#352442",
        start_url: "/",
        publicPath: "/",
        icons: [
          {
            src: path.resolve("src/images/logo.png"),
            size: [96, 128, 192, 256, 384, 512],
            destination: path.join("assets", "icons"),
          },
        ],
      }),
    ],
    // Add CSS loaders and babel to webpack.
    module: {
      // CSS loaders
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
          // use: [MiniCssExtractPlugin.loader, 'css-loader']
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          // use babel-loader in order to use ES6
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};
