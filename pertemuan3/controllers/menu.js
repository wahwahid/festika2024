const validate = require('express-validator')
const { Menu } = require('../models/entity')
const repositories = require('../repositories')

const menuRepo = new repositories.MenuDB()

class MenuController {
    constructor() {
        this.withValidID = [
            validate.param('id').notEmpty().isNumeric()
        ]
        this.withValidBody = [
            validate.body('name').notEmpty().isLength({ max: 255 }),
            validate.body('description').optional().isLength({ max: 255 }),
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
        const inserted = await menuRepo.add(payload)
        if (inserted.length === 0) {
            res.sendStatus(406)
        }
        res.sendStatus(201)
    }
    getByID = async (req, res) => {
        const id = Number(req.params.id)
        const menu = await menuRepo.getByID(id)
        if (!menu) {
            res.sendStatus(404)
        }
        res.status(200).json(menu)
    }
    getList = async (req, res) => {
        const list = await menuRepo.getList({
            name: req.query.name,
            category_id: req.query.category_id
        })
        res.status(200).json(list)
    }
    remove = async (req, res) => {
        const id = Number(req.params.id)
        const removed = await menuRepo.remove(id)
        if (!removed) {
            res.sendStatus(406)
            return
        }
        res.sendStatus(202)
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
        let updated = await menuRepo.update(id, payload)
        if (!updated) {
            res.sendStatus(406)
            return
        }
        res.sendStatus(202)
    }
    render = async (req, res) => {
        res.render('menu', { "menuList": await menuRepo.getList() })
    }
}

exports.MenuController = MenuController