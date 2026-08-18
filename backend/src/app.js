const Fastify = require('fastify');

const pool = require('./database/database');
const messageRoutes = require('./routes/message.routes');

function buildApp() {
  const app = Fastify({
    logger: true,
  });

  // Rota principal
  app.get('/', async () => {
    return {
      status: 'online',
      service: 'onion-platform-api',
    };
  });

  // Verifica somente a API
  app.get('/health', async () => {
    return {
      status: 'healthy',
    };
  });

  // Verifica a conexão com PostgreSQL
  app.get('/health/database', async (request, reply) => {
    try {
      const result = await pool.query('SELECT NOW() AS database_time');

      return reply.code(200).send({
        status: 'healthy',
        database: 'connected',
        databaseTime: result.rows[0].database_time,
      });
    } catch (error) {
      request.log.error(error);

      return reply.code(500).send({
        status: 'unhealthy',
        database: 'disconnected',
      });
    }
  });

  // Rotas das mensagens
  app.register(messageRoutes);

  return app;
}

module.exports = buildApp;
