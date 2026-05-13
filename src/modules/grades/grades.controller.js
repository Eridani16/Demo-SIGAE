// src/modules/grades/grades.controller.js
import { GradesService } from './grades.service.js';
import { Validators } from '../../utils/validators.js';

export class GradesController {
  static async handleRegisterGrade(form) {
    const studentId = form.studentId.value.trim();
    const selectedSubject = form.subject.value.trim();
    const customSubject = form.customSubject ? form.customSubject.value.trim() : '';
    const subject = selectedSubject === '__other__' ? customSubject : selectedSubject;
    const grade = form.grade.value;
    const period = form.period.value.trim();
    const teacherId = form.teacherId.value.trim();

    // Validaciones estrictas
    if (!Validators.required(studentId)) return { error: 'Estudiante requerido' };
    if (!Validators.required(subject)) return { error: 'Asignatura requerida' };
    if (!Validators.isNumber(grade) || grade < 0 || grade > 5) return { error: 'Nota inválida (0-5)' };
    if (!Validators.required(period)) return { error: 'Periodo requerido' };
    if (!Validators.required(teacherId)) return { error: 'Docente requerido' };

    try {
      const id = await GradesService.registerGrade({ studentId, subject, grade: Number(grade), period, teacherId });
      return { id };
    } catch (error) {
      return { error: error.message || 'Error al registrar nota' };
    }
  }
}
