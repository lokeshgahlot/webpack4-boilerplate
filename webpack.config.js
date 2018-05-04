// 1 - Has a single javascript file as the entrypoint into the application
// 2 - Handles Javascript/ES6/React code with both .js and .jsx file extensions; should output a single ES5 .js bundle with a unique hash added to the filename.
// 3 - Handles SCSS code with .scss extensions; should output a single .css file with a unique hash added to the filename.
// 4 - Handles IMG file with .jpeg, .jpg, .png, and .gif extensions; should return a link referencing the file
// 5 - Handles SVG file with .svg extension; return a base-64 data-encoded string if the file is < 1mb and a link to the file otherwise

const webpack = require("webpack");
const path = require("path");

const HtmlWebPackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// HtmlWebPackPlugin copies html template and adds css and js bundle
const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html"
});

const env = process.env.NODE_ENV;

const fileLoaderOptions = {
    emitFile: true,
    name (file) {
        if (env === 'development') {
            return '[path][name].[ext]'
        }
        return './assets/[name].[ext]'
    }
}

module.exports = {
    entry: path.join(__dirname, "src/App.js"), // 1, application entrypoint 
    output: {
        path: path.join(__dirname, "public"),
        filename: "bundle.[chunkhash].js" // 2, chunkhash, for unique hash
    },
    module: {
        rules:[
            { //  2, Handles Javascript/ES6/React code 
                test: /\.(js|jsx)$/, // 2, Handles js and jsx extensions
                loader: "babel-loader", 
                exclude: /node_modules/
            },
            {  //3,  Handles SCSS code with .scss extensions
                test: /\.scss$/,
                    use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        'sass-loader',
                    ],
                }),
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/, // 4, Handles IMG file with .jpeg, .jpg, .png, and .gif
                use: [
                        {
                            loader: 'file-loader',
                            options: {
                                ...fileLoaderOptions
                            }
                        }
                ]
            },
            {
                test: /\.(svg)$/,  // 5, Handles SVG file
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1000000, // 1 megabyte
                            fallback: 'file-loader',
                            ...fileLoaderOptions
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        htmlPlugin,
        new ExtractTextPlugin("bundle.[chunkhash].css") // 3, chunkhash, for unique hash
    ],
    resolve: {
        extensions: ['.js', '.jsx'] // 2. Handles js and jsx
    }
}