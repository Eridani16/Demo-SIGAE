// src/modules/auth/auth.controller.js
import { AuthService } from './auth.service.js';
import { Validators } from '../../utils/validators.js';

export class AuthController {
  static async handleLogin(form) {
    const email = form.email.value.trim();
    const password = form.password.value;
    // Validación estricta
    if (!Validators.required(email) || !Validators.email(email)) {
      return { error: 'Correo electrónico inválido' };
    }
    if (!Validators.required(password) || !Validators.minLength(password, 6)) {
      return { error: 'Contraseña inválida (mínimo 6 caracteres)' };
    }
    try {
      const user = await AuthService.login(email, password);
      return { user };
    } catch (error) {
      return { error: error.message || 'Error de autenticación' };
    }
  }

  static async handleLogout() {
    await AuthService.logout();
  }
}