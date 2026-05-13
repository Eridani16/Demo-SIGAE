import { AuthController } from '../auth/auth.controller.js';
import { renderPanelLayout } from '../../utils/panelLayout.js';
import { TeachersController } from './teachers.controller.js';
import { getSubjectsByGrade } from '../../utils/constants.js';

export class TeachersView {
  static renderRegisterTeacher(containerId) {
    const container = document.getElementById(containerId);
    container.className = 'app-panel';
    const specialtyOptions = getSubjectsByGrade('')
      .map(subject => `<option value="${subject}">${subject}</option>`)
      .join('');

    const navItems = [
      { path: '/admin', label: 'Resumen' },
      { path: '/admin/students', label: 'Registrar estudiantes' },
      { path: '/admin/teachers', label: 'Registrar docentes' },
      { path: '/admin/grades', label: 'Registrar notas' },
      { path: '/admin/attendance', label: 'Registrar asistencia' },
      { path: '/admin/survey', label: 'Encuesta' }
    ];

    const content = `
      <div class="panel-surface form-surface">
        <form id="teacherForm" class="data-entry-form">
          <div class="form-grid">
            <label class="form-field">
              <span>Nombres</span>
              <input type="text" name="firstName" placeholder="Ana Maria" required />
            </label>

            <label class="form-field">
              <span>Apellidos</span>
              <input type="text" name="lastName" placeholder="Lopez Ruiz" required />
            </label>

            <label class="form-field">
              <span>Documento</span>
              <input type="text" name="documentId" placeholder="52345678" required />
            </label>

            <label class="form-field">
              <span>Especialidad</span>
              <select name="specialty" required>
                <option value="">Selecciona una asignatura</option>
                ${specialtyOptions}
              </select>
            </label>

            <label class="form-field">
              <span>Telefono</span>
              <input type="text" name="phone" placeholder="3001234567" required />
            </label>

            <label class="form-field">
              <span>Correo institucional</span>
              <input type="email" name="email" placeholder="docente@colegio.edu" />
            </label>
          </div>

          <button type="submit" class="panel-primary-button">Guardar docente</button>
          <div id="teacherError" class="error-message"></div>
          <div id="teacherSuccess" class="success-message"></div>
        </form>
      </div>
    `;

    container.innerHTML = renderPanelLayout({
      brandTitle: 'Panel administrativo',
      pageKicker: 'Gestion de talento humano',
      pageTitle: 'Registrar docente',
      navItems,
      activePath: '/admin/teachers',
      topbarTitle: 'Creacion de fichas docentes',
      topbarKicker: 'Administracion',
      content
    });

    document.getElementById('logoutButton')?.addEventListener('click', async () => {
      await AuthController.handleLogout();
    });

    const form = document.getElementById('teacherForm');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const result = await TeachersController.handleRegisterTeacher(form);
      const errorDiv = document.getElementById('teacherError');
      const successDiv = document.getElementById('teacherSuccess');

      if (result.error) {
        errorDiv.textContent = result.error;
        successDiv.textContent = '';
      } else {
        errorDiv.textContent = '';
        successDiv.textContent = `Docente registrado correctamente. ID generado: ${result.id}`;
        form.reset();
      }
    });
  }
}
