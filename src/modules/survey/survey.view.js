import { AuthController } from '../auth/auth.controller.js';
import { renderPanelLayout } from '../../utils/panelLayout.js';
import { SurveyController } from './survey.controller.js';

export class SurveyView {
  static renderCentralizationSurvey(containerId) {
    const container = document.getElementById(containerId);
    container.className = 'app-panel';

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
        <form id="surveyForm" class="data-entry-form">
          <div class="form-grid">
            <label class="form-field">
              <span>Nombre del encuestado</span>
              <input type="text" name="respondentName" placeholder="Nombre completo" required />
            </label>

            <label class="form-field">
              <span>Rol</span>
              <select name="respondentRole" required>
                <option value="">Selecciona un rol</option>
                <option value="admin">Administrador</option>
                <option value="teacher">Docente</option>
                <option value="student">Estudiante</option>
              </select>
            </label>

            <label class="form-field">
              <span>Centralizacion de datos (1-5)</span>
              <select name="centralizationScore" required>
                <option value="">Califica</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </label>

            <label class="form-field">
              <span>Facilidad para encontrar informacion (1-5)</span>
              <select name="easeFindingInfo" required>
                <option value="">Califica</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </label>

            <label class="form-field form-field-wide">
              <span>Observaciones</span>
              <textarea name="comments" rows="4" placeholder="Describe tu experiencia con la centralizacion y el acceso a la informacion academica."></textarea>
            </label>
          </div>

          <button type="submit" class="panel-primary-button">Guardar encuesta</button>
          <div id="surveyError" class="error-message"></div>
          <div id="surveySuccess" class="success-message"></div>
        </form>
      </div>
    `;

    container.innerHTML = renderPanelLayout({
      brandTitle: 'Panel administrativo',
      pageKicker: 'Evaluacion del sistema',
      pageTitle: 'Encuesta de centralizacion de datos',
      navItems,
      activePath: '/admin/survey',
      topbarTitle: 'Instrumento de evaluacion',
      topbarKicker: 'Encuesta',
      content
    });

    document.getElementById('logoutButton')?.addEventListener('click', async () => {
      await AuthController.handleLogout();
    });

    const form = document.getElementById('surveyForm');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const result = await SurveyController.handleSubmitSurvey(form);
      const errorDiv = document.getElementById('surveyError');
      const successDiv = document.getElementById('surveySuccess');

      if (result.error) {
        errorDiv.textContent = result.error;
        successDiv.textContent = '';
      } else {
        errorDiv.textContent = '';
        successDiv.textContent = `Encuesta registrada correctamente. ID generado: ${result.id}`;
        form.reset();
      }
    });
  }
}
