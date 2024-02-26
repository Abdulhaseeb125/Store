// server.test.js
const request = require('supertest');
const app = require('../app');
const data = require('./userLogin.json');



describe('POST /auth/login', () => {
    data.forEach((testItem) => {
        test(`responds with ${testItem.status} for email: ${testItem.email} and password: ${testItem.password}`, async () => {
            await request(app)
                .post('/auth/login')
                .send({ email: testItem.email, password: testItem.password })
                .then(response => {
                    expect(response.status).toBe(testItem.status);
                })
        })
    })
})
