// Load static fonts
require('typeface-merriweather');

exports.onInitialClientRender = require('./src/gatsby/browser/onInitialClientRender');
exports.onRouteUpdate = require('./src/gatsby/browser/onRouteUpdate');
exports.shouldUpdateScroll = require('./src/gatsby/browser/shouldUpdateScroll');
exports.onClientEntry = require('./src/gatsby/browser/onClientEntry');
exports.wrapRootElement = require('./src/state/wrap-with-provider').wrappedProvider;
