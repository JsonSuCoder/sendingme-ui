const postcss = require("rollup-plugin-postcss");
const replace = require("@rollup/plugin-replace");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const image = require("@rollup/plugin-image");
const svgr = require("@svgr/rollup");

module.exports = {
  /**
   * @param {import('rollup/dist/rollup').InputOptions} config
   */
  rollup(config, options) {
    config.plugins.push(
      postcss({
        modules: false,
        extensions: ["css", "scss"],
        plugins: [
          // cssUrl({
          //   imgOutput: "dist/imgs",
          //   imgExtensions: /\.(png|jpg|jpeg|gif|svg)$/,
          //   limit: 8192,
          //   hash: false,
          //   slash: false,
          // }),
          autoprefixer(),
          cssnano({
            preset: "default",
          }),
        ],
        inject: false,
        // only write out CSS for the first bundle (avoids pointless extra files):
        extract: !!options.writeMeta,
      }),
      svgr({ icon: true }),
    );
    config.plugins.unshift(image());
    // TODO 'preventAssignment' currently defaults to false. It is recommended to set this option to `true`, as the next major version will default this option to `true`.
    config.plugins = config.plugins.map((p) =>
      p.name === "replace"
        ? replace({
            "process.env.NODE_ENV": JSON.stringify(options.env),
            preventAssignment: true,
          })
        : p
    );

    return config;
  },
};
