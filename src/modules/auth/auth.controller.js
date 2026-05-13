// src/modules/auth/auth.controller.js
import { AuthService } from './auth.service.js';
import { Validators } from '../../utils/validators.js';

export class AuthController {
  static async handleLogin(form) {
    const email = form.email.value.trim();
    const password = form.password.value;

    if (!Validators.required(email) || !Validators.email(email)) {
      return { error: 'Correo electronico invalido' };
    }

    if (!Validators.required(password) || !Validators.minLength(password, 6)) {
      return { error: 'Contrasena invalida (minimo 6 caracteres)' };
    }

    try {
      const user = await AuthService.login(email, password);
      window.localStorage.setItem('userId', user.uid);
      window.localStorage.setItem('userEmail', user.email);
      window.localStorage.setItem('userRole', user.role);
      window.localStorage.setItem('studentId', user.uid);
      return { user };
    } catch (error) {
      return { error: error.message || 'Error de autenticacion' };
    }
  }

  static async handleLogout() {
    await AuthService.logout();
    window.localStorage.removeItem('userId');
    window.localStorage.removeItem('userEmail');
    window.localStorage.removeItem('userRole');
    window.localStorage.removeItem('studentId');
    window.location.hash = '/';
  }
}
