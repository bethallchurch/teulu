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
          '@chats': './src/chats',
          '@contacts': './src/contacts',
          '@global': './src/global',
          '@graphql': './src/graphql',
          '@groups': './src/groups',
          '@photos': './src/photos',
          '@splash': './src/splash',
          '@styles': './src/styles',
          '@user': './src/user'
        }
      }]
    ]
  }
}
