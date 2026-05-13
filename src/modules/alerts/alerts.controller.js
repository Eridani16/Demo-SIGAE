import { AlertsService } from './alerts.service.js';

export class AlertsController {
  static async checkAndAlertLowPerformance(studentId, grades) {
    if (!grades.length) return false;
    const sum = grades.reduce((acc, grade) => acc + Number(grade.grade), 0);
    const average = sum / grades.length;

    if (average < 3.0) {
      const alreadyExists = await AlertsService.hasPendingAlert(studentId, 'bajo_rendimiento');
      if (alreadyExists) return false;

      await AlertsService.generateAlert({
        studentId,
        type: 'bajo_rendimiento',
        message: `Promedio academico bajo (${average.toFixed(2)}).`,
        relatedData: { promedio: average }
      });
      return true;
    }

    return false;
  }
}
