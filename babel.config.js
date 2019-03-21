module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['module-resolver', {
        'extensions': [
          '.js',
          '.ios.js',
          '.android.js'
        ],
        'alias': {
          '@assets': './assets',
          '@album': './src/album',
          '@auth': './src/auth',
          '@client': './src/client',
          '@contact': './src/contact',
          '@mygraphql': './src/mygraphql',
          '@global': './src/global',
          '@graphql': './src/graphql',
          '@group': './src/group',
          '@photo': './src/photo',
          '@styles': './src/styles',
          '@user': './src/user',
          '@navigation': './src/navigation'
        }
      }]
    ]
  }
}
