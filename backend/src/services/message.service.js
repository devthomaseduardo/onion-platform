const crypto = require('node:crypto');

const messages = new Map();

function generateTrackingCode() {
  return crypto.randomBytes(8).toString('hex').toUpperCase();
}

function createMessage({ title, message }) {
  const trackingCode = generateTrackingCode();

  const newMessage = {
    trackingCode,
    title,
    message,
    status: 'received',
    createdAt: new Date().toISOString(),
  };

  messages.set(trackingCode, newMessage);

  return {
    trackingCode,
    status: newMessage.status,
    createdAt: newMessage.createdAt,
  };
}

function findMessageByTrackingCode(trackingCode) {
  return messages.get(trackingCode) || null;
}

module.exports = {
  createMessage,
  findMessageByTrackingCode,
};
