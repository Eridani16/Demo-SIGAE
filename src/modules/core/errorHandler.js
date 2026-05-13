// src/modules/core/errorHandler.js
// Manejador centralizado de errores

export class ErrorHandler {
  static handle(error, context = '') {
    // Log para desarrollo (en navegador siempre muestra)
    console.error(`[${context}]`, error);
    // Mostrar mensaje amigable
    alert('Ocurrió un error inesperado. Intenta nuevamente.');
    // Aquí se puede agregar lógica para reportar errores a un sistema externo
  }
}
