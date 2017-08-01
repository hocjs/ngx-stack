function createConfig() {

  const baseUrl = process.env.API_BASE_URL || '//127.0.0.1:3000';
  const version = process.env.API_VERSION || 'api';
  const nodeEnv = process.env.NODE_ENV || 'development';

  const result = {
    baseUrl,
    version,
    nodeEnv,
  }

  return `window.apiConfig = ${JSON.stringify(result)}`
}

module.exports = function configMiddleware() {
  return(req, res) => {
    res.header('Content-Type', 'application/javascript')
    res.send(createConfig())
  }
}
