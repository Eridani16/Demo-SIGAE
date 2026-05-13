// src/modules/attendance/attendance.view.js
import { AttendanceController } from './attendance.controller.js';

export class AttendanceView {
  static renderRegisterAttendance(containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = `
      <form id="attendanceForm" class="attendance-form">
        <h2>Registrar Asistencia</h2>
        <input type="text" name="studentId" placeholder="ID Estudiante" required />
        <input type="date" name="date" required />
        <select name="status" required>
          <option value="">Estado</option>
          <option value="presente">Presente</option>
          <option value="ausente">Ausente</option>
          <option value="tarde">Tarde</option>
        </select>
        <input type="text" name="teacherId" placeholder="ID Docente" required />
        <button type="submit">Registrar</button>
        <div id="attendanceError" class="error-message"></div>
      </form>
    `;
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