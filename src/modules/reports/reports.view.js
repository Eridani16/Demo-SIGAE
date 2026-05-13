import { AuthController } from '../auth/auth.controller.js';
import { ReportsController } from './reports.controller.js';
import { renderPanelLayout } from '../../utils/panelLayout.js';

export class ReportsView {
  static async renderStudentReports(containerId) {
    const container = document.getElementById(containerId);
    container.className = 'app-panel';
    container.innerHTML = '<p>Cargando reportes...</p>';

    try {
      const summaries = await ReportsController.getStudentReports();
      const topAverage = summaries.length
        ? (summaries.reduce((total, summary) => total + Number(summary.promedio), 0) / summaries.length).toFixed(2)
        : '0.00';

      const navItems = [
        { path: '/admin', label: 'Resumen' },
        { path: '/admin/students', label: 'Registrar estudiantes' },
        { path: '/admin/teachers', label: 'Registrar docentes' },
        { path: '/admin/grades', label: 'Registrar notas' },
        { path: '/admin/attendance', label: 'Registrar asistencia' }
      ];

      const content = `
        <div class="stats-grid">
          <article class="stat-card">
            <span>Estudiantes reportados</span>
            <strong>${summaries.length}</strong>
            <p>Registros consolidados en la vista actual.</p>
          </article>
          <article class="stat-card">
            <span>Promedio global</span>
            <strong>${topAverage}</strong>
            <p>Promedio de los promedios individuales.</p>
          </article>
          <article class="stat-card">
            <span>Materias analizadas</span>
            <strong>${summaries.reduce((total, summary) => total + Number(summary.materias), 0)}</strong>
            <p>Total de asignaturas procesadas.</p>
          </article>
        </div>

        <div class="panel-section-block">
          <div class="section-heading">
            <p class="section-kicker">Reportes</p>
            <h2>Reporte academico por estudiante</h2>
          </div>

          <div class="panel-surface">
            <table class="reports-table">
              <thead>
                <tr><th>ID Estudiante</th><th>Promedio</th><th># Materias</th></tr>
              </thead>
              <tbody>
                ${summaries.map(s => `<tr><td>${s.studentId}</td><td>${s.promedio}</td><td>${s.materias}</td></tr>`).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <div class="panel-section-block">
          <div class="section-heading">
            <p class="section-kicker">Metricas clave</p>
            <h2>Lectura rapida del rendimiento</h2>
          </div>

          <div class="panel-surface">
            <ul class="metric-list">
              ${summaries.map(s => `
                <li class="metric-row">
                  <span>${s.studentId}</span>
                  <strong>${s.promedio}</strong>
                  <small>${s.materias} materias</small>
                </li>
              `).join('')}
            </ul>
          </div>
        </div>
      `;

      container.innerHTML = renderPanelLayout({
        brandTitle: 'Panel administrativo',
        pageKicker: 'Resumen ejecutivo',
        pageTitle: 'Estado general de los estudiantes',
        navItems,
        activePath: '/admin',
        topbarTitle: 'Centro de reportes academicos',
        topbarKicker: 'Administracion',
        content
      });

      document.getElementById('logoutButton')?.addEventListener('click', async () => {
        await AuthController.handleLogout();
      });
    } catch (error) {
      container.innerHTML = '<p class="error-message">Error al cargar reportes.</p>';
    }
  }
}
