const AutoImport = require("unplugin-auto-import/webpack");
const Components = require("unplugin-vue-components/webpack");
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");

module.exports = {
  outputDir: "./build",
  css: {
    extract: false,
  },

  configureWebpack: {
    resolve: {
      alias: {
        components: "@/components",
      },
    },
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver({ importStyle: "false" })],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
    externals: {
      "BMap": "BMap"
  }
  },
};
