const { postPredictHandler, getHistoryHandler } = require('../server/handler');
const upload = require('../server/multer');

const routes = [
  {
    path: '/predict',
    method: 'POST',
    handler: postPredictHandler,
    options: {
      payload: {
        maxBytes: 1000000,
        allow: 'multipart/form-data',
        multipart: true,
      },
    },
  },
  {
    path: '/predict/histories',
    method: 'GET',
    handler: getHistoryHandler,
    options: {
      tags: ['api'],
      description: 'Get prediction history',
      notes: 'Returns all prediction history stored in Firestore',
    },
  },
];

module.exports = routes;
