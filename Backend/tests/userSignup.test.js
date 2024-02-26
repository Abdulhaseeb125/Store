// server.test.js
const request = require('supertest');
const app = require('../app');
const data = require('./userSignup.json');


describe('POST /auth/signup', () => {
    data.forEach((testItem) => {
        test(`responds with ${testItem.status} for email: ${testItem.email} and password: ${testItem.password}`, async () => {
            await request(app)
                .post('/auth/signup')
                .send({ name: testItem.name, email: testItem.email, password: testItem.password })
                .then(response => {
                    expect(response.status).toBe(testItem.status);
                })
        })
    })
})
