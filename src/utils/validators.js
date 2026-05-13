// src/utils/validators.js
// Validaciones reutilizables

export const Validators = {
  required: value => value !== undefined && value !== null && value.toString().trim() !== '',
  email: value => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value),
  minLength: (value, min) => value && value.length >= min,
  maxLength: (value, max) => value && value.length <= max,
  isNumber: value => !isNaN(Number(value)),
  // Agregar más validadores según necesidad
};
