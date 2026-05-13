import { db } from '../core/firebase.js';
import { addDoc, collection, getDocs, query, Timestamp, where } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js';
import { ErrorHandler } from '../core/errorHandler.js';

export class MetricsService {
  static async logAcademicAccess({ studentId, userId, queryType, durationMs }) {
    try {
      const docRef = await addDoc(collection(db, 'access_logs'), {
        studentId,
        userId,
        queryType,
        durationMs,
        createdAt: Timestamp.now()
      });

      return docRef.id;
    } catch (error) {
      ErrorHandler.handle(error, 'MetricsService.logAcademicAccess');
      throw error;
    }
  }

  static async getAccessLogsByType(queryType) {
    try {
      const q = query(collection(db, 'access_logs'), where('queryType', '==', queryType));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      ErrorHandler.handle(error, 'MetricsService.getAccessLogsByType');
      throw error;
    }
  }
}
