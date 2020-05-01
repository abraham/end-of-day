export type DateID = string;
export type ReportID = string;
export type TeamID = string;

export function formatReportId(teamId: TeamID, dateId: DateID): string {
  return `${teamId}_${dateId}`;
}

export function formatMessageId({
  team_id,
  user_id,
  date_id,
}: {
  team_id: string;
  user_id: string;
  date_id: string;
}): string {
  return `${team_id}_${user_id}_${date_id}`;
}
