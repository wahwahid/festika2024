/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.raw(`
    CREATE TABLE IF NOT EXISTS categories (
        id integer AUTO_INCREMENT PRIMARY KEY,
        name varchar(255) NOT NULL,
        status tinyint NOT NULL DEFAULT 0,
        created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        created_by integer,
        update_at timestamp,
        update_by integer
    );
    `)
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('categories')
};
