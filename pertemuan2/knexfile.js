// Update with your config settings.
require('dotenv').config()
function buildConfig() {
  return {
    debug: process.env.DATABASE_DEBUG,
    client: process.env.DATABASE_DRIVER || 'mysql2',
    connection: process.env.DATABASE_URL,
  }
}

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: buildConfig(),
  staging: buildConfig(),
  production: buildConfig()
};
