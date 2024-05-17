const validate = require('express-validator')
const { Menu } = require('../models/entity')
const repositories = require('../repositories')

const menuRepo = new repositories.Menu()

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
    add = (req, res) => {
        let payload = new Menu({
            name: req.body.name,
            description: req.body.description,
            thumbnail: req.body.thumbnail,
            price: req.body.price,
            status: req.body.status,
            category_id: req.body.category_id,
        })
        const inserted = menuRepo.add(payload)
        if (inserted.length === 0) {
            res.sendStatus(406)
        }
        res.sendStatus(201)
    }
    getByID = (req, res) => {
        const id = Number(req.params.id)
        const menu = menuRepo.getByID(id)
        if (!menu) {
            res.sendStatus(404)
        }
        res.status(200).json(menu)
    }
    getList = (req, res) => {
        const list = menuRepo.getList({
            name: req.query.name,
            category_id: req.query.category_id
        })
        res.status(200).json(list)
    }
    remove = (req, res) => {
        const id = Number(req.params.id)
        const removed = menuRepo.remove(id)
        if (!removed) {
            res.sendStatus(406)
            return
        }
        res.sendStatus(202)
    }
    update = (req, res) => {
        const id = Number(req.params.id)
        let payload = new Menu({
            name: req.body.name,
            description: req.body.description,
            thumbnail: req.body.thumbnail,
            price: req.body.price,
            status: req.body.status,
            category_id: req.body.category_id,
        })
        let updated = menuRepo.update(id, payload)
        if (!updated) {
            res.sendStatus(406)
            return
        }
        res.sendStatus(202)
    }
    render = (req, res) => {
        res.render('menu', { "menuList": menuRepo.getList() })
    }
}

exports.MenuController = MenuController