require('dotenv').config();
const { Sequelize } = require('sequelize');

let sequelize;

if (process.env.NODE_ENV === 'test') {
    // Configuração para testes (SQLite em memória)
    sequelize = new Sequelize('sqlite::memory:', {
        logging: false, // Desativa logs para evitar poluição no terminal
    });
} else {
    // Configuração para desenvolvimento/produção (MySQL)
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            host: process.env.DB_HOST,
            dialect: process.env.DB_DIALECT,
            port: process.env.DB_PORT,
            retry: {
                max: 5, // Número máximo de tentativas
                timeout: 5000, // Tempo de espera entre tentativas (5 segundos)
            },
        }
    );
}

async function connectDatabase() {
    try {
        await sequelize.authenticate();
        console.log('Conexão com o banco de dados estabelecida com sucesso.');
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
        process.exit(1); // Encerra a aplicação em caso de erro
    }
}

// Conecta ao banco de dados imediatamente
connectDatabase();

module.exports = sequelize;