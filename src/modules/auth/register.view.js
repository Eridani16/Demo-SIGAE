// src/modules/auth/register.view.js
import { RegisterController } from './register.controller.js';

export class RegisterView {
  static renderRegister(containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = `
      <form id="registerForm" class="register-form">
        <h2>Registro de usuario</h2>
        <input type="email" name="email" placeholder="Correo institucional" required />
        <input type="password" name="password" placeholder="Contraseña (mínimo 6)" required minlength="6" />
        <select name="role" required>
          <option value="">Selecciona un rol</option>
          <option value="student">Estudiante</option>
          <option value="teacher">Docente</option>
          <option value="admin">Administrador</option>
        </select>
        <button type="submit">Registrar</button>
        <div id="registerError" class="error-message"></div>
      </form>
    `;
    const form = document.getElementById('registerForm');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const result = await RegisterController.handleRegister(form);
      const errorDiv = document.getElementById('registerError');
      if (result.error) {
        errorDiv.textContent = result.error;
      } else {
        errorDiv.textContent = '';
        form.reset();
        alert('Usuario registrado correctamente. Ahora puedes iniciar sesión.');
        window.location.hash = '/';
      }
    });
  }
}
