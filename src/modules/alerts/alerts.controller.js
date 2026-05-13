// src/modules/alerts/alerts.controller.js
import { AlertsService } from './alerts.service.js';

export class AlertsController {
  // Detecta bajo rendimiento y genera alerta si promedio < 3.0
  static async checkAndAlertLowPerformance(studentId, grades) {
    if (!grades.length) return;
    const sum = grades.reduce((acc, g) => acc + Number(g.grade), 0);
    const avg = sum / grades.length;
    if (avg < 3.0) {
      await AlertsService.generateAlert({
        studentId,
        type: 'bajo_rendimiento',
        message: `Promedio académico bajo (${avg.toFixed(2)}).`,
        relatedData: { promedio: avg }
      });
      return true;
    }
    return false;
  }
}