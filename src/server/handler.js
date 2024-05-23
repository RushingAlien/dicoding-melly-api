const predictClassification = require('../services/inferenceService');
const crypto = require('crypto');
const StoreData = require('../services/storeData');
const InputError = require('../exceptions/InputError');

const storeData = new StoreData();

async function postPredictHandler(request, h) {
  try {
    const { image } = request.payload;

    if (!image) {
      throw new InputError('Image is required for prediction');
    }

    const { model } = request.server.app;

    const { label, suggestion } = await predictClassification(model, image);
    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();

    const data = {
      id: id,
      result: label,
      suggestion: suggestion,
      createdAt: createdAt,
    };

    await storeData.save('predictions', id, data);

    const response = h.response({
      status: 'success',
      message: 'Model is predicted successfully',
      data,
    });

    response.code(201);
    return response;
  } catch (error) {
    if (error instanceof InputError) {
      const response = h.response({
        status: 'fail',
        message: error.message,
      });
      response.code(error.statusCode);
      return response;
    }

    // Handle other unexpected errors
    const response = h.response({
      status: 'error',
      message: 'An unexpected error occurred',
    });
    response.code(500);
    return response;
  }
}

async function getHistoryHandler(request, h) {
  try {
    const histories = await storeData.getAll('predictions');
    return h
      .response({
        status: 'success',
        data: histories.map((doc) => ({ id: doc.id, history: doc.data })),
      })
      .code(200);
  } catch (error) {
    return h
      .response({
        status: 'fail',
        message: 'Failed to retrieve prediction histories',
      })
      .code(500);
  }
}

module.exports = {
  postPredictHandler,
  getHistoryHandler,
};
