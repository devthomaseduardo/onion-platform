require('dotenv').config();

const buildApp = require('./src/app');
const pool = require('./src/database/database');

const app = buildApp();

const PORT = Number(process.env.PORT) || 8080;
const HOST = process.env.HOST || '127.0.0.1';

async function start() {
  try {
    // Testa o PostgreSQL antes de iniciar a API
    await pool.query('SELECT 1');

    app.log.info('PostgreSQL conectado com sucesso');

    await app.listen({
      port: PORT,
      host: HOST,
    });

    app.log.info(`API rodando em http://${HOST}:${PORT}`);
  } catch (error) {
    app.log.error(error, 'Erro ao iniciar a aplicação');
    process.exit(1);
  }
}

async function shutdown(signal) {
  try {
    app.log.info(`${signal} recebido. Encerrando aplicação...`);

    await app.close();
    await pool.end();

    app.log.info('Aplicação encerrada corretamente');

    process.exit(0);
  } catch (error) {
    app.log.error(error, 'Erro ao encerrar aplicação');

    process.exit(1);
  }
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

start();
