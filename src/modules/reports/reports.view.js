// src/modules/reports/reports.view.js
import { ReportsController } from './reports.controller.js';

export class ReportsView {
  static async renderStudentReports(containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '<p>Cargando reportes...</p>';
    try {
      const summaries = await ReportsController.getStudentReports();
      let table = `
        <h2>Reporte Académico por Estudiante</h2>
        <table class="reports-table">
          <thead>
            <tr><th>ID Estudiante</th><th>Promedio</th><th># Materias</th></tr>
          </thead>
          <tbody>
            ${summaries.map(s => `<tr><td>${s.studentId}</td><td>${s.promedio}</td><td>${s.materias}</td></tr>`).join('')}
          </tbody>
        </table>
      `;
      container.innerHTML = table;
    } catch (error) {
      container.innerHTML = '<p class="error-message">Error al cargar reportes.</p>';
    }
  }
}