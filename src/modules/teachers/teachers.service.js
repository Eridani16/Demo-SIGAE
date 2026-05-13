import { db } from '../core/firebase.js';
import { addDoc, collection, getDocs, Timestamp } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js';
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

  static async getTeachers() {
    try {
      const snapshot = await getDocs(collection(db, 'teachers'));
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      ErrorHandler.handle(error, 'TeachersService.getTeachers');
      throw error;
    }
  }
}
