import { db } from '../core/firebase.js';
import { addDoc, collection, getDocs, Timestamp } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js';
import { ErrorHandler } from '../core/errorHandler.js';

export class SurveyService {
  static async submitSurvey(payload) {
    try {
      const docRef = await addDoc(collection(db, 'survey_responses'), {
        ...payload,
        createdAt: Timestamp.now()
      });

      return docRef.id;
    } catch (error) {
      ErrorHandler.handle(error, 'SurveyService.submitSurvey');
      throw error;
    }
  }

  static async getSurveyResponses() {
    try {
      const snapshot = await getDocs(collection(db, 'survey_responses'));
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      ErrorHandler.handle(error, 'SurveyService.getSurveyResponses');
      throw error;
    }
  }
}
