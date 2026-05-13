// src/modules/attendance/attendance.service.js
import { db } from '../core/firebase.js';
import { collection, addDoc, Timestamp } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js';
import { ErrorHandler } from '../core/errorHandler.js';

export class AttendanceService {
  static async registerAttendance({ studentId, date, status, teacherId }) {
    try {
      const docRef = await addDoc(collection(db, 'attendance'), {
        studentId,
        date,
        status,
        teacherId,
        createdAt: Timestamp.now()
      });
      return docRef.id;
    } catch (error) {
      ErrorHandler.handle(error, 'AttendanceService.registerAttendance');
      throw error;
    }
  }
}