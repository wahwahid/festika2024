/* eslint-disable no-undef */
const express = require('express')
const request = require('supertest')
const { ValidationMiddleware } = require('../middlewares/validation')
const { menuRouter } = require("../routes/menu")
const { MenuController } = require("../controllers/menu")

let app
let validationMw
beforeEach(() => {
    app = express()
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())

    validationMw = new ValidationMiddleware()
})

describe('IntegrationTest /menu', () => {
    describe('Create a menu', () => {
        it('POST /menu fail validation', async () => {
            const menuRepo = {}

            const menuCtrl = new MenuController(menuRepo)
            app.use('/menu', menuRouter(validationMw, menuCtrl))

            const response = await request(app).post('/menu/').send()

            expect(response.status).toEqual(400)
        })
        it('POST /menu fail not inserted', async () => {
            const menuRepo = {
                add: jest.fn().mockResolvedValue([])
            }

            const menuCtrl = new MenuController(menuRepo)
            app.use('/menu', menuRouter(validationMw, menuCtrl))

            const response = await request(app).post('/menu/').send({
                name: 'Nasi Kuning',
                price: '5000',
                category_id: '1',
            })

            expect(response.status).toEqual(406)
        })
        it('POST /menu success inserted', async () => {
            const menuRepo = {
                add: jest.fn().mockResolvedValue([22])
            }

            const menuCtrl = new MenuController(menuRepo)
            app.use('/menu', menuRouter(validationMw, menuCtrl))

            const response = await request(app).post('/menu/').send({
                name: 'Nasi Kuning',
                price: '5000',
                category_id: '1',
            })

            expect(response.status).toEqual(201)
        })
    })
    describe('Get a menu', () => {
        it('GET /menu/:id fail validation', async () => {
            const menuRepo = {}

            const menuCtrl = new MenuController(menuRepo)
            app.use('/menu/', menuRouter(validationMw, menuCtrl))

            const response = await request(app).get('/menu/abc').send()

            expect(response.status).toEqual(400)
        })
        it('GET /menu/:id fail insert db', async () => {
            const menuRepo = {
                getByID: jest.fn().mockResolvedValue()
            }

            const menuCtrl = new MenuController(menuRepo)
            app.use('/menu/', menuRouter(validationMw, menuCtrl))

            const response = await request(app).get('/menu/123').send()

            expect(response.status).toEqual(404)
        })
        it('GET /menu/:id success insert', async () => {
            const menuRepo = {
                getByID: jest.fn().mockResolvedValue({
                    name: 'Nasi Kuning',
                    price: 5000,
                    category_id: 1,
                })
            }

            const menuCtrl = new MenuController(menuRepo)
            app.use('/menu/', menuRouter(validationMw, menuCtrl))

            const response = await request(app).get('/menu/123').send()

            expect(response.status).toEqual(200)
            expect(response.body).toStrictEqual({
                name: 'Nasi Kuning',
                price: 5000,
                category_id: 1,
            })
        })
    })
})