/** @type {import('next').NextConfig} */

module.exports = {
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      poll: 200,
      aggregateTimeout: 100,
    }
    return config
  },
  reactStrictMode: true,
}
