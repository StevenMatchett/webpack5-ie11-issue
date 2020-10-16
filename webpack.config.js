const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");
const babel = require("./babel.build")

module.exports = {
  mode: "production",
  devServer: {
    contentBase: path.join( "dist"),
    port: 3002,
  },
  output: {
    path: path.resolve(__dirname, 'dist/federated'),
    filename: `[name].js`,
  },

  module: {
    rules: [
      {
        test: /.m?js/,
        resolve: {
          fullySpecified: false // disable the behaviour
        }
      },
      {
        test: /bootstrap\.js$/,
        loader: "bundle-loader",
        options: {
          lazy: true,
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: babel
        }
      }
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "federated",
      library: { type: "var", name: "federated" },
      filename: "remoteEntry.js",
      exposes: {
        "./Footer": "./src/Footer",
      },
      shared: { react: { singleton: true }, "react-dom": { singleton: true} },
    }),
  ],
};
