// src/modules/dashboard/dashboard.service.js
import { db } from '../core/firebase.js';
import { collection, query, where, getDocs } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js';
import { ErrorHandler } from '../core/errorHandler.js';

export class DashboardService {
  static async getGradesByStudent(studentId) {
    try {
      const q = query(collection(db, 'grades'), where('studentId', '==', studentId));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      ErrorHandler.handle(error, 'DashboardService.getGradesByStudent');
      throw error;
    }
  }

  static async getAttendanceByStudent(studentId) {
    try {
      const q = query(collection(db, 'attendance'), where('studentId', '==', studentId));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      ErrorHandler.handle(error, 'DashboardService.getAttendanceByStudent');
      throw error;
    }
  }

  static calculateAverage(grades) {
    if (!grades.length) return 0;
    const sum = grades.reduce((acc, g) => acc + Number(g.grade), 0);
    return (sum / grades.length).toFixed(2);
  }

  static attendanceIndicators(attendance) {
    const total = attendance.length;
    const present = attendance.filter(a => a.status === 'presente').length;
    const absent = attendance.filter(a => a.status === 'ausente').length;
    const late = attendance.filter(a => a.status === 'tarde').length;
    return { total, present, absent, late };
  }
}