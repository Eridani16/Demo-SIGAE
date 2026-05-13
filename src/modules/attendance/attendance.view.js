import { AttendanceController } from './attendance.controller.js';
import { AuthController } from '../auth/auth.controller.js';
import { renderPanelLayout } from '../../utils/panelLayout.js';
import { StudentsService } from '../students/students.service.js';
import { TeachersService } from '../teachers/teachers.service.js';

export class AttendanceView {
  static async renderRegisterAttendance(containerId, role = 'teacher') {
    const container = document.getElementById(containerId);
    container.className = 'app-panel';
    container.innerHTML = '<p>Cargando estudiantes...</p>';

    const navBase = role === 'admin' ? '/admin' : '/teacher';
    const brandTitle = role === 'admin' ? 'Panel administrativo' : 'Panel docente';
    const topbarKicker = role === 'admin' ? 'Administracion' : 'Docencia';
    const topbarTitle = role === 'admin' ? 'Registro de asistencia institucional' : 'Control de asistencia por docente';

    const navItems = [
      { path: navBase, label: 'Inicio' },
      ...(role === 'admin' ? [
        { path: `${navBase}/students`, label: 'Registrar estudiantes' },
        { path: `${navBase}/teachers`, label: 'Registrar docentes' }
      ] : []),
      { path: `${navBase}/grades`, label: 'Registrar notas' },
      { path: `${navBase}/attendance`, label: 'Registrar asistencia' }
    ];

    try {
      const students = await StudentsService.getStudents();
      const teachers = await TeachersService.getTeachers();
      const studentOptions = students.length
        ? students.map(student => `
            <option value="${student.id}">
              ${student.fullName || `${student.firstName || ''} ${student.lastName || ''}`.trim()} - ${student.documentId || 'Sin documento'} - Grado ${student.grade || 'N/A'}${student.group ? ` ${student.group}` : ''}
            </option>
          `).join('')
        : '<option value="">No hay estudiantes registrados</option>';
      const teacherOptions = teachers.length
        ? teachers.map(teacher => `
            <option value="${teacher.id}">
              ${teacher.fullName || `${teacher.firstName || ''} ${teacher.lastName || ''}`.trim()} - ${teacher.specialty || 'Sin especialidad'}
            </option>
          `).join('')
        : '<option value="">No hay docentes registrados</option>';
      const formDisabled = !students.length || !teachers.length;

      const content = `
      <div class="panel-surface form-surface">
        <form id="attendanceForm" class="data-entry-form">
          <div class="form-grid">
            <label class="form-field">
              <span>Estudiante</span>
              <select name="studentId" ${students.length ? 'required' : 'disabled'}>
                <option value="">Selecciona un estudiante</option>
                ${studentOptions}
              </select>
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
              <span>Docente</span>
              <select name="teacherId" ${teachers.length ? 'required' : 'disabled'}>
                <option value="">Selecciona un docente</option>
                ${teacherOptions}
              </select>
            </label>
          </div>

          <button type="submit" class="panel-primary-button" ${formDisabled ? 'disabled' : ''}>Guardar asistencia</button>
          <div id="attendanceError" class="error-message"></div>
          ${students.length ? '' : '<div class="empty-state-message">Primero registra al menos un estudiante desde el panel de administracion.</div>'}
          ${teachers.length ? '' : '<div class="empty-state-message">Primero registra al menos un docente desde el panel de administracion.</div>'}
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
      form?.addEventListener('submit', async (e) => {
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
    } catch (error) {
      container.innerHTML = '<p class="error-message">No fue posible cargar la lista de estudiantes y docentes.</p>';
    }
  }
}
