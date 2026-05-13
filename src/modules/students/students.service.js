import { db } from '../core/firebase.js';
import { addDoc, collection, getDocs, Timestamp } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js';
import { ErrorHandler } from '../core/errorHandler.js';

export class StudentsService {
  static async registerStudent(studentData) {
    try {
      const docRef = await addDoc(collection(db, 'students'), {
        ...studentData,
        createdAt: Timestamp.now()
      });

      return docRef.id;
    } catch (error) {
      ErrorHandler.handle(error, 'StudentsService.registerStudent');
      throw error;
    }
  }

  static async getStudents() {
    try {
      const snapshot = await getDocs(collection(db, 'students'));
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      ErrorHandler.handle(error, 'StudentsService.getStudents');
      throw error;
    }
  }
}
