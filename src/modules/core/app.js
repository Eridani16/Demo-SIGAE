// src/modules/core/app.js
import { Router } from '../../utils/router.js';
import { AuthView } from '../auth/auth.view.js';
import { RegisterView } from '../auth/register.view.js';
import { DashboardView } from '../dashboard/dashboard.view.js';
import { ReportsView } from '../reports/reports.view.js';
import { GradesView } from '../grades/grades.view.js';
import { AttendanceView } from '../attendance/attendance.view.js';
import { StudentsView } from '../students/students.view.js';
import { auth } from './firebase.js';

auth.onAuthStateChanged(user => {
  if (!user) {
    window.location.hash = '/';
  }
});

const appDiv = document.getElementById('app');

const routes = {
  '/': () => AuthView.renderLogin('app'),
  '/register': () => RegisterView.renderRegister('app'),
  '/student': () => DashboardView.renderStudentDashboard('app', window.localStorage.getItem('studentId')),
  '/teacher': () => GradesView.renderRegisterGrade('app', 'teacher'),
  '/teacher/grades': () => GradesView.renderRegisterGrade('app', 'teacher'),
  '/teacher/attendance': () => AttendanceView.renderRegisterAttendance('app', 'teacher'),
  '/admin': () => ReportsView.renderStudentReports('app'),
  '/admin/students': () => StudentsView.renderRegisterStudent('app'),
  '/admin/grades': () => GradesView.renderRegisterGrade('app', 'admin'),
  '/admin/attendance': () => AttendanceView.renderRegisterAttendance('app', 'admin'),
  '/404': () => { appDiv.innerHTML = '<h2>Pagina no encontrada</h2>'; }
};

new Router(routes);
