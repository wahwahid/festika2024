const express = require('express')
const { conn } = require('../service/database')
const { jsonResponse, asyncHandler } = require('../helpers/express')
const { log } = require('../service/log')
const router = express.Router()

router.get('/table/:table', (req, res) => {
    conn().select('*').from(req.params.table).where(req.query)
        .then((data) => {
            res.send(data)
        }, (err) => {
            res.send(err)
        })
})

router.get('/menu-with-disc', (req, res) => {
    conn().select('m.*', 'd.type as disc_type', 'd.amount as disc_amount', 'd.name AS disc_name').from('menus as m')
        .leftJoin('discounts_map_menus as dmm', (that) => {
            that.on('dmm.menu_id', '=', 'm.id')
        })
        .leftJoin('discounts as d', (that) => {
            that.on('d.id', '=', 'dmm.discount_id')
            that.andOn('d.status', '=', 1)
            that.andOn(conn().fn.now(), '>=', 'd.start_at')
            that.andOn(conn().fn.now(), '<=', 'd.end_at')
        })
        .where('m.status', 1)
        .andWhere((that) => {
            if (req.query.name) {
                that.whereILike('m.name', `%${req.query.name}%`)
            }
            if (req.query.category_id) {
                that.where('m.category_id', req.query.category_id)
            }
        })
        .then((data) => {
            res.send(data)
        }, (err) => {
            res.send(err)
        })
})

router.get('/menu-with-disc-cat', asyncHandler(async (req, res) => {
    return conn().raw(`
    SELECT 
        m.id, m.name, m.description, m.thumbnail, m.price, m.status, m.category_id
        , c.name as category_name
        , d.type as disc_type, d.amount as disc_amount, d.name as disc_name
    FROM menus as m 
    LEFT JOIN categories as c
        ON c.id = m.category_id AND c.status = 1
    LEFT JOIN discounts_map_menus as dmm 
        ON dmm.menu_id = m.id 
    LEFT JOIN discounts as d 
        ON d.id = dmm.discount_id AND d.status = 1 AND NOW() BETWEEN d.start_at AND d.end_at
    WHERE m.status = 1 AND (
        m.name LIKE :name
        AND CASE WHEN :category_id <> 0
            THEN m.category_id = :category_id
            ELSE TRUE
            END
    )
    `, {
        name: `%${req.query.name || ''}%`,
        category_id: req.query.category_id || 0,
    })
        .then(([data]) => {
            return data
        }).catch((err) => {
            log().error('repo: err query get list with disc and cat', err)
            throw new Error('database error')
        }).then((menus) => {
            return menus.map((v) => {
                if (v.disc_type == null && req.auth) {
                    v.disc_type = 0
                    v.disc_amount = 500
                    v.disc_name = 'Diskon member 500'
                }
                switch (v.disc_type) {
                    case 1:
                        v.price_final = String(v.price - (v.disc_amount / 100 * v.price))
                        break;
                    case 0:
                        v.price_final = String(v.price - v.disc_amount)
                        break;
                    default:
                        v.price_final = String(v.price)
                        break;
                }
                return v
            })
        }).catch((err) => {
            log().error('usecase: err get list with disc and cat', err)
            throw new Error('problem when get menu list data')
        }).then((list) => {
            jsonResponse(res, { list })
        }).catch((err) => {
            jsonResponse(res, { list: [] }, 500, err.message)
        })
}))

module.exports = router