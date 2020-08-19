'use strict'

var didRunAlready = false;

exports.onPreInit = function(_ref, pluginOptions) {
  
  // Gatsby adds a pluginOptions that's not needed for this plugin
  delete pluginOptions.plugins

  if (didRunAlready) {
    throw new Error('You can only have single instance of gatsby-plugin-social9-comment in your gatsby-config.js')
  }
  didRunAlready = true
}

exports.onCreateWebpackConfig = ({ plugins, actions, }) => {
  var setWebpackConfig = actions.setWebpackConfig
  setWebpackConfig({
    plugins: [plugins.define({})]
  })
}