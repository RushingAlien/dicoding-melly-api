const { Firestore } = require('@google-cloud/firestore');
const InputError = require('../exceptions/InputError');

async function getData() {
  try {
    const db = new Firestore({
      projectID: process.env.PROJECT_ID,
      keyFilename: process.env.SERVICE_ACCOUNT_KEY,
    });
    const predictCollection = db.collection('predictions');
    const snapshot = await predictCollection.get();

    if (snapshot.empty) {
      return [];
    }

    const data = [];
    snapshot.forEach((doc) => {
      data.push({
        id: doc.id,
        history: doc.data(),
      });
    });

    return data;
  } catch (error) {
    throw new InputError(
      `Failed to fetch prediction history: ${error.message}`
    );
  }
}

module.exports = getData;
