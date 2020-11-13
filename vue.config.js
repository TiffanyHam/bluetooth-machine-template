/*
 * @Descripttion:
 * @version:
 * @Author: Tiffany
 * @Date: 2020-08-26 17:45:50
 * @LastEditors: Tiffany
 * @LastEditTime: 2020-11-13 17:40:12
 */
"use strict";
const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
  outputDir: path.resolve(__dirname, "../1.0"),
  assetsDir: "static",
  productionSourceMap: false,
  devServer: {
    port: 8080,
    open: true,
    hot: true
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    resolve: {
      alias: {
        "@": resolve("src")
      }
    }
  },
  css: {
    loaderOptions: {
      css: {},
      postcss: {
        plugins: [
          require("postcss-px2rem")({
            remUnit: 36
          })
        ]
      }
    }
  }
};
