const { withTamagui } = require("@tamagui/next-plugin");
// const withMdx = require("@next/mdx");

module.exports = ({ defaultConfig }) => {
  /** @type {import('next').NextConfig} */
  const config = {
    ...defaultConfig,
  };

  const tamaguiPlugin = withTamagui({
    config: "./tamagui.config.ts",
    components: ["tamagui"],
    outputCSS:
      process.env.NODE_ENV === "production" ? "./public/tamagui.css" : null,
    appDir: true,
    // We recommend using disableExtraction for better performance during dev mode. You still get the nice debugging helpers like file name, component name and line-numbers on every dom node.
    disableExtraction: process.env.NODE_ENV === "development",
  });

  return {
    ...config,
    ...tamaguiPlugin(config),
  };
};
