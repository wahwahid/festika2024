/* eslint-disable no-undef */
const { menuRouter } = require("./menu")

describe('menuRouter', () => {
    test('success', () => {
        const validationMw = {
            validateRequest: jest.fn()
        }
        const authMw = {
            loadJWT: jest.fn(),
            isLoggedIn: jest.fn(),
            isRole: jest.fn().mockImplementation(() => jest.fn()),
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

        const router = menuRouter(validationMw, authMw, menuCtrl)
        expect(router.stack.length).toBe(7)
    })
})