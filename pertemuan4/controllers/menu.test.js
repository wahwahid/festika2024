/* eslint-disable no-undef */
const { Menu } = require("../models/entity")
const { MenuController } = require("./menu")


const res = {
    statusCode: 200,
    status: function (code) {
        this.statusCode = code
    },
    json: jest.fn()
}
let resStatus
let resJson
beforeEach(() => {
    resStatus = jest.spyOn(res, 'status')
    resJson = jest.spyOn(res, 'json')
})

afterEach(() => {
    jest.clearAllMocks()
})

describe('MenuController', () => {
    describe('add', () => {
        test('add success', async () => {
            const menuRepo = {
                add: jest.fn().mockResolvedValue([2])
            }
            const ctrl = new MenuController(menuRepo)
            const req = {
                body: {
                    name: 'Nasi kuning',
                    category_id: 1,
                }
            }

            await ctrl.add(req, res)

            expect(resStatus).toHaveBeenCalledTimes(1)
            expect(resStatus).toHaveBeenCalledWith(201)
            const menu = new Menu({
                id: 2,
                name: 'Nasi kuning',
                category_id: 1,
            })
            expect(resJson).toHaveBeenCalledWith({
                code: 201,
                message: 'Created',
                data: {
                    menu
                }
            })
        })
        test('add failed', async () => {
            const menuRepo = {
                add: jest.fn().mockResolvedValue([])
            }
            const ctrl = new MenuController(menuRepo)
            const req = {
                body: {
                    name: 'Nasi kuning',
                    category_id: 1,
                }
            }

            await ctrl.add(req, res)

            expect(resStatus).toHaveBeenCalledTimes(1)
            expect(resStatus).toHaveBeenCalledWith(406)
            expect(resJson).toHaveBeenCalledWith({
                code: 406,
                message: 'Not Acceptable',
                data: {}
            })
        })
    })
})