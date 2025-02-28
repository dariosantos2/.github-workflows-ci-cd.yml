const request = require('supertest');
const app = require('../index.js'); // Importa o app Express
const sequelize = require('../database/database.js'); // Importa o sequelize

// Inicia o servidor Express antes de executar os testes
let server;
beforeAll(async () => {
    await sequelize.sync(); // Sincroniza o banco de dados
    server = app.listen(3001); // Usa uma porta diferente (3001)
});

// Fecha o servidor Express após os testes
afterAll(async () => {
    await sequelize.close(); // Fecha a conexão com o banco de dados
    await new Promise((resolve) => server.close(resolve)); // Fecha o servidor
});

describe('Testes das Rotas da API', () => {
    // Teste para a rota GET /api/users
    it('Deve retornar uma lista de usuários', async () => {
        const res = await request(app).get('/api/users');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });

    // Teste para a rota POST /api/users
    it('Deve criar um novo usuário', async () => {
        const res = await request(app)
            .post('/api/users')
            .send({ username: 'testuser', email: 'test@example.com', password: '123456' });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
    });
});