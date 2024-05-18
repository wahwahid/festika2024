/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('menus').del()
  await knex.schema.raw(`ALTER TABLE menus AUTO_INCREMENT = 1`)
  await knex('menus').insert([
    {
      name: 'Nasi Goreng',
      description: '',
      thumbnail: '',
      price: '15000',
      status: 1,
      category_id: 1,
    },
    {
      name: 'Nasi Kuning',
      description: '',
      thumbnail: '',
      price: '5000',
      status: 1,
      category_id: 1,
    },
    {
      name: 'Nasi Uduk',
      description: '',
      thumbnail: '',
      price: '10000',
      status: 1,
      category_id: 1,
    },
    {
      name: 'Teh Panas',
      description: '',
      thumbnail: '',
      price: '2000',
      status: 1,
      category_id: 2,
    },
    {
      name: 'Es Teh',
      description: '',
      thumbnail: '',
      price: '2000',
      status: 1,
      category_id: 2,
    },
    {
      name: 'Jeruk Panas',
      description: '',
      thumbnail: '',
      price: '2000',
      status: 1,
      category_id: 2,
    },
    {
      name: 'Es Jeruk',
      description: '',
      thumbnail: '',
      price: '2000',
      status: 1,
      category_id: 2,
    },
  ])
}
