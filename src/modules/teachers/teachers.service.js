import { db } from '../core/firebase.js';
import { addDoc, collection, Timestamp } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js';
import { ErrorHandler } from '../core/errorHandler.js';

export class TeachersService {
  static async registerTeacher(teacherData) {
    try {
      const docRef = await addDoc(collection(db, 'teachers'), {
        ...teacherData,
        createdAt: Timestamp.now()
      });

      return docRef.id;
    } catch (error) {
      ErrorHandler.handle(error, 'TeachersService.registerTeacher');
      throw error;
    }
  }
}
