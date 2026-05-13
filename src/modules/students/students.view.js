import { AuthController } from '../auth/auth.controller.js';
import { renderPanelLayout } from '../../utils/panelLayout.js';
import { StudentsController } from './students.controller.js';

export class StudentsView {
  static renderRegisterStudent(containerId) {
    const container = document.getElementById(containerId);
    container.className = 'app-panel';

    const navItems = [
      { path: '/admin', label: 'Resumen' },
      { path: '/admin/students', label: 'Registrar estudiantes' },
      { path: '/admin/grades', label: 'Registrar notas' },
      { path: '/admin/attendance', label: 'Registrar asistencia' }
    ];

    const content = `
      <div class="panel-surface form-surface">
        <form id="studentForm" class="data-entry-form">
          <div class="form-grid">
            <label class="form-field">
              <span>Nombres</span>
              <input type="text" name="firstName" placeholder="Juan David" required />
            </label>

            <label class="form-field">
              <span>Apellidos</span>
              <input type="text" name="lastName" placeholder="Perez Gomez" required />
            </label>

            <label class="form-field">
              <span>Documento</span>
              <input type="text" name="documentId" placeholder="1020304050" required />
            </label>

            <label class="form-field">
              <span>Grado</span>
              <input type="text" name="grade" placeholder="9" required />
            </label>

            <label class="form-field">
              <span>Grupo</span>
              <input type="text" name="group" placeholder="A" required />
            </label>

            <label class="form-field">
              <span>Correo institucional</span>
              <input type="email" name="email" placeholder="estudiante@colegio.edu" />
            </label>

            <label class="form-field">
              <span>Nombre del acudiente</span>
              <input type="text" name="guardianName" placeholder="Maria Gomez" required />
            </label>

            <label class="form-field">
              <span>Telefono del acudiente</span>
              <input type="text" name="guardianPhone" placeholder="3001234567" required />
            </label>
          </div>

          <button type="submit" class="panel-primary-button">Guardar estudiante</button>
          <div id="studentError" class="error-message"></div>
          <div id="studentSuccess" class="success-message"></div>
        </form>
      </div>
    `;

    container.innerHTML = renderPanelLayout({
      brandTitle: 'Panel administrativo',
      pageKicker: 'Matricula academica',
      pageTitle: 'Registrar estudiante',
      navItems,
      activePath: '/admin/students',
      topbarTitle: 'Creacion de fichas estudiantiles',
      topbarKicker: 'Administracion',
      content
    });

    document.getElementById('logoutButton')?.addEventListener('click', async () => {
      await AuthController.handleLogout();
    });

    const form = document.getElementById('studentForm');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const result = await StudentsController.handleRegisterStudent(form);
      const errorDiv = document.getElementById('studentError');
      const successDiv = document.getElementById('studentSuccess');

      if (result.error) {
        errorDiv.textContent = result.error;
        successDiv.textContent = '';
      } else {
        errorDiv.textContent = '';
        successDiv.textContent = `Estudiante registrado correctamente. ID generado: ${result.id}`;
        form.reset();
      }
    });
  }
}
