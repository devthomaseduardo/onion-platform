const messageController = require('../controllers/message.controller');

const { createMessageSchema, getMessageSchema } = require('../schemas/message.schema');

async function messageRoutes(fastify) {
  fastify.post(
    '/messages',
    {
      schema: createMessageSchema,
    },
    messageController.createMessage,
  );

  fastify.get(
    '/messages/:trackingCode',
    {
      schema: getMessageSchema,
    },
    messageController.getMessage,
  );
}

module.exports = messageRoutes;
