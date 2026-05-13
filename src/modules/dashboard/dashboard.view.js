import { AuthController } from '../auth/auth.controller.js';
import { DashboardController } from './dashboard.controller.js';

export class DashboardView {
  static async renderStudentDashboard(containerId, studentId) {
    const container = document.getElementById(containerId);
    container.className = 'app-panel';
    container.innerHTML = '<p>Cargando datos...</p>';
    const userEmail = window.localStorage.getItem('userEmail') || 'usuario@demo.com';
    const userRole = window.localStorage.getItem('userRole') || 'student';
    const userInitial = userEmail.charAt(0).toUpperCase();

    if (!studentId) {
      container.innerHTML = '<p class="error-message">No se encontro una sesion valida.</p>';
      return;
    }

    try {
      const { grades, attendance, average, indicators } = await DashboardController.loadStudentDashboard(studentId);
      const attendanceRate = attendance.length
        ? Math.round((indicators.present / attendance.length) * 100)
        : 0;

      container.innerHTML = `
        <section class="panel-layout">
          <aside class="panel-sidebar">
            <div class="panel-brand">
              <div class="panel-brand-badge">S</div>
              <div>
                <p class="panel-brand-kicker">SIGAE</p>
                <h2>Sistema academico</h2>
              </div>
            </div>

            <nav class="panel-nav">
              <a href="#overview" class="panel-nav-link is-active">Resumen</a>
              <a href="#grades" class="panel-nav-link">Notas</a>
              <a href="#attendance" class="panel-nav-link">Asistencia</a>
            </nav>

            <div class="panel-user-card">
              <div class="panel-user-avatar">${userInitial}</div>
              <div>
                <p class="panel-user-email">${userEmail}</p>
                <p class="panel-user-role">${DashboardView.formatRole(userRole)}</p>
              </div>
            </div>

            <button id="logoutButton" class="panel-logout" type="button">Cerrar sesion</button>
          </aside>

          <div class="panel-main">
            <header class="panel-topbar">
              <div>
                <p class="panel-topbar-kicker">Panel principal</p>
                <h1>Bienvenido de nuevo</h1>
              </div>
              <div class="panel-topbar-user">
                <div class="panel-user-avatar small">${userInitial}</div>
                <div>
                  <p class="panel-user-email">${userEmail}</p>
                  <p class="panel-user-role">${DashboardView.formatRole(userRole)}</p>
                </div>
              </div>
            </header>

            <section id="overview" class="panel-section">
              <div class="section-heading">
                <p class="section-kicker">Resumen academico</p>
                <h2>Vista general del estudiante</h2>
              </div>

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
              </div>
            </section>

            <section id="grades" class="panel-section">
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
                    ${grades.map(g => `<tr><td>${g.subject}</td><td>${g.grade}</td><td>${g.period}</td></tr>`).join('')}
                  </tbody>
                </table>
              </div>
            </section>

            <section id="attendance" class="panel-section">
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
                    ${attendance.map(a => `<tr><td>${a.date}</td><td>${a.status}</td></tr>`).join('')}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </section>
      `;
      document.getElementById('logoutButton')?.addEventListener('click', async () => {
        await AuthController.handleLogout();
      });
    } catch (error) {
      container.innerHTML = '<p class="error-message">Error al cargar datos del estudiante.</p>';
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
