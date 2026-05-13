import { AlertsService } from '../alerts/alerts.service.js';
import { MetricsService } from '../metrics/metrics.service.js';
import { StudentsService } from '../students/students.service.js';
import { SurveyService } from '../survey/survey.service.js';
import { ReportsService } from './reports.service.js';

export class ReportsController {
  static async getStudentReports() {
    const grades = await ReportsService.getAllGrades();
    const students = await StudentsService.getStudents();
    const studentMap = new Map(
      students.map(student => [
        student.id,
        student.fullName || `${student.firstName || ''} ${student.lastName || ''}`.trim() || student.documentId || student.id
      ])
    );
    const grouped = ReportsService.groupByStudent(grades);
    return Object.entries(grouped).map(([studentId, studentGrades]) => ({
      studentId,
      studentName: studentMap.get(studentId) || studentId,
      ...ReportsService.calculateStudentSummary(studentGrades)
    }));
  }

  static async getEvaluationMetrics() {
    const [alerts, accessLogs, surveys] = await Promise.all([
      AlertsService.getAlerts(),
      MetricsService.getAccessLogsByType('consulta_notas'),
      SurveyService.getSurveyResponses()
    ]);

    const averageConsultationTime = accessLogs.length
      ? Math.round(accessLogs.reduce((total, log) => total + Number(log.durationMs || 0), 0) / accessLogs.length)
      : 0;

    const centralizationAverage = surveys.length
      ? (
          surveys.reduce((total, survey) => total + Number(survey.centralizationScore || 0), 0) / surveys.length
        ).toFixed(2)
      : '0.00';

    return {
      alertsGenerated: alerts.length,
      accessLogCount: accessLogs.length,
      averageConsultationTime,
      surveyResponses: surveys.length,
      centralizationAverage
    };
  }
}
