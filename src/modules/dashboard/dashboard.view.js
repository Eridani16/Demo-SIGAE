import { AuthController } from '../auth/auth.controller.js';
import { DashboardController } from './dashboard.controller.js';
import { renderPanelLayout } from '../../utils/panelLayout.js';

export class DashboardView {
  static async renderStudentDashboard(containerId, studentId) {
    const container = document.getElementById(containerId);
    container.className = 'app-panel';
    container.innerHTML = '<p>Cargando datos...</p>';

    if (!studentId) {
      container.innerHTML = '<p class="error-message">No se encontro una sesion valida.</p>';
      return;
    }

    try {
      const { grades, attendance, average, indicators, generatedAlert, durationMs } = await DashboardController.loadStudentDashboard(studentId);
      const attendanceRate = attendance.length
        ? Math.round((indicators.present / attendance.length) * 100)
        : 0;

      const navItems = [
        { path: '/student', label: 'Resumen' }
      ];

      const content = `
        <div class="stats-grid">
          <article class="stat-card">
            <span>Promedio general</span>
            <strong>${average}</strong>
            <p>Calculado con las materias registradas.</p>
          </article>
          <article class="stat-card">
            <span>Materias evaluadas</span>
            <strong>${grades.length}</strong>
            <p>Asignaturas con notas cargadas.</p>
          </article>
          <article class="stat-card">
            <span>Asistencia efectiva</span>
            <strong>${attendanceRate}%</strong>
            <p>Basada en los registros disponibles.</p>
          </article>
          <article class="stat-card">
            <span>Tiempo consulta notas</span>
            <strong>${durationMs} ms</strong>
            <p>Medicion automatica del acceso a la informacion academica.</p>
          </article>
        </div>

        ${generatedAlert ? '<div class="panel-inline-alert">Se genero una alerta de bajo rendimiento para este estudiante.</div>' : ''}

        <div class="panel-section-block">
          <div class="section-heading">
            <p class="section-kicker">Notas</p>
            <h2>Detalle por asignatura</h2>
          </div>
          <div class="panel-surface">
            <table class="dashboard-table">
              <thead>
                <tr><th>Asignatura</th><th>Nota</th><th>Periodo</th></tr>
              </thead>
              <tbody>
                ${grades.map(grade => `<tr><td>${grade.subject}</td><td>${grade.grade}</td><td>${grade.period}</td></tr>`).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <div class="panel-section-block">
          <div class="section-heading">
            <p class="section-kicker">Asistencia</p>
            <h2>Seguimiento diario</h2>
          </div>

          <div class="stats-grid compact">
            <article class="stat-card">
              <span>Presentes</span>
              <strong>${indicators.present}</strong>
            </article>
            <article class="stat-card">
              <span>Ausentes</span>
              <strong>${indicators.absent}</strong>
            </article>
            <article class="stat-card">
              <span>Tardes</span>
              <strong>${indicators.late}</strong>
            </article>
          </div>

          <div class="panel-surface">
            <table class="dashboard-table">
              <thead>
                <tr><th>Fecha</th><th>Estado</th></tr>
              </thead>
              <tbody>
                ${attendance.map(item => `<tr><td>${item.date}</td><td>${item.status}</td></tr>`).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;

      container.innerHTML = renderPanelLayout({
        brandTitle: 'Sistema academico',
        pageKicker: 'Resumen academico',
        pageTitle: 'Vista general del estudiante',
        navItems,
        activePath: '/student',
        topbarTitle: 'Bienvenido de nuevo',
        topbarKicker: 'Panel principal',
        content
      });

      document.getElementById('logoutButton')?.addEventListener('click', async () => {
        await AuthController.handleLogout();
      });
    } catch (error) {
      container.innerHTML = '<p class="error-message">Error al cargar datos del estudiante.</p>';
    }
  }
}
