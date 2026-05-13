export function formatRole(role) {
  const labels = {
    student: 'Estudiante',
    teacher: 'Docente',
    admin: 'Administrador'
  };

  return labels[role] || role;
}

export function getUserContext() {
  const userEmail = window.localStorage.getItem('userEmail') || 'usuario@demo.com';
  const userRole = window.localStorage.getItem('userRole') || 'student';

  return {
    userEmail,
    userRole,
    userInitial: userEmail.charAt(0).toUpperCase()
  };
}

export function renderPanelLayout({
  brandTitle,
  pageKicker,
  pageTitle,
  navItems,
  activePath,
  topbarTitle,
  topbarKicker,
  content
}) {
  const { userEmail, userRole, userInitial } = getUserContext();

  return `
    <section class="panel-layout">
      <aside class="panel-sidebar">
        <div class="panel-brand">
          <div class="panel-brand-badge">S</div>
          <div>
            <p class="panel-brand-kicker">SIGAE</p>
            <h2>${brandTitle}</h2>
          </div>
        </div>

        <nav class="panel-nav">
          ${navItems.map(item => `
            <a href="#${item.path}" class="panel-nav-link${item.path === activePath ? ' is-active' : ''}">
              ${item.label}
            </a>
          `).join('')}
        </nav>

        <div class="panel-user-card">
          <div class="panel-user-avatar">${userInitial}</div>
          <div>
            <p class="panel-user-email">${userEmail}</p>
            <p class="panel-user-role">${formatRole(userRole)}</p>
          </div>
        </div>

        <button id="logoutButton" class="panel-logout" type="button">Cerrar sesion</button>
      </aside>

      <div class="panel-main">
        <header class="panel-topbar">
          <div>
            <p class="panel-topbar-kicker">${topbarKicker}</p>
            <h1>${topbarTitle}</h1>
          </div>
          <div class="panel-topbar-user">
            <div class="panel-user-avatar small">${userInitial}</div>
            <div>
              <p class="panel-user-email">${userEmail}</p>
              <p class="panel-user-role">${formatRole(userRole)}</p>
            </div>
          </div>
        </header>

        <section class="panel-section">
          <div class="section-heading">
            <p class="section-kicker">${pageKicker}</p>
            <h2>${pageTitle}</h2>
          </div>
          ${content}
        </section>
      </div>
    </section>
  `;
}
