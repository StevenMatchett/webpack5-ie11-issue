module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        "targets": {
          "browsers": ["> 1%", "last 2 versions", "safari >= 9", "ie >= 11"]
        },
        "modules": false
      },
    ],
    ['@babel/preset-react']
  ],
  plugins: [
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    ['@babel/plugin-proposal-object-rest-spread', { loose: true }],
    // any package needs to declare 7.4.4 as a runtime dependency. default is ^7.0.0
    ['@babel/plugin-transform-runtime', { version: '^7.4.4' }],
    // for IE 11 support
    '@babel/plugin-transform-object-assign',
    '@babel/plugin-transform-arrow-functions'
  ],
  ignore: [/@babel[\\|/]runtime/], // Fix a Windows issue.
};
