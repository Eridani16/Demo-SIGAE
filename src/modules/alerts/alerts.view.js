// src/modules/alerts/alerts.view.js
export class AlertsView {
  static renderAlert(containerId, alert) {
    const container = document.getElementById(containerId);
    container.innerHTML = `
      <div class="alert alert-warning">
        <strong>Alerta:</strong> ${alert.message}
      </div>
    `;
  }
}