import { CleanWebpackPlugin } from "clean-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { GenerateSW } from "workbox-webpack-plugin"; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  entry: "./src/client/index.js",
  mode: "production",
  devtool: "hidden-source-map",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    libraryTarget: "var",
    library: "Client",
    clean: true,
  },
  resolve: {
    extensions: [".js", ".jsx", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/client/viewe/index.html",
      filename: "./index.html",
    }),
    new CleanWebpackPlugin({
      dry: false,
      verbose: true,
      cleanStaleWebpackAssets: true,
      protectWebpackAssets: false,
    }),
    new MiniCssExtractPlugin({ filename: "mini.css" }),
    new GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
    }), 
    
  ],
};
