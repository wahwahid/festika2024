/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('discounts').del()
  await knex.schema.raw(`ALTER TABLE discounts AUTO_INCREMENT = 1`)
  await knex('discounts').insert([
    {
      name: 'diskon 10 %',
      type: 1,
      amount: '10',
      start_at: '2024-05-15 00:00:00',
      end_at: '2024-06-15 23:59:59',
      status: 1,
    },
    {
      name: 'diskon 2000',
      type: 0,
      amount: '2000',
      start_at: '2024-05-15 00:00:00',
      end_at: '2024-06-15 23:59:59',
      status: 1,
    },
    {
      name: 'diskon 5000',
      type: 0,
      amount: '5000',
      start_at: '2024-06-06 00:00:00',
      end_at: '2024-06-06 23:59:59',
      status: 1,
    },
  ])

  await knex('discounts_map_menus').del()
  await knex('discounts_map_menus').insert([
    {
      discount_id: 1,
      menu_id: 2,
    },
    {
      discount_id: 2,
      menu_id: 3,
    },
    {
      discount_id: 3,
      menu_id: 1,
    },
  ])
}
