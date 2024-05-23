const { Firestore } = require('@google-cloud/firestore');

class StoreData {
  constructor() {
    this.firestore = new Firestore({
      projectId: 'submissionmlgc-zhafran',
      keyFilename: 'firestore-access.json',
    });
  }

  async save(collection, documentId, data) {
    const docRef = this.firestore.collection(collection).doc(documentId);
    await docRef.set({
      id: data.id,
      result: data.result,
      suggestion: data.suggestion,
      createdAt: data.createdAt,
    });
  }

  async getAll(collection) {
    const snapshot = await this.firestore.collection(collection).get();
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }));
  }
}

module.exports = StoreData;
