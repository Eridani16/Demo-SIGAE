import { AuthController } from '../auth/auth.controller.js';
import { ReportsController } from './reports.controller.js';
import { renderPanelLayout } from '../../utils/panelLayout.js';

export class ReportsView {
  static async renderStudentReports(containerId) {
    const container = document.getElementById(containerId);
    container.className = 'app-panel';
    container.innerHTML = '<p>Cargando reportes...</p>';

    try {
      const [summaries, evaluationMetrics] = await Promise.all([
        ReportsController.getStudentReports(),
        ReportsController.getEvaluationMetrics()
      ]);

      const topAverage = summaries.length
        ? (summaries.reduce((total, summary) => total + Number(summary.promedio), 0) / summaries.length).toFixed(2)
        : '0.00';

      const navItems = [
        { path: '/admin', label: 'Resumen' },
        { path: '/admin/students', label: 'Registrar estudiantes' },
        { path: '/admin/teachers', label: 'Registrar docentes' },
        { path: '/admin/grades', label: 'Registrar notas' },
        { path: '/admin/attendance', label: 'Registrar asistencia' },
        { path: '/admin/survey', label: 'Encuesta' }
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
            <p class="section-kicker">Variables de evaluacion</p>
            <h2>Indicadores del estudio</h2>
          </div>

          <div class="stats-grid">
            <article class="stat-card">
              <span>Tiempo consulta notas</span>
              <strong>${evaluationMetrics.averageConsultationTime} ms</strong>
              <p>${evaluationMetrics.accessLogCount} observaciones registradas automaticamente.</p>
            </article>
            <article class="stat-card">
              <span>Alertas generadas</span>
              <strong>${evaluationMetrics.alertsGenerated}</strong>
              <p>Conteo directo desde el registro del sistema.</p>
            </article>
            <article class="stat-card">
              <span>Centralizacion datos</span>
              <strong>${evaluationMetrics.centralizationAverage}/5</strong>
              <p>${evaluationMetrics.surveyResponses} encuestas almacenadas.</p>
            </article>
          </div>
        </div>

        <div class="panel-section-block">
          <div class="section-heading">
            <p class="section-kicker">Reportes</p>
            <h2>Reporte academico por estudiante</h2>
          </div>

          <div class="panel-surface">
            <table class="reports-table">
              <thead>
                <tr><th>Estudiante</th><th>Promedio</th><th># Materias</th></tr>
              </thead>
              <tbody>
                ${summaries.map(summary => `<tr><td>${summary.studentName}</td><td>${summary.promedio}</td><td>${summary.materias}</td></tr>`).join('')}
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
              ${summaries.map(summary => `
                <li class="metric-row">
                  <span>${summary.studentName}</span>
                  <strong>${summary.promedio}</strong>
                  <small>${summary.materias} materias</small>
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
