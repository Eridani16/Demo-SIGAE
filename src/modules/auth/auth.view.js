// src/modules/auth/auth.view.js
import { AuthController } from './auth.controller.js';

export class AuthView {
  static renderLogin(containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = `
      <form id="loginForm" class="login-form">
        <h2>Iniciar sesión</h2>
        <input type="email" name="email" placeholder="Correo institucional" required />
        <input type="password" name="password" placeholder="Contraseña" required minlength="6" />
        <button type="submit">Ingresar</button>
        <div id="loginError" class="error-message"></div>
      </form>
      <p style="text-align:center;margin-top:1rem;">
        ¿No tienes cuenta? <a href="#/register">Regístrate aquí</a>
      </p>
    `;
    const form = document.getElementById('loginForm');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const result = await AuthController.handleLogin(form);
      const errorDiv = document.getElementById('loginError');
      if (result.error) {
        errorDiv.textContent = result.error;
      } else {
        errorDiv.textContent = '';
        // Redirigir según rol
        window.location.hash = `/${result.user.role}`;
      }
    });
  }
}