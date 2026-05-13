// src/utils/constants.js
// Constantes globales del sistema

export const ROLES = {
  ADMIN: 'admin',
  TEACHER: 'teacher',
  STUDENT: 'student',
};

export const COLLECTIONS = {
  USERS: 'users',
  STUDENTS: 'students',
  TEACHERS: 'teachers',
  GRADES: 'grades',
  ATTENDANCE: 'attendance',
  ALERTS: 'alerts',
  REPORTS: 'reports',
};

export const SUBJECTS_BY_LEVEL = {
  primary: [
    'Matematicas',
    'Lengua Castellana',
    'Ciencias Naturales',
    'Ciencias Sociales',
    'Ingles',
    'Educacion Fisica',
    'Artistica',
    'Etica y Valores',
    'Religion'
  ],
  secondary: [
    'Matematicas',
    'Geometria',
    'Estadistica',
    'Lengua Castellana',
    'Biologia',
    'Quimica',
    'Fisica',
    'Ciencias Sociales',
    'Ingles',
    'Informatica',
    'Educacion Fisica',
    'Artistica',
    'Etica y Valores',
    'Religion'
  ],
  media: [
    'Matematicas',
    'Calculo',
    'Estadistica',
    'Lengua Castellana',
    'Biologia',
    'Quimica',
    'Fisica',
    'Filosofia',
    'Ciencias Politicas',
    'Ingles',
    'Informatica',
    'Emprendimiento',
    'Educacion Fisica',
    'Etica y Valores'
  ]
};

export const CUSTOM_SUBJECT_VALUE = '__other__';

export function getSubjectsByGrade(grade) {
  const normalizedGrade = String(grade || '').trim().toLowerCase();
  const numericGrade = Number.parseInt(normalizedGrade, 10);

  if (!Number.isNaN(numericGrade)) {
    if (numericGrade >= 1 && numericGrade <= 5) return SUBJECTS_BY_LEVEL.primary;
    if (numericGrade >= 6 && numericGrade <= 9) return SUBJECTS_BY_LEVEL.secondary;
    if (numericGrade >= 10 && numericGrade <= 11) return SUBJECTS_BY_LEVEL.media;
  }

  return [
    ...new Set([
      ...SUBJECTS_BY_LEVEL.primary,
      ...SUBJECTS_BY_LEVEL.secondary,
      ...SUBJECTS_BY_LEVEL.media
    ])
  ];
}
