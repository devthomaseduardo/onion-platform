const messageService = require('../services/message.service');

async function createMessage(request, reply) {
  const { title, message } = request.body;

  const result = messageService.createMessage({
    title,
    message,
  });

  return reply.code(201).send({
    success: true,
    data: result,
  });
}

async function getMessage(request, reply) {
  const { trackingCode } = request.params;

  const message = messageService.findMessageByTrackingCode(trackingCode);

  if (!message) {
    return reply.code(404).send({
      success: false,
      error: 'MESSAGE_NOT_FOUND',
      message: 'Mensagem não encontrada.',
    });
  }

  return reply.code(200).send({
    success: true,
    data: {
      trackingCode: message.trackingCode,
      status: message.status,
      createdAt: message.createdAt,
    },
  });
}

module.exports = {
  createMessage,
  getMessage,
};
