import { StudentsService } from './students.service.js';
import { Validators } from '../../utils/validators.js';

export class StudentsController {
  static async handleRegisterStudent(form) {
    const firstName = form.firstName.value.trim();
    const lastName = form.lastName.value.trim();
    const documentId = form.documentId.value.trim();
    const grade = form.grade.value.trim();
    const group = form.group.value.trim();
    const guardianName = form.guardianName.value.trim();
    const guardianPhone = form.guardianPhone.value.trim();
    const email = form.email.value.trim();

    if (!Validators.required(firstName)) return { error: 'Nombre requerido' };
    if (!Validators.required(lastName)) return { error: 'Apellido requerido' };
    if (!Validators.required(documentId)) return { error: 'Documento requerido' };
    if (!Validators.required(grade)) return { error: 'Grado requerido' };
    if (!Validators.required(group)) return { error: 'Grupo requerido' };
    if (!Validators.required(guardianName)) return { error: 'Acudiente requerido' };
    if (!Validators.required(guardianPhone)) return { error: 'Telefono del acudiente requerido' };
    if (email && !Validators.email(email)) return { error: 'Correo invalido' };

    try {
      const id = await StudentsService.registerStudent({
        firstName,
        lastName,
        fullName: `${firstName} ${lastName}`.trim(),
        documentId,
        grade,
        group,
        guardianName,
        guardianPhone,
        email
      });

      return { id };
    } catch (error) {
      return { error: error.message || 'Error al registrar estudiante' };
    }
  }
}
