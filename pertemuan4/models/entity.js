
class Menu {
    constructor({
        id = 0,
        name = '',
        description = '',
        thumbnail = '',
        price = '',
        status = 0,
        category_id = 0,
        create_at,
        create_by,
        update_at,
        update_by,
    }) {
        if (id != 0) {
            this.id = Number(id)
        }
        this.name = name
        this.description = description
        this.thumbnail = thumbnail
        this.price = price
        this.status = Number(status)
        this.category_id = Number(category_id)
        this.create_at = create_at
        if (create_by) {
            this.create_by = Number(create_by)
        }
        this.update_at = update_at
        if (update_by) {
            this.update_by = Number(update_by)
        }
    }
}

exports.Menu = Menu