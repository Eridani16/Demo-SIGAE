// src/modules/attendance/attendance.controller.js
import { AttendanceService } from './attendance.service.js';
import { Validators } from '../../utils/validators.js';

export class AttendanceController {
  static async handleRegisterAttendance(form) {
    const studentId = form.studentId.value.trim();
    const date = form.date.value;
    const status = form.status.value;
    const teacherId = form.teacherId.value.trim();

    // Validaciones estrictas
    if (!Validators.required(studentId)) return { error: 'Estudiante requerido' };
    if (!Validators.required(date)) return { error: 'Fecha requerida' };
    if (!['presente', 'ausente', 'tarde'].includes(status)) return { error: 'Estado inválido' };
    if (!Validators.required(teacherId)) return { error: 'Docente requerido' };

    try {
      const id = await AttendanceService.registerAttendance({ studentId, date, status, teacherId });
      return { id };
    } catch (error) {
      return { error: error.message || 'Error al registrar asistencia' };
    }
  }
}