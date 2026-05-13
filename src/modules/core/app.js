// src/modules/core/app.js
import { Router } from '../../utils/router.js';
import { AuthView } from '../auth/auth.view.js';
import { DashboardView } from '../dashboard/dashboard.view.js';
import { ReportsView } from '../reports/reports.view.js';
import { RegisterView } from '../auth/register.view.js';
// ...existing code...
import { auth } from './firebase.js';

auth.onAuthStateChanged(user => {
  if (!user) {
    window.location.hash = '/';
  }
});
// ...existing code...

const appDiv = document.getElementById('app');

const routes = {
  '/': () => AuthView.renderLogin('app'),
  '/register': () => RegisterView.renderRegister('app'),
  '/student': () => DashboardView.renderStudentDashboard('app', window.localStorage.getItem('studentId')),
  '/admin': () => ReportsView.renderStudentReports('app'),
  '/404': () => { appDiv.innerHTML = '<h2>Página no encontrada</h2>'; }
};

new Router(routes);

// Guardar el id del estudiante tras login para demo (en producción usar JWT o contexto seguro)
window.addEventListener('hashchange', () => {
  if (window.location.hash.startsWith('#/student')) {
    // Aquí podrías cargar datos del usuario autenticado
  }
});