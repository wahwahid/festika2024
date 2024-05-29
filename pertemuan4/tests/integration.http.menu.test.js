/* eslint-disable no-undef */
const express = require('express')
const request = require('supertest')
const middlewares = require('../middlewares')
const { menuRouter } = require("../routes/menu")
const controllers = require("../controllers")
const { authRouter } = require('../routes/auth')
const { hashSync } = require('bcrypt')

const jwtSecret = "ssshhhhh"
const dbAuth = jest.fn().mockImplementation(() => {
    return {
        select: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        first: jest.fn().mockResolvedValue({
            email: 'admin@ema.il',
            password: hashSync('pass', 1),
            role: 'admin'
        }),
    }
})
let app
let validationMw
let authMw
let token
beforeEach(async () => {
    app = express()
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())

    validationMw = new middlewares.Validation()
    authMw = new middlewares.Auth(jwtSecret)

    app.use('/auth', authRouter(validationMw, jwtSecret, dbAuth, authMw))

    const response = await request(app).post('/auth/login').send({
        email: 'admin@ema.il',
        password: 'pass',
    })
    token = response.body.token
})

describe('IntegrationTest /menu', () => {
    describe('Create a menu', () => {
        it('POST /menu fail validation', async () => {
            const menuRepo = {}

            const menuCtrl = new controllers.Menu(menuRepo)
            app.use('/menu', menuRouter(validationMw, authMw, menuCtrl))

            const response = await request(app).post('/menu/').send()
                .set('Authorization', `Bearer ${token}`)

            expect(response.status).toEqual(400)
        })
        it('POST /menu fail not inserted', async () => {
            const menuRepo = {
                add: jest.fn().mockResolvedValue([])
            }

            const menuCtrl = new controllers.Menu(menuRepo)
            app.use('/menu', menuRouter(validationMw, authMw, menuCtrl))

            const response = await request(app).post('/menu/').send({
                name: 'Nasi Kuning',
                price: '5000',
                category_id: '1',
            })
                .set('Authorization', `Bearer ${token}`)

            expect(response.status).toEqual(406)
        })
        it('POST /menu success inserted', async () => {
            const menuRepo = {
                add: jest.fn().mockResolvedValue([22])
            }

            const menuCtrl = new controllers.Menu(menuRepo)
            app.use('/menu', menuRouter(validationMw, authMw, menuCtrl))

            const response = await request(app).post('/menu/').send({
                name: 'Nasi Kuning',
                price: '5000',
                category_id: '1',
            })
                .set('Authorization', `Bearer ${token}`)

            expect(response.status).toEqual(201)
        })
    })
    describe('Get a menu', () => {
        it('GET /menu/:id fail validation', async () => {
            const menuRepo = {}

            const menuCtrl = new controllers.Menu(menuRepo)
            app.use('/menu/', menuRouter(validationMw, authMw, menuCtrl))

            const response = await request(app).get('/menu/abc').send()

            expect(response.status).toEqual(400)
        })
        it('GET /menu/:id fail db', async () => {
            const menuRepo = {
                getByID: jest.fn().mockResolvedValue()
            }

            const menuCtrl = new controllers.Menu(menuRepo)
            app.use('/menu/', menuRouter(validationMw, authMw, menuCtrl))

            const response = await request(app).get('/menu/123').send()

            expect(response.status).toEqual(404)
        })
        it('GET /menu/:id success', async () => {
            const menuRepo = {
                getByID: jest.fn().mockResolvedValue({
                    name: 'Nasi Kuning',
                    price: 5000,
                    category_id: 1,
                })
            }

            const menuCtrl = new controllers.Menu(menuRepo)
            app.use('/menu/', menuRouter(validationMw, authMw, menuCtrl))

            const response = await request(app).get('/menu/123').send()

            expect(response.status).toEqual(200)
            expect(response.body).toStrictEqual({
                code: 200,
                message: 'OK',
                data: {
                    menu: {
                        name: 'Nasi Kuning',
                        price: 5000,
                        category_id: 1,
                    }
                }
            })
        })
    })
})