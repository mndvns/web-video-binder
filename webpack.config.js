module.exports = {
  mode: "production",
  target: "web",
  entry: `${__dirname}/src/index.ts`,
  output: {
    path: `${__dirname}/dist`,
    filename: "index.js"
  },
  module: {
    rules: [
      {
        test: /.ts$/,
        loader: "ts-loader"
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js", ".json"]
  }
};
