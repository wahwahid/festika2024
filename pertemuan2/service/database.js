const knex = require('knex')

/**
 * @type { import("knex").Knex } knex
 */
let db

/**
 * @param { import("knex").Knex.Config } options
 * @returns { import("knex").Knex } knex
 */
function Connect(options) {
    db = knex(options)
    return db
}

function conn() {
    if (db == null) {
        throw new Error("Database connection not initialized!")
    }
    return db
}

exports.Connect = Connect
exports.conn = conn