import { AuthController } from '../auth/auth.controller.js';
import { renderPanelLayout } from '../../utils/panelLayout.js';

export class TeacherDashboardView {
  static renderTeacherDashboard(containerId) {
    const container = document.getElementById(containerId);
    container.className = 'app-panel';

    const navItems = [
      { path: '/teacher', label: 'Inicio' },
      { path: '/teacher/grades', label: 'Registrar notas' },
      { path: '/teacher/attendance', label: 'Registrar asistencia' }
    ];

    const content = `
      <div class="stats-grid">
        <article class="stat-card">
          <span>Registrar notas</span>
          <p>Carga las notas de tus estudiantes por asignatura.</p>
          <a href="#/teacher/grades" class="panel-primary-button">Ir al registro</a>
        </article>
        <article class="stat-card">
          <span>Registrar asistencia</span>
          <p>Controla la asistencia diaria de tus estudiantes.</p>
          <a href="#/teacher/attendance" class="panel-primary-button">Ir al registro</a>
        </article>
      </div>
    `;

    container.innerHTML = renderPanelLayout({
      brandTitle: 'Panel docente',
      pageKicker: 'Inicio',
      pageTitle: 'Bienvenido docente',
      navItems,
      activePath: '/teacher',
      topbarTitle: 'Panel de control docente',
      topbarKicker: 'Docencia',
      content
    });

    document.getElementById('logoutButton')?.addEventListener('click', async () => {
      await AuthController.handleLogout();
    });
  }
}
