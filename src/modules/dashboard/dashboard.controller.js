// src/modules/dashboard/dashboard.controller.js
import { DashboardService } from './dashboard.service.js';

export class DashboardController {
  static async loadStudentDashboard(studentId) {
    const grades = await DashboardService.getGradesByStudent(studentId);
    const attendance = await DashboardService.getAttendanceByStudent(studentId);
    const average = DashboardService.calculateAverage(grades);
    const indicators = DashboardService.attendanceIndicators(attendance);
    return { grades, attendance, average, indicators };
  }
}