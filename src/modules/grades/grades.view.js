import { GradesController } from './grades.controller.js';
import { AuthController } from '../auth/auth.controller.js';
import { renderPanelLayout } from '../../utils/panelLayout.js';

export class GradesView {
  static renderRegisterGrade(containerId, role = 'teacher') {
    const container = document.getElementById(containerId);
    container.className = 'app-panel';

    const navBase = role === 'admin' ? '/admin' : '/teacher';
    const brandTitle = role === 'admin' ? 'Panel administrativo' : 'Panel docente';
    const topbarKicker = role === 'admin' ? 'Administracion' : 'Docencia';
    const topbarTitle = role === 'admin' ? 'Registro de notas institucional' : 'Carga de notas por docente';

    const navItems = [
      { path: navBase, label: 'Inicio' },
      { path: `${navBase}/grades`, label: 'Registrar notas' },
      { path: `${navBase}/attendance`, label: 'Registrar asistencia' }
    ];

    const content = `
      <div class="panel-surface form-surface">
        <form id="gradeForm" class="data-entry-form">
          <div class="form-grid">
            <label class="form-field">
              <span>ID del estudiante</span>
              <input type="text" name="studentId" placeholder="Ej: EST-001" required />
            </label>

            <label class="form-field">
              <span>Asignatura</span>
              <input type="text" name="subject" placeholder="Matematicas" required />
            </label>

            <label class="form-field">
              <span>Nota</span>
              <input type="number" name="grade" placeholder="0.0 - 5.0" min="0" max="5" step="0.1" required />
            </label>

            <label class="form-field">
              <span>Periodo</span>
              <input type="text" name="period" placeholder="2026-1" required />
            </label>

            <label class="form-field form-field-wide">
              <span>ID del docente</span>
              <input type="text" name="teacherId" placeholder="Ej: DOC-001" required />
            </label>
          </div>

          <button type="submit" class="panel-primary-button">Guardar nota</button>
          <div id="gradeError" class="error-message"></div>
        </form>
      </div>
    `;

    container.innerHTML = renderPanelLayout({
      brandTitle,
      pageKicker: 'Ingreso de datos',
      pageTitle: 'Registrar nota academica',
      navItems,
      activePath: `${navBase}/grades`,
      topbarTitle,
      topbarKicker,
      content
    });

    document.getElementById('logoutButton')?.addEventListener('click', async () => {
      await AuthController.handleLogout();
    });

    const form = document.getElementById('gradeForm');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const result = await GradesController.handleRegisterGrade(form);
      const errorDiv = document.getElementById('gradeError');
      if (result.error) {
        errorDiv.textContent = result.error;
      } else {
        errorDiv.textContent = '';
        form.reset();
        alert('Nota registrada correctamente');
      }
    });
  }
}
