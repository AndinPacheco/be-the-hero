const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
    beforeEach( async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll( async () => {
        await connection.destroy();
    })

    it('should be able to create a new ONG', async () => {
        const response = await request(app)
            .post('/ongs')
            .send({
                name : "APAD2",
                email : "teste@teste.com.nr",
                whatsapp : "3222222222",
                city : "Itaperuna",
                uf : "RJ"
            });
        
            expect(response.body).toHaveProperty('id');
            expect(response.body.id).toHaveLength(8);
    });

    it('a ONG should be able to do the login', async () => {
        const response = await request(app)
            .post('/sessions')
            .send({
                id: "cf5ea5ad"
            });

            console.log(response.body);

            //expect(response.body).toHaveProperty('name');
    });
});