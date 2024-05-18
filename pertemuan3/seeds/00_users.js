/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex.schema.raw(`ALTER TABLE users AUTO_INCREMENT = 1`)
  await knex('users').insert([
    {
      email: 'ngadimin@wahwahid.com',
      password: '',
      fullname: 'Ngadimin',
      status: 1,
      role: 'admin',
    },
    {
      email: 'paijo@wahwahid.com',
      password: '',
      fullname: 'Paijo',
      status: 1,
      role: 'user',
    },
  ])
}
