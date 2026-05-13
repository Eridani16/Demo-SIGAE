import { SurveyService } from './survey.service.js';
import { Validators } from '../../utils/validators.js';

export class SurveyController {
  static async handleSubmitSurvey(form) {
    const respondentName = form.respondentName.value.trim();
    const respondentRole = form.respondentRole.value.trim();
    const centralizationScore = form.centralizationScore.value.trim();
    const easeFindingInfo = form.easeFindingInfo.value.trim();
    const comments = form.comments.value.trim();

    if (!Validators.required(respondentName)) return { error: 'Nombre del encuestado requerido' };
    if (!Validators.required(respondentRole)) return { error: 'Rol del encuestado requerido' };
    if (!Validators.required(centralizationScore)) return { error: 'Calificacion de centralizacion requerida' };
    if (!Validators.required(easeFindingInfo)) return { error: 'Calificacion de acceso requerida' };

    try {
      const id = await SurveyService.submitSurvey({
        respondentName,
        respondentRole,
        centralizationScore: Number(centralizationScore),
        easeFindingInfo: Number(easeFindingInfo),
        comments
      });

      return { id };
    } catch (error) {
      return { error: error.message || 'Error al registrar encuesta' };
    }
  }
}
