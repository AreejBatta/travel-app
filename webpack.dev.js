import { CleanWebpackPlugin } from "clean-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import { fileURLToPath } from "url";
// import { GenerateSW } from "workbox-webpack-plugin";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


export default{
    entry:"./src/client/index.js",
    mode:"development",
    devtool: "source-map",
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'var',
        library: 'Client',
        clean: {
            dry: false,
            keep: /\.git/,
        },
    },
    devServer: {
    port: 8000, // Change the port to 3000 (or any other port)
    open: false, // Disable automatic browser opening
    static: {
      directory: path.resolve(__dirname, "dist"), // Serve files from the "dist" directory
    },
    hot: true, // Enable hot module replacement (HMR)
  },
    resolve: {
        extensions: [".js", ".jsx", ".json"],
      },
      module:{
        rules:[
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }, 
            {
                test:/\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
      },
      plugins:[
        new HtmlWebpackPlugin({
            template: './src/client/viewe/index.html',
            filename: "./index.html"
        }), 
        new CleanWebpackPlugin({
            dry: true,
            verbose: false,
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false,
        }),
        // new GenerateSW(), 
    ],
}