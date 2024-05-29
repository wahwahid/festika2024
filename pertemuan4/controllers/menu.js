const validate = require('express-validator')
const { Menu } = require('../models/entity')
const { jsonResponse } = require('../helpers/express')

class MenuController {
    /**
     * 
     * @param {import('../repositories').MenuDB} menuRepo 
     */
    constructor(menuRepo) {
        this.menuRepo = menuRepo
        this.withValidID = [
            validate.param('id').notEmpty().isNumeric()
        ]
        this.withValidBody = [
            validate.body('name').notEmpty().isLength({ max: 255 }),
            validate.body('description').optional().isLength({ max: 255 }).escape(),
            validate.body('thumbnail').optional().isURL({
                require_protocol: false,
                require_host: false,
                require_tld: false
            }).isLength({ max: 255 }),
            validate.body('price').notEmpty().isNumeric(),
            validate.body('status').optional().isNumeric(),
            validate.body('category_id').notEmpty().isNumeric(),
        ]
    }
    add = async (req, res) => {
        let payload = new Menu({
            name: req.body.name,
            description: req.body.description,
            thumbnail: req.body.thumbnail,
            price: req.body.price,
            status: req.body.status,
            category_id: req.body.category_id,
        })
        const inserted = await this.menuRepo.add(payload)
        if (inserted.length === 0) {
            jsonResponse(res, {}, 406)
            return
        }
        const menu = { id: inserted[0], ...payload }
        jsonResponse(res, { menu }, 201)
    }
    getByID = async (req, res) => {
        const id = Number(req.params.id)
        const menu = await this.menuRepo.getByID(id)
        if (!menu) {
            jsonResponse(res, {}, 404)
            return
        }
        jsonResponse(res, { menu }, 200)
    }
    getList = async (req, res) => {
        const list = await this.menuRepo.getList({
            name: req.query.name,
            category_id: req.query.category_id
        })
        jsonResponse(res, { list }, 200)
    }
    remove = async (req, res) => {
        const id = Number(req.params.id)
        const removed = await this.menuRepo.remove(id)
        if (!removed) {
            jsonResponse(res, {}, 406)
            return
        }
        jsonResponse(res, {}, 202)
    }
    update = async (req, res) => {
        const id = Number(req.params.id)
        let payload = new Menu({
            name: req.body.name,
            description: req.body.description,
            thumbnail: req.body.thumbnail,
            price: req.body.price,
            status: req.body.status,
            category_id: req.body.category_id,
        })
        let updated = await this.menuRepo.update(id, payload)
        if (!updated) {
            jsonResponse(res, {}, 406)
            return
        }
        jsonResponse(res, {}, 202)
    }
    render = async (req, res) => {
        res.render('menu', {
            "menuList": await this.menuRepo.getList(),
            "auth": req.auth
        })
    }
}

exports.MenuController = MenuController