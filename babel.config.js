module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-typescript",
  ],
  plugins: [
    ["macros"],
    [
      "module-resolver",
      {
        alias: {
          src: "./src/",
          "@providers": "./src/providers/",
          "@middlewares": "./src/middlewares/",
          "@constants": "./src/constants/",
          "@helpers": "./src/helpers/",
          "@data": "./src/data/",
          "@database": "./src/database/",
        },
      },
    ],
    "transform-decorators-legacy",
    ["transform-class-properties"]
  ],
};
