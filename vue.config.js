module.exports = {
  css: {
    extract: false,
  },
  productionSourceMap: false,
  // see issue https://github.com/vuejs/vue-loader/issues/1734
  chainWebpack: (config) => {
    config.module
      .rule("vue")
      .use("vue-loader")
      .loader("vue-loader")
      .tap((options) => {
        options.isServerBuild = false;
        return options;
      });
  },
};
