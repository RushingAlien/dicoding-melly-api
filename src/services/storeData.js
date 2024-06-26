const { Firestore } = require('@google-cloud/firestore');

async function storeData(id, data) {
  const db = new Firestore({
    projectID: process.env.PROJECT_ID,
    keyFilename: process.env.SERVICE_ACCOUNT_KEY,
  });

  const predictCollection = db.collection('predictions');
  return predictCollection.doc(id).set(data);
}

module.exports = storeData;
