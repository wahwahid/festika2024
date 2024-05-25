class MenuRepository {
    constructor() {
        /**
         * 
         * @type {[import('../models/entity').Menu]} payload 
         */
        this.menuList = []
    }
    /**
     * 
     * @param {import('../models/entity').Menu} payload 
     */
    add = (payload) => {
        payload.id = this.menuList.length
        this.menuList.push(payload)
        return [payload.id]
    }
    /**
     * 
     * @param {number} id
     */
    getByID = (id) => {
        return this.menuList.find((v) => v.id === id)
    }
    /**
     * 
     * @param {string} filter.name
     * @param {number} filter.category_id
     */
    getList = (filter = { name: '', category_id: 0 }) => {
        return this.menuList.filter((v) => {
            let valid = true
            if (filter.name) {
                valid = valid && (v.name.toLowerCase().indexOf(filter.name) >= 0)
            }
            if (filter.category_id) {
                valid = valid && v.category_id === filter.category_id
            }
            return valid
        })
    }
    /**
     * 
     * @param {number} id
     */
    remove = (id) => {
        const found = this.getByID(id)
        if (!found) {
            return false
        }
        this.menuList = this.menuList.filter((v) => v.id !== id)
        return true
    }
    /**
     * 
     * @param {number} id
     * @param {import('../models/entity').Menu} payload 
     */
    update = (id, payload) => {
        let updated = false
        this.menuList = this.menuList.map((v) => {
            if (v.id == id) {
                payload.id = v.id
                v = payload
                updated = true
            }
            return v
        })
        return updated
    }
}

exports.MenuRepository = MenuRepository