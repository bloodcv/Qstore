module.exports = {
  outputDir: "dist", // build输出目录 ，默认dist
  lintOnSave: false, // 是否开启eslint
  publicPath: "/", //配置项目路径
  productionSourceMap: process.env.NODE_ENV === "development", // sourceMap配置
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          // 设计稿宽度的1/10，一般为75,设计稿为750   为37.5 设计稿为375
          require("postcss-px2rem")({ remUnit: 37.5 }),
        ],
      },
    },
  },
  configureWebpack: {
    devtool: process.env.NODE_ENV === "development" ? "source-map" : undefined, // sourceMap配置
  },
  devServer: {
    open: true, // 是否自动弹出浏览器页面
    host: "0.0.0.0", //主机，0.0.0.0支持局域网地址，可以真机测试
    port: "7070",
    https: false, // 是否使用https协议
    hotOnly: true, // 是否开启热更新
    proxy: {
      // 配置跨域
      "/api": {
        target: "xxx", //接口地址
        // ws: true, //// 代理websockets
        changOrigin: true, // 虚拟的站点需要更管origin
        pathRewrite: {
          //重写路径
          "^/api": "",
        },
      },
    },
  },
};
