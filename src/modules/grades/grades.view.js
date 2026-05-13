import { GradesController } from './grades.controller.js';
import { AuthController } from '../auth/auth.controller.js';
import { getUserContext, renderPanelLayout } from '../../utils/panelLayout.js';
import { StudentsService } from '../students/students.service.js';
import { CUSTOM_SUBJECT_VALUE, getSubjectsByGrade } from '../../utils/constants.js';

export class GradesView {
  static async renderRegisterGrade(containerId, role = 'teacher') {
    const container = document.getElementById(containerId);
    container.className = 'app-panel';
    container.innerHTML = '<p>Cargando estudiantes...</p>';

    const navBase = role === 'admin' ? '/admin' : '/teacher';
    const brandTitle = role === 'admin' ? 'Panel administrativo' : 'Panel docente';
    const topbarKicker = role === 'admin' ? 'Administracion' : 'Docencia';
    const topbarTitle = role === 'admin' ? 'Registro de notas institucional' : 'Carga de notas por docente';
    const { userId } = getUserContext();

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
      const studentOptions = students.length
        ? students.map(student => `
            <option value="${student.id}" data-grade="${student.grade || ''}">
              ${student.fullName || `${student.firstName || ''} ${student.lastName || ''}`.trim()} - ${student.documentId || 'Sin documento'} - Grado ${student.grade || 'N/A'}${student.group ? ` ${student.group}` : ''}
            </option>
          `).join('')
        : '<option value="">No hay estudiantes registrados</option>';
      const initialSubjects = getSubjectsByGrade('');
      const subjectOptions = initialSubjects.map(subject => `<option value="${subject}">${subject}</option>`).join('');

      const content = `
      <div class="panel-surface form-surface">
        <form id="gradeForm" class="data-entry-form">
          <div class="form-grid">
            <label class="form-field">
              <span>Estudiante</span>
              <select name="studentId" ${students.length ? 'required' : 'disabled'}>
                <option value="">Selecciona un estudiante</option>
                ${studentOptions}
              </select>
            </label>

            <label class="form-field">
              <span>Asignatura</span>
              <select name="subject" id="subjectSelect" required>
                <option value="">Selecciona una asignatura</option>
                ${subjectOptions}
                <option value="${CUSTOM_SUBJECT_VALUE}">Otra</option>
              </select>
            </label>

            <label class="form-field is-hidden" id="customSubjectField">
              <span>Otra asignatura</span>
              <input type="text" name="customSubject" id="customSubjectInput" placeholder="Escribe la asignatura" />
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
              <input type="text" name="teacherId" value="${userId}" readonly required />
            </label>
          </div>

          <button type="submit" class="panel-primary-button" ${students.length ? '' : 'disabled'}>Guardar nota</button>
          <div id="gradeError" class="error-message"></div>
          ${students.length ? '' : '<div class="empty-state-message">Primero registra al menos un estudiante desde el panel de administracion.</div>'}
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
      const studentSelect = form?.elements.namedItem('studentId');
      const subjectSelect = document.getElementById('subjectSelect');
      const customSubjectField = document.getElementById('customSubjectField');
      const customSubjectInput = document.getElementById('customSubjectInput');

      const renderSubjects = (grade) => {
        const availableSubjects = getSubjectsByGrade(grade);
        const options = [
          '<option value="">Selecciona una asignatura</option>',
          ...availableSubjects.map(subject => `<option value="${subject}">${subject}</option>`),
          `<option value="${CUSTOM_SUBJECT_VALUE}">Otra</option>`
        ];
        subjectSelect.innerHTML = options.join('');
        customSubjectField.classList.add('is-hidden');
        customSubjectInput.value = '';
        customSubjectInput.required = false;
      };

      studentSelect?.addEventListener('change', () => {
        const selectedOption = studentSelect.options[studentSelect.selectedIndex];
        renderSubjects(selectedOption?.dataset.grade || '');
      });

      subjectSelect?.addEventListener('change', () => {
        const isCustom = subjectSelect.value === CUSTOM_SUBJECT_VALUE;
        customSubjectField.classList.toggle('is-hidden', !isCustom);
        customSubjectInput.required = isCustom;
        if (!isCustom) {
          customSubjectInput.value = '';
        }
      });

      form?.addEventListener('submit', async (e) => {
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
    } catch (error) {
      container.innerHTML = '<p class="error-message">No fue posible cargar la lista de estudiantes.</p>';
    }
  }
}
