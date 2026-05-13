// src/modules/grades/grades.service.js
import { db } from '../core/firebase.js';
import { collection, addDoc, Timestamp } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js';
import { ErrorHandler } from '../core/errorHandler.js';

export class GradesService {
  static async registerGrade({ studentId, subject, grade, period, teacherId }) {
    try {
      const docRef = await addDoc(collection(db, 'grades'), {
        studentId,
        subject,
        grade,
        period,
        teacherId,
        createdAt: Timestamp.now()
      });
      return docRef.id;
    } catch (error) {
      ErrorHandler.handle(error, 'GradesService.registerGrade');
      throw error;
    }
  }
}