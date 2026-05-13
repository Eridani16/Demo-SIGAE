// src/modules/alerts/alerts.service.js
import { db } from '../core/firebase.js';
import { collection, addDoc, Timestamp } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js';
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
}