import { AuthController } from '../auth/auth.controller.js';
import { ReportsController } from './reports.controller.js';

export class ReportsView {
  static async renderStudentReports(containerId) {
    const container = document.getElementById(containerId);
    container.className = 'app-panel';
    container.innerHTML = '<p>Cargando reportes...</p>';
    const userEmail = window.localStorage.getItem('userEmail') || 'admin@demo.com';
    const userRole = window.localStorage.getItem('userRole') || 'admin';
    const userInitial = userEmail.charAt(0).toUpperCase();

    try {
      const summaries = await ReportsController.getStudentReports();
      const topAverage = summaries.length
        ? (summaries.reduce((total, summary) => total + Number(summary.promedio), 0) / summaries.length).toFixed(2)
        : '0.00';

      container.innerHTML = `
        <section class="panel-layout">
          <aside class="panel-sidebar">
            <div class="panel-brand">
              <div class="panel-brand-badge">S</div>
              <div>
                <p class="panel-brand-kicker">SIGAE</p>
                <h2>Panel administrativo</h2>
              </div>
            </div>

            <nav class="panel-nav">
              <a href="#admin-overview" class="panel-nav-link is-active">Resumen</a>
              <a href="#student-reports" class="panel-nav-link">Reportes</a>
              <a href="#metrics" class="panel-nav-link">Metricas</a>
            </nav>

            <div class="panel-user-card">
              <div class="panel-user-avatar">${userInitial}</div>
              <div>
                <p class="panel-user-email">${userEmail}</p>
                <p class="panel-user-role">${ReportsView.formatRole(userRole)}</p>
              </div>
            </div>

            <button id="logoutButton" class="panel-logout" type="button">Cerrar sesion</button>
          </aside>

          <div class="panel-main">
            <header class="panel-topbar">
              <div>
                <p class="panel-topbar-kicker">Administracion</p>
                <h1>Centro de reportes academicos</h1>
              </div>
              <div class="panel-topbar-user">
                <div class="panel-user-avatar small">${userInitial}</div>
                <div>
                  <p class="panel-user-email">${userEmail}</p>
                  <p class="panel-user-role">${ReportsView.formatRole(userRole)}</p>
                </div>
              </div>
            </header>

            <section id="admin-overview" class="panel-section">
              <div class="section-heading">
                <p class="section-kicker">Resumen ejecutivo</p>
                <h2>Estado general de los estudiantes</h2>
              </div>

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
            </section>

            <section id="student-reports" class="panel-section">
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
            </section>

            <section id="metrics" class="panel-section">
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
            </section>
          </div>
        </section>
      `;
      document.getElementById('logoutButton')?.addEventListener('click', async () => {
        await AuthController.handleLogout();
      });
    } catch (error) {
      container.innerHTML = '<p class="error-message">Error al cargar reportes.</p>';
    }
  }

  static formatRole(role) {
    const labels = {
      student: 'Estudiante',
      teacher: 'Docente',
      admin: 'Administrador'
    };

    return labels[role] || role;
  }
}
