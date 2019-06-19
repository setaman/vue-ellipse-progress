module.exports = {
  css: {
    extract: false
  }
  /* configureWebpack: () => {
    let config = {};
    if (process.env.NODE_ENV === "production") {
      config = {
        entry: {
          app: "./src/plugin.js"
        },
        optimization: {
          splitChunks: false
        }
      };
    }
    config.output = {
      filename: () => "vue-ellipse-progress.js"
    };
    return config;
  } */
};
