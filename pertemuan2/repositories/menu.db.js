const { conn } = require('../service/database')
const { log } = require('../service/log')

class MenuDBRepository {
    constructor() {
        /**
        * @type { import("knex").Knex } knex
        */
        this.db = conn()
        this.table = 'menus'
    }
    /**
     * 
     * @param {import('../models/entity').Menu} payload 
     */
    add = (payload) => {
        return this.db(this.table).insert(payload).then((insertedID) => {
            return insertedID
        }).catch((err) => {
            log().error('error insert menu db', err)
            throw err
        })
    }
    /**
     * 
     * @param {number} id
     */
    getByID = (id) => {
        return this.db(this.table).where({ id }).first().then((data) => {
            return data
        }).catch((err) => {
            log().error('error get menu db by id', err)
            throw err
        })
    }
    /**
     * 
     * @param {string} filter.name
     * @param {number} filter.category_id
     */
    getList = (filter = { name: '', category_id: 0 }) => {
        return this.db(this.table).where((that) => {
            let condition = {}
            if (filter.category_id) {
                condition.category_id = filter.category_id
            }
            that.where(condition)
            if (filter.name) {
                that.whereILike('name', `%${filter.name}%`)
            }
        }).then((data) => {
            return data
        }).catch((err) => {
            log().error('error get menu db by id', err)
            throw err
        })
    }
    /**
     * 
     * @param {number} id
     */
    remove = (id) => {
        return this.db(this.table).where({ id }).del().then((affected) => {
            return affected > 0
        }).catch((err) => {
            log().error('error delete menu db by id', err)
            throw err
        })
    }
    /**
     * 
     * @param {number} id
     * @param {import('../models/entity').Menu} payload 
     */
    update = (id, payload) => {
        payload.update_at = this.db.fn.now()
        return this.db(this.table).where({ id }).update(payload).then((affected) => {
            return affected > 0
        }).catch((err) => {
            log().error('error update menu db by id', err)
            throw err
        })
    }
}

exports.MenuDBRepository = MenuDBRepository