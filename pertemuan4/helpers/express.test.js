/* eslint-disable no-undef */
const { jsonResponse } = require("./express")

const res = {
    statusCode: 200,
    status: function (code) {
        this.statusCode = code
    },
    json: jest.fn()
}
let spyStatus
let spyJson
beforeEach(() => {
    spyStatus = jest.spyOn(res, 'status')
    spyJson = jest.spyOn(res, 'json')
})

afterEach(() => {
    jest.clearAllMocks()
})

describe('express', () => {
    describe('jsonResponse', () => {
        test('default empty all', () => {
            jsonResponse(res, null)
            expect(spyStatus).toHaveBeenCalledTimes(0)
            expect(spyJson).toHaveBeenCalledWith({
                code: 200,
                message: 'OK',
                data: {}
            })
        })
        test('set data', () => {
            jsonResponse(res, { foo: { bar: true } })
            expect(spyStatus).toHaveBeenCalledTimes(0)
            expect(spyJson).toHaveBeenCalledWith({
                code: 200,
                message: 'OK',
                data: { foo: { bar: true } }
            })
        })
        test('set status', () => {
            jsonResponse(res, { foo: { bar: true } }, 201)
            expect(spyStatus).toHaveBeenCalledWith(201)
            expect(spyJson).toHaveBeenCalledWith({
                code: 201,
                message: 'Created',
                data: { foo: { bar: true } }
            })
        })
        test('set message', () => {
            jsonResponse(res, { foo: { bar: true } }, 201, 'Saved')
            expect(spyStatus).toHaveBeenCalledWith(201)
            expect(spyJson).toHaveBeenCalledWith({
                code: 201,
                message: 'Saved',
                data: { foo: { bar: true } }
            })
        })
        test('set code', () => {
            jsonResponse(res, { foo: { bar: true } }, 201, 'Saved', 2019)
            expect(spyStatus).toHaveBeenCalledWith(201)
            expect(spyJson).toHaveBeenCalledWith({
                code: 2019,
                message: 'Saved',
                data: { foo: { bar: true } }
            })
        })
    })
})