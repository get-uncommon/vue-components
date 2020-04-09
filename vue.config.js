module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "~@/scss/_config.scss";',
      },
    },
  },
};
