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
          '@albums': './src/albums',
          '@auth': './src/auth',
          '@contacts': './src/contacts',
          '@global': './src/global',
          '@graphql': './src/graphql',
          '@groups': './src/groups',
          '@messages': './src/messages',
          '@photos': './src/photos',
          '@styles': './src/styles',
          '@user': './src/user',
          '@App': './src/App',
          '@Navigator': './src/Navigator'
        }
      }]
    ]
  }
}
