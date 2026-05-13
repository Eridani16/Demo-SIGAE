import { TeachersService } from './teachers.service.js';
import { Validators } from '../../utils/validators.js';

export class TeachersController {
  static async handleRegisterTeacher(form) {
    const firstName = form.firstName.value.trim();
    const lastName = form.lastName.value.trim();
    const documentId = form.documentId.value.trim();
    const specialty = form.specialty.value.trim();
    const phone = form.phone.value.trim();
    const email = form.email.value.trim();

    if (!Validators.required(firstName)) return { error: 'Nombre requerido' };
    if (!Validators.required(lastName)) return { error: 'Apellido requerido' };
    if (!Validators.required(documentId)) return { error: 'Documento requerido' };
    if (!Validators.required(specialty)) return { error: 'Especialidad requerida' };
    if (!Validators.required(phone)) return { error: 'Telefono requerido' };
    if (email && !Validators.email(email)) return { error: 'Correo invalido' };

    try {
      const id = await TeachersService.registerTeacher({
        firstName,
        lastName,
        fullName: `${firstName} ${lastName}`.trim(),
        documentId,
        specialty,
        phone,
        email
      });

      return { id };
    } catch (error) {
      return { error: error.message || 'Error al registrar docente' };
    }
  }
}
