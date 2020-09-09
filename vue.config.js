"use strict";
const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}
debugger;
module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
  outputDir: "dist",
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
