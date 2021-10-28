// Update with your config settings.
const knex = require("knex")
const config = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './ecommerce/msn.db3'
    }
  },
  useNullAsDefualt: true,
  
  pool: {min: 2, max: 8},



};
const database = knex(config.development)

module.exports = database