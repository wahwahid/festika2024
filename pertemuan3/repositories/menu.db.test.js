/* eslint-disable no-undef */
const { MenuDBRepository } = require('./menu.db')
const { Menu } = require('../models/entity')

describe('MenuRepositories', () => {
    describe('add', () => {
        test('add success', () => {
            const db = jest.fn().mockImplementation(() => {
                return {
                    insert: jest.fn().mockReturnThis(),
                    then: jest.fn().mockResolvedValue([1])
                }
            })

            const menu = new MenuDBRepository(db)
            menu.add(new Menu({
                create_by: 1,
            })).then((inserted) => {
                expect(inserted).toStrictEqual([1])
            })
        })
        test('add error', () => {
            const db = jest.fn().mockImplementation(() => {
                return {
                    insert: jest.fn().mockReturnThis(),
                    then: jest.fn().mockRejectedValue(new Error("expected"))
                }
            })

            const menu = new MenuDBRepository(db)
            menu.add(new Menu({
                create_by: 1,
            })).catch((err) => {
                expect(err.message).toBe('expected')
            })
        })
    })

    describe('getByID', () => {
        test('getByID success', () => {
            const db = jest.fn().mockImplementation(() => {
                return {
                    where: jest.fn().mockReturnThis(),
                    first: jest.fn().mockReturnThis(),
                    then: jest.fn().mockResolvedValue(new Menu({
                        id: 1,
                        name: 'Nasi goreng'
                    }))
                }
            })

            const menu = new MenuDBRepository(db)
            menu.getByID(1).then((item) => {
                expect(item).toStrictEqual(new Menu({
                    id: 1,
                    name: 'Nasi goreng'
                }))
            })
        })
        test('getByID error', () => {
            const db = jest.fn().mockImplementation(() => {
                return {
                    where: jest.fn().mockReturnThis(),
                    first: jest.fn().mockReturnThis(),
                    then: jest.fn().mockRejectedValue(new Error("expected"))
                }
            })

            const menu = new MenuDBRepository(db)
            menu.getByID(1).catch((err) => {
                expect(err.message).toBe('expected')
            })
        })
    })

    describe('getList', () => {
        test('getList success', () => {
            const db = jest.fn().mockImplementation(() => {
                return {
                    where: jest.fn().mockReturnThis(),
                    then: jest.fn().mockResolvedValue([new Menu({
                        id: 1,
                        name: 'Nasi goreng'
                    })])
                }
            })

            const menu = new MenuDBRepository(db)
            menu.getList({}).then((list) => {
                expect(list).toStrictEqual([new Menu({
                    id: 1,
                    name: 'Nasi goreng'
                })])
            })
        })
        test('getList error', () => {
            const db = jest.fn().mockImplementation(() => {
                return {
                    where: jest.fn().mockReturnThis(),
                    then: jest.fn().mockRejectedValue(new Error("expected"))
                }
            })

            const menu = new MenuDBRepository(db)
            menu.getList({}).catch((err) => {
                expect(err.message).toBe('expected')
            })
        })
    })

    describe('remove', () => {
        test('remove success', () => {
            const db = jest.fn().mockImplementation(() => {
                return {
                    where: jest.fn().mockReturnThis(),
                    del: jest.fn().mockReturnThis(),
                    then: jest.fn().mockResolvedValue(true)
                }
            })

            const menu = new MenuDBRepository(db)
            menu.remove(1).then((affected) => {
                expect(affected).toStrictEqual(true)
            })
        })
        test('remove error', () => {
            const db = jest.fn().mockImplementation(() => {
                return {
                    where: jest.fn().mockReturnThis(),
                    del: jest.fn().mockReturnThis(),
                    then: jest.fn().mockRejectedValue(new Error("expected"))
                }
            })

            const menu = new MenuDBRepository(db)
            menu.remove(1).catch((err) => {
                expect(err.message).toBe('expected')
            })
        })
    })

    describe('update', () => {
        test('update success', () => {
            const db = jest.fn().mockImplementation(() => {
                return {
                    where: jest.fn().mockReturnThis(),
                    update: jest.fn().mockReturnThis(),
                    then: jest.fn().mockResolvedValue(true)
                }
            })
            db.fn = {
                now: jest.fn()
            }

            const menu = new MenuDBRepository(db)
            menu.update(1, new Menu({
                id: 1,
                update_by: 1,
            })).then((affected) => {
                expect(affected).toStrictEqual(true)
            })
        })
        test('update error', () => {
            const db = jest.fn().mockImplementation(() => {
                return {
                    where: jest.fn().mockReturnThis(),
                    update: jest.fn().mockReturnThis(),
                    then: jest.fn().mockRejectedValue(new Error("expected"))
                }
            })
            db.fn = {
                now: jest.fn()
            }

            const menu = new MenuDBRepository(db)
            menu.update(1, new Menu({
                id: 1,
                update_by: 1,
            })).catch((err) => {
                expect(err.message).toBe('expected')
            })
        })
    })
})
