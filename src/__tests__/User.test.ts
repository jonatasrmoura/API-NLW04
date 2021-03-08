import request from 'supertest';
import { getConnection } from 'typeorm';
import { app } from '../App';

import createConnection from '../database';

describe('Users', () => {
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    });

    // sempre depois que um teste for executado, eu vou dropar o meu database
    afterAll(async () => {
        const connection = getConnection();
        await connection.dropDatabase();
        // fechar conexão
        await connection.close();
    });

    it('Should be able to create a new user', async () => {
        const response = await request(app).post('/users').send({
            email: 'user@example.com',
            name: 'User Example', 
        });

        expect(response.status).toBe(201);
    });

    it('Should not be able to create a user with exists email address', async () => {
        const response = await request(app).post('/users').send({
            email: 'user@example.com',
            name: 'User Example',
        });

        expect(response.status).toBe(400);
    });
});
