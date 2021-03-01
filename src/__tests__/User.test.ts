import request from 'supertest';
import { app } from '../App';

import createConnection from '../database';

describe('Users', () => {
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations();
    });

    it('Should be able to create a new user', async () => {
        const response = await request(app).post('/users').send({
            email: 'user@example.com',
            name: 'User Example', 
        });

        expect(response.status).toBe(201);
    });

    it.skip('Should not be able to create a user with exists email address', async () => {
        const response = await request(app).post('/users').send({
            email: 'user@example.com',
            name: 'User Example',
        });

        expect(response.status).toBe(400);
    });
});
