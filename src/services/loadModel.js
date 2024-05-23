const MODEL_URL = 'https://storage.googleapis.com/ml-app-12/submissions-model/model.json';

const tf = require('@tensorflow/tfjs-node');
async function loadModel() {
  return tf.loadGraphModel(MODEL_URL);
}
module.exports = loadModel;
