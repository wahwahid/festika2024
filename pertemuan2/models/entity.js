
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

exports.Menu = Menu