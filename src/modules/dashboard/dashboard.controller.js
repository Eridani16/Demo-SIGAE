import { AlertsController } from '../alerts/alerts.controller.js';
import { MetricsService } from '../metrics/metrics.service.js';
import { DashboardService } from './dashboard.service.js';

export class DashboardController {
  static async loadStudentDashboard(studentId) {
    const userId = window.localStorage.getItem('userId') || '';
    const start = performance.now();
    const grades = await DashboardService.getGradesByStudent(studentId);
    const durationMs = Math.round(performance.now() - start);

    await MetricsService.logAcademicAccess({
      studentId,
      userId,
      queryType: 'consulta_notas',
      durationMs
    });

    const attendance = await DashboardService.getAttendanceByStudent(studentId);
    const average = DashboardService.calculateAverage(grades);
    const indicators = DashboardService.attendanceIndicators(attendance);
    const generatedAlert = await AlertsController.checkAndAlertLowPerformance(studentId, grades);

    return { grades, attendance, average, indicators, generatedAlert, durationMs };
  }
}
