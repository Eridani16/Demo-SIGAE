import { db } from '../core/firebase.js';
import { addDoc, collection, getDocs, query, Timestamp, where } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js';
import { ErrorHandler } from '../core/errorHandler.js';

export class AlertsService {
  static async generateAlert({ studentId, type, message, relatedData }) {
    try {
      const docRef = await addDoc(collection(db, 'alerts'), {
        studentId,
        type,
        message,
        relatedData,
        createdAt: Timestamp.now(),
        status: 'pendiente'
      });
      return docRef.id;
    } catch (error) {
      ErrorHandler.handle(error, 'AlertsService.generateAlert');
      throw error;
    }
  }

  static async hasPendingAlert(studentId, type) {
    try {
      const q = query(
        collection(db, 'alerts'),
        where('studentId', '==', studentId),
        where('type', '==', type),
        where('status', '==', 'pendiente')
      );
      const snapshot = await getDocs(q);
      return !snapshot.empty;
    } catch (error) {
      ErrorHandler.handle(error, 'AlertsService.hasPendingAlert');
      throw error;
    }
  }

  static async getAlerts() {
    try {
      const snapshot = await getDocs(collection(db, 'alerts'));
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      ErrorHandler.handle(error, 'AlertsService.getAlerts');
      throw error;
    }
  }
}
