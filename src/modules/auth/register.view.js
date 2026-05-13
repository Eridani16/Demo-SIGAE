// src/modules/auth/register.view.js
import { RegisterController } from './register.controller.js';

export class RegisterView {
  static renderRegister(containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = `
      <section class="login-shell">
        <div class="login-card register-card">
          <aside class="login-hero register-hero">
            <div class="login-brand">SIGAE</div>
            <div class="login-hero-copy">
              <p class="login-kicker">Creacion de cuentas</p>
              <h1>Registra nuevos usuarios de forma simple.</h1>
              <p>
                Crea accesos para estudiantes, docentes y administradores
                manteniendo una experiencia clara y consistente.
              </p>
            </div>
            <p class="login-hero-footnote">Gestion academica segura</p>
          </aside>

          <div class="login-panel">
            <form id="registerForm" class="login-form">
              <div class="login-heading">
                <h2>Registro</h2>
                <p>Completa los datos para habilitar un nuevo acceso al sistema.</p>
              </div>

              <label class="login-field">
                <span>Correo institucional</span>
                <input type="email" name="email" placeholder="usuario@colegio.edu" required />
              </label>

              <label class="login-field">
                <span>Contrasena</span>
                <input type="password" name="password" placeholder="Minimo 6 caracteres" required minlength="6" />
              </label>

              <label class="login-field">
                <span>Rol del usuario</span>
                <select name="role" required>
                  <option value="">Selecciona un rol</option>
                  <option value="student">Estudiante</option>
                  <option value="teacher">Docente</option>
                  <option value="admin">Administrador</option>
                </select>
              </label>

              <button type="submit" class="login-submit">Registrar</button>
              <div id="registerError" class="error-message"></div>
            </form>

            <p class="login-signup">
              Ya tienes cuenta? <a href="#/">Volver al login</a>
            </p>
          </div>
        </div>
      </section>
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
        alert('Usuario registrado correctamente. Ahora puedes iniciar sesion.');
        window.location.hash = '/';
      }
    });
  }
}
