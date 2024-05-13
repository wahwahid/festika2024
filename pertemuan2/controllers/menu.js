class Menu {
    constructor({
        id = 0,
        name = '',
        description = '',
        thumbnail = '',
        price = '',
        status = 0,
        category_id = 0,
    }) {
        this.id = Number(id)
        this.name = name
        this.description = description
        this.thumbnail = thumbnail
        this.price = price
        this.status = Number(status)
        this.category_id = Number(category_id)
    }
}

class MenuController {
    constructor() {
        this.menuList = []
    }
    add = (req, res) => {
        let payload = new Menu({
            id: this.menuList.length,
            name: req.body.name,
            description: req.body.description,
            thumbnail: req.body.thumbnail,
            price: req.body.price,
            status: req.body.status,
            category_id: req.body.category_id,
        })
        this.menuList.push(payload)
        res.sendStatus(201)
    }
    getByID = (req, res) => {
        const id = Number(req.params.id)
        const menu = this.menuList.find((v) => v.id === id)
        if (!menu) {
            res.sendStatus(404)
        }
        res.status(200).json(menu)
    }
    getList = (req, res) => {
        let filter = {
            name: req.query.name,
            category_id: req.query.category_id
        }
        const list = this.menuList.filter((v) => {
            let valid = true
            if (filter.name) {
                valid = valid && (v.name.toLowerCase().indexOf(filter.name) >= 0)
            }
            if (filter.category_id) {
                valid = valid && v.category_id === filter.category_id
            }
            return valid
        })
        res.status(200).json(list)
    }
    remove = (req, res) => {
        const id = Number(req.params.id)
        const found = this.menuList.find((v) => v.id === id)
        if (!found) {
            res.sendStatus(404)
            return
        }
        this.menuList = this.menuList.filter((v) => v.id !== id)
        res.sendStatus(202)
    }
    update = (req, res) => {
        const id = Number(req.params.id)
        let updated = false
        this.menuList = this.menuList.map((v) => {
            if (v.id == id) {
                v = new Menu({
                    id: id,
                    name: req.body.name,
                    description: req.body.description,
                    thumbnail: req.body.thumbnail,
                    price: req.body.price,
                    status: req.body.status,
                    category_id: req.body.category_id,
                })
                updated = true
            }
            return v
        })
        if (!updated) {
            res.sendStatus(406)
            return
        }
        res.sendStatus(202)
    }
    render = (req, res) => {
        res.render('menu', { "menuList": this.menuList })
    }
}

exports.MenuController = MenuController