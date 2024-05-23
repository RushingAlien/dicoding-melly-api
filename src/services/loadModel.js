const MODEL_URL = process.env.MODEL_URL;

const tf = require('@tensorflow/tfjs-node');
async function loadModel() {
  return tf.loadGraphModel(MODEL_URL);
}
module.exports = loadModel;
