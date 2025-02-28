require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routers/routers.js');
const sequelize = require('./database/database.js');

const app = express();

app.use(bodyParser.json());

// Rota para a raiz (/)
app.get('/', (req, res) => {
    res.send('Bem-vindo à API!');
});

// Rotas da API
app.use('/api', router);

const PORT = process.env.NODE_ENV === 'test' ? 3001 : process.env.PORT || 3000;

// Inicia o servidor apenas se não estiver em ambiente de teste
if (process.env.NODE_ENV !== 'test') {
    sequelize.sync().then(() => {
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    });
}

// Exporta o app para uso nos testes
module.exports = app;