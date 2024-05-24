/* eslint-disable no-undef */
const { menuRouter } = require("./menu")

describe('menuRouter', () => {
    test('success', () => {
        const validationMw = {
            validateRequest: jest.fn()
        }
        const menuCtrl = {
            withValidID: jest.fn(),
            withValidBody: jest.fn(),
            add: jest.fn(),
            getList: jest.fn(),
            getByID: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
            render: jest.fn(),
        }

        const router = menuRouter(validationMw, menuCtrl)
        expect(router.stack.length).toBe(6)
    })
})