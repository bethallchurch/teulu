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
          '@contact': './src/contact',
          '@customgraphql': './src/customgraphql',
          '@global': './src/global',
          '@graphql': './src/graphql',
          '@group': './src/group',
          '@message': './src/message',
          '@photo': './src/photo',
          '@styles': './src/styles',
          '@user': './src/user',
          '@home': './src/home',
          '@navigation': './src/navigation'
        }
      }]
    ]
  }
}
