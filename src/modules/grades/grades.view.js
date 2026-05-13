// src/modules/grades/grades.view.js
import { GradesController } from './grades.controller.js';

export class GradesView {
  static renderRegisterGrade(containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = `
      <form id="gradeForm" class="grade-form">
        <h2>Registrar Nota</h2>
        <input type="text" name="studentId" placeholder="ID Estudiante" required />
        <input type="text" name="subject" placeholder="Asignatura" required />
        <input type="number" name="grade" placeholder="Nota (0-5)" min="0" max="5" step="0.1" required />
        <input type="text" name="period" placeholder="Periodo" required />
        <input type="text" name="teacherId" placeholder="ID Docente" required />
        <button type="submit">Registrar</button>
        <div id="gradeError" class="error-message"></div>
      </form>
    `;
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