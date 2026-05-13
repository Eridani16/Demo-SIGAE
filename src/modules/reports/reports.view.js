import { AuthController } from '../auth/auth.controller.js';
import { ReportsController } from './reports.controller.js';

export class ReportsView {
  static async renderStudentReports(containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '<p>Cargando reportes...</p>';

    try {
      const summaries = await ReportsController.getStudentReports();
      const table = `
        <div class="page-header">
          <h2>Reporte Academico por Estudiante</h2>
          <button id="logoutButton" class="secondary-button" type="button">Cerrar sesion</button>
        </div>
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
      document.getElementById('logoutButton')?.addEventListener('click', async () => {
        await AuthController.handleLogout();
      });
    } catch (error) {
      container.innerHTML = '<p class="error-message">Error al cargar reportes.</p>';
    }
  }
}
