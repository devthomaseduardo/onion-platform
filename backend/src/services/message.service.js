const crypto = require('node:crypto');

const messageRepository = require('../repositories/message.repository');

function generateTrackingCode() {
  return crypto.randomBytes(8).toString('hex').toUpperCase();
}

async function createMessage({ title, message }) {
  const trackingCode = generateTrackingCode();

  const savedMessage = await messageRepository.createMessage({
    trackingCode,
    title,
    message,
    status: 'received',
  });

  return {
    trackingCode: savedMessage.tracking_code,
    status: savedMessage.status,
    createdAt: savedMessage.created_at,
  };
}

async function findMessageByTrackingCode(trackingCode) {
  const message = await messageRepository.findByTrackingCode(trackingCode);

  if (!message) {
    return null;
  }

  return {
    trackingCode: message.tracking_code,
    status: message.status,
    createdAt: message.created_at,
  };
}

module.exports = {
  createMessage,
  findMessageByTrackingCode,
};
