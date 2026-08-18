const createMessageSchema = {
  body: {
    type: 'object',
    additionalProperties: false,
    required: ['title', 'message'],
    properties: {
      title: {
        type: 'string',
        minLength: 3,
        maxLength: 120,
      },
      message: {
        type: 'string',
        minLength: 10,
        maxLength: 5000,
      },
    },
  },
};

const getMessageSchema = {
  params: {
    type: 'object',
    required: ['trackingCode'],
    properties: {
      trackingCode: {
        type: 'string',
        minLength: 16,
        maxLength: 16,
      },
    },
  },
};

module.exports = {
  createMessageSchema,
  getMessageSchema,
};
