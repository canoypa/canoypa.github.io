import { CleanWebpackPlugin } from "clean-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import HardSourceWebpackPlugin from "hard-source-webpack-plugin";
import HTMLWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { resolve } from "path";
import sass from "sass";
import PrerenderPlugin from "./scripts/webpack-plugins/prerender";

type BuildEnv = {
  mode: string;
};

const createConfig = (env: BuildEnv) => {
  const isProd = env.mode === "prod";

  return {
    mode: isProd ? "production" : "development",

    output: { filename: "[name].js", path: resolve("docs") },

    entry: {
      index: resolve("./src/index.tsx"),
    },

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /(node_modules)/,
          use: ["babel-loader", "ts-loader"],
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: "html-loader",
              options: { attributes: false, minimize: true },
            },
          ],
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                modules: {
                  localIdentName: isProd
                    ? "[hash:8]"
                    : "[folder]-[local]-[hash:8]",
                  context: resolve("src"),
                },
                importLoaders: 2,
                sourceMap: true,
              },
            },
            "postcss-loader",
            {
              loader: "sass-loader",
              options: {
                sourceMap: true,
                implementation: sass,
                sassOptions: { includePaths: ["node_modules"] },
              },
            },
          ],
        },
      ],
    },

    devtool: isProd ? undefined : "source-map",

    resolve: { extensions: [".js", ".ts", ".tsx"] },

    plugins: [
      new CopyWebpackPlugin({
        patterns: [{ from: "src/_", to: "_" }],
      }),
      new HTMLWebpackPlugin({ template: "src/index.html", inject: false }),
      new MiniCssExtractPlugin(),
      new HardSourceWebpackPlugin(),
      new HardSourceWebpackPlugin.ExcludeModulePlugin([
        { test: /mini-css-extract-plugin[\\/]dist[\\/]loader/ },
      ]),
      new CleanWebpackPlugin(),
      new PrerenderPlugin(),
    ],
  };
};

module.exports = (env: BuildEnv) => createConfig(env);
