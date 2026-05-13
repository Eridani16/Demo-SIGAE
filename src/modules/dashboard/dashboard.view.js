// src/modules/dashboard/dashboard.view.js
import { DashboardController } from './dashboard.controller.js';

export class DashboardView {
  static async renderStudentDashboard(containerId, studentId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '<p>Cargando datos...</p>';
    try {
      const { grades, attendance, average, indicators } = await DashboardController.loadStudentDashboard(studentId);

      // Tabla de notas
      let gradesTable = `
        <h2>Notas</h2>
        <table class="dashboard-table">
          <thead>
            <tr><th>Asignatura</th><th>Nota</th><th>Periodo</th></tr>
          </thead>
          <tbody>
            ${grades.map(g => `<tr><td>${g.subject}</td><td>${g.grade}</td><td>${g.period}</td></tr>`).join('')}
          </tbody>
        </table>
        <p><strong>Promedio:</strong> ${average}</p>
      `;

      // Tabla de asistencia
      let attendanceTable = `
        <h2>Asistencia</h2>
        <table class="dashboard-table">
          <thead>
            <tr><th>Fecha</th><th>Estado</th></tr>
          </thead>
          <tbody>
            ${attendance.map(a => `<tr><td>${a.date}</td><td>${a.status}</td></tr>`).join('')}
          </tbody>
        </table>
        <p>
          <strong>Presentes:</strong> ${indicators.present} |
          <strong>Ausentes:</strong> ${indicators.absent} |
          <strong>Tardes:</strong> ${indicators.late}
        </p>
      `;

      container.innerHTML = gradesTable + attendanceTable;
    } catch (error) {
      container.innerHTML = '<p class="error-message">Error al cargar datos del estudiante.</p>';
    }
  }
}