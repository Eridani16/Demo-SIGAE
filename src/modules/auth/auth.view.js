// src/modules/auth/auth.view.js
import { AuthController } from './auth.controller.js';

export class AuthView {
  static renderLogin(containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = `
      <section class="login-shell">
        <div class="login-card">
          <aside class="login-hero">
            <div class="login-brand">SIGAE</div>
            <div class="login-hero-copy">
              <p class="login-kicker">Sistema academico inteligente</p>
              <h1>Bienvenido a tu espacio academico.</h1>
              <p>
                Consulta notas, asistencia y reportes desde una experiencia
                clara, moderna y pensada para tu institucion.
              </p>
            </div>
            <p class="login-hero-footnote">Planeta Rica, Cordoba</p>
          </aside>

          <div class="login-panel">
            <form id="loginForm" class="login-form">
              <div class="login-heading">
                <h2>Login</h2>
                <p>Ingresa con tu correo institucional para continuar.</p>
              </div>

              <label class="login-field">
                <span>Correo institucional</span>
                <input type="email" name="email" placeholder="usuario@colegio.edu" required />
              </label>

              <label class="login-field">
                <span>Contrasena</span>
                <input type="password" name="password" placeholder="Minimo 6 caracteres" required minlength="6" />
              </label>

              <div class="login-meta">
                <label class="login-remember">
                  <input type="checkbox" name="remember" />
                  <span>Recordarme</span>
                </label>
                <a href="#/" class="login-help">Olvide mi contrasena</a>
              </div>

              <button type="submit" class="login-submit">Ingresar</button>
              <div id="loginError" class="error-message"></div>
            </form>

            <p class="login-signup">
              Nuevo usuario? <a href="#/register">Registrate aqui</a>
            </p>
          </div>
        </div>
      </section>
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
        window.location.hash = `/${result.user.role}`;
      }
    });
  }
}
