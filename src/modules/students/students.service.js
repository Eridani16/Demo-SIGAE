import { db } from '../core/firebase.js';
import { addDoc, collection, getDocs, query, where, Timestamp } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js';
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

  static async getStudentByEmail(email) {
    try {
      const q = query(collection(db, 'students'), where('email', '==', email));
      const snapshot = await getDocs(q);
      if (snapshot.empty) return null;
      const doc = snapshot.docs[0];
      return { id: doc.id, ...doc.data() };
    } catch (error) {
      ErrorHandler.handle(error, 'StudentsService.getStudentByEmail');
      throw error;
    }
  }
}
