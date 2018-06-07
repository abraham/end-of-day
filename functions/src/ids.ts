export type DateID = string;
export type ReportID = string;
export type TeamID = string;

export function formatReportId(teamId: string, dateId: DateID): string {
  return `${teamId}_${dateId}`;
}
