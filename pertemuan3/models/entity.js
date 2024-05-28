
class Menu {
    constructor({
        id = 0,
        name = '',
        description = '',
        thumbnail = '',
        price = '',
        status = 0,
        category_id = 0,
        created_at,
        created_by,
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
        this.created_at = created_at
        if (created_by) {
            this.created_by = Number(created_by)
        }
        this.update_at = update_at
        if (update_by) {
            this.update_by = Number(update_by)
        }
    }
}

exports.Menu = Menu