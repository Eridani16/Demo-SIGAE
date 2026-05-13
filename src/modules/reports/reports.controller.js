// src/modules/reports/reports.controller.js
import { ReportsService } from './reports.service.js';

export class ReportsController {
  static async getStudentReports() {
    const grades = await ReportsService.getAllGrades();
    const grouped = ReportsService.groupByStudent(grades);
    const summaries = Object.entries(grouped).map(([studentId, grades]) => ({
      studentId,
      ...ReportsService.calculateStudentSummary(grades)
    }));
    return summaries;
  }
}