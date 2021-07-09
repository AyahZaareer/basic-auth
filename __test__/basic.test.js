'use strict';

const server = require('../src/sever');
const supergoose = require('@code-fellows/supergoose')
const request = supergoose(server.server);
const basic = require('../src/auth/middleware/basic');
const base64 = require('base-64');

let user = {
    username: 'ayah',
    password: '1234'
}
describe('home page', () => {
    it('test home page', async () => {
        const responce = await request.get('/');
        expect(responce.status).toBe(200);
    })

})

describe('auth ', () => {
    it('create new user/signup', async () => {
        const responce = await request.post('/signup').send(user);
        expect(responce.body.username).toEqual('ayah');
        expect(responce.status).toBe(201);

    })
    it('signin', async () => {
        const user = base64.encode('ayah:1234');
        const responce = await request.post('/signin').set('Authorization', `Basic ${user}`);
        expect(responce.body.username).toEqual('ayah');
    })
})

describe('api server  ', () => {
    it('create new user/signup without one required', async () => {
        let newUser = { username: 'ahmad' };
        const responce = await request.post('/signup').send(newUser);

        expect(responce.status).toBe(403);

    })

})

