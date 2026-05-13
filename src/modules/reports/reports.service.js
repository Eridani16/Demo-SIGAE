// src/modules/reports/reports.service.js
import { db } from '../core/firebase.js';
import { collection, getDocs } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js';
import { ErrorHandler } from '../core/errorHandler.js';

export class ReportsService {
  static async getAllGrades() {
    try {
      const snapshot = await getDocs(collection(db, 'grades'));
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      ErrorHandler.handle(error, 'ReportsService.getAllGrades');
      throw error;
    }
  }

  static groupByStudent(grades) {
    const grouped = {};
    grades.forEach(g => {
      if (!grouped[g.studentId]) grouped[g.studentId] = [];
      grouped[g.studentId].push(g);
    });
    return grouped;
  }

  static calculateStudentSummary(grades) {
    if (!grades.length) return { promedio: 0, materias: 0 };
    const sum = grades.reduce((acc, g) => acc + Number(g.grade), 0);
    return {
      promedio: (sum / grades.length).toFixed(2),
      materias: grades.length
    };
  }
}