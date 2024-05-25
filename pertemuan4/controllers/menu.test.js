const { MenuController } = require("./menu")

/* eslint-disable no-undef */
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
            const res = {
                sendStatus: jest.fn()
            }
            const sendStatus = jest.spyOn(res, 'sendStatus')

            await ctrl.add(req, res)

            expect(sendStatus).toHaveBeenCalledTimes(1)
            expect(sendStatus).toHaveBeenCalledWith(201)
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
            const res = {
                sendStatus: jest.fn()
            }
            const sendStatus = jest.spyOn(res, 'sendStatus')

            await ctrl.add(req, res)

            expect(sendStatus).toHaveBeenCalledTimes(1)
            expect(sendStatus).toHaveBeenCalledWith(406)
        })
    })
})