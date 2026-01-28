export interface Competitor {
  email?: string;
  nickname?: string;
  rank?: number;
  highest_level?: number;
  highestLevel?: number;
  completed_at?: string;
  completedAt?: string;
  total_attempts?: number;
  totalAttempts?: number;
}

export const mockCompetitors: Competitor[] = [
  {
    "email": "",
    "nickname": "AcidBurn",
    "highest_level": 6,
    "completed_at": "2026-01-27T09:12:00.000Z",
    "total_attempts": 18
  },
  {
    "email": "",
    "nickname": "PhiberOptik",
    "highest_level": 5,
    "completed_at": "2026-01-27T10:25:00.000Z",
    "total_attempts": 24
  },
  {
    "email": "",
    "nickname": "Trinity",
    "highest_level": 4,
    "completed_at": "2026-01-27T08:40:00.000Z",
    "total_attempts": 30
  },
  {
    "email": "",
    "nickname": "CrashOverride"
  },
  {
    "email": "",
    "nickname": "CerealKiller"
  },
  {
    "email": "",
    "nickname": "ThePlague"
  },
];
