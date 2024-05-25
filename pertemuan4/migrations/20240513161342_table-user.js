/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.hasTable('users').then((exist) => {
        if (!exist) {
            return knex.schema.createTable('users', (table) => {
                table.increments('id').primary()
                table.string("email", 255).notNullable()
                table.string("password", 255).notNullable()
                table.string("fullname", 50).notNullable()
                table.tinyint("status").notNullable().defaultTo(0)
                table.string("role", 20)
                table.timestamp("created_at").notNullable().defaultTo(knex.fn.now())
                table.integer("created_by")
                table.timestamp("update_at")
                table.integer("update_by")
                return table
            })
        }
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users')
};
