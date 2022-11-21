module.exports = function (api) {
  api.cache(true);

  const presets = [
    [
      // Transform ES6+ into valid ES5 code
      '@babel/preset-env',
      {
        modules: false,
        targets: {
          browsers: [
            'last 2 Chrome versions',
            'last 2 Firefox versions',
            'last 2 Safari versions',
            'last 2 iOS versions',
            'last 1 Android version',
            'last 1 ChromeAndroid version',
            'ie 11',
          ],
        },
      },
    ],
    '@babel/preset-react', // Extends Babel support to JSX
  ];
  const plugins = [
    '@babel/plugin-proposal-class-properties', // Use properties directly on a class
  ];

  return {
    presets,
    plugins,
  };
};
