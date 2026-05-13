import { AttendanceController } from './attendance.controller.js';
import { AuthController } from '../auth/auth.controller.js';
import { renderPanelLayout } from '../../utils/panelLayout.js';

export class AttendanceView {
  static renderRegisterAttendance(containerId, role = 'teacher') {
    const container = document.getElementById(containerId);
    container.className = 'app-panel';

    const navBase = role === 'admin' ? '/admin' : '/teacher';
    const brandTitle = role === 'admin' ? 'Panel administrativo' : 'Panel docente';
    const topbarKicker = role === 'admin' ? 'Administracion' : 'Docencia';
    const topbarTitle = role === 'admin' ? 'Registro de asistencia institucional' : 'Control de asistencia por docente';

    const navItems = [
      { path: navBase, label: 'Inicio' },
      { path: `${navBase}/grades`, label: 'Registrar notas' },
      { path: `${navBase}/attendance`, label: 'Registrar asistencia' }
    ];

    const content = `
      <div class="panel-surface form-surface">
        <form id="attendanceForm" class="data-entry-form">
          <div class="form-grid">
            <label class="form-field">
              <span>ID del estudiante</span>
              <input type="text" name="studentId" placeholder="Ej: EST-001" required />
            </label>

            <label class="form-field">
              <span>Fecha</span>
              <input type="date" name="date" required />
            </label>

            <label class="form-field">
              <span>Estado</span>
              <select name="status" required>
                <option value="">Selecciona un estado</option>
                <option value="presente">Presente</option>
                <option value="ausente">Ausente</option>
                <option value="tarde">Tarde</option>
              </select>
            </label>

            <label class="form-field form-field-wide">
              <span>ID del docente</span>
              <input type="text" name="teacherId" placeholder="Ej: DOC-001" required />
            </label>
          </div>

          <button type="submit" class="panel-primary-button">Guardar asistencia</button>
          <div id="attendanceError" class="error-message"></div>
        </form>
      </div>
    `;

    container.innerHTML = renderPanelLayout({
      brandTitle,
      pageKicker: 'Ingreso de datos',
      pageTitle: 'Registrar asistencia estudiantil',
      navItems,
      activePath: `${navBase}/attendance`,
      topbarTitle,
      topbarKicker,
      content
    });

    document.getElementById('logoutButton')?.addEventListener('click', async () => {
      await AuthController.handleLogout();
    });

    const form = document.getElementById('attendanceForm');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const result = await AttendanceController.handleRegisterAttendance(form);
      const errorDiv = document.getElementById('attendanceError');
      if (result.error) {
        errorDiv.textContent = result.error;
      } else {
        errorDiv.textContent = '';
        form.reset();
        alert('Asistencia registrada correctamente');
      }
    });
  }
}
