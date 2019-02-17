const config = {};
config.server = {
  host: process.env.SERVER_HOST || 'localhost',
  port: process.env.SERVER_PORT || 3000
};
config.db = {
  url: process.env.DATABASE_URL
};

module.exports = config;
