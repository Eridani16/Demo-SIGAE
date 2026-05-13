// src/modules/auth/register.controller.js
import { RegisterService } from './register.service.js';
import { Validators } from '../../utils/validators.js';

export class RegisterController {
  static async handleRegister(form) {
    const email = form.email.value.trim();
    const password = form.password.value;
    const role = form.role.value;
    // Validaciones
    if (!Validators.required(email) || !Validators.email(email)) {
      return { error: 'Correo electrónico inválido' };
    }
    if (!Validators.required(password) || !Validators.minLength(password, 6)) {
      return { error: 'Contraseña inválida (mínimo 6 caracteres)' };
    }
    if (!Validators.required(role)) {
      return { error: 'Debes seleccionar un rol' };
    }
    try {
      await RegisterService.registerUser({ email, password, role });
      return { ok: true };
    } catch (error) {
      return { error: error.message || 'Error al registrar usuario' };
    }
  }
}
