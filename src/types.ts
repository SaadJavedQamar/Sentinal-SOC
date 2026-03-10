export enum Severity {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

export enum AlertStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  RESOLVED = 'RESOLVED',
  DISMISSED = 'DISMISSED'
}

export interface SecurityAlert {
  id: string;
  timestamp: string;
  source: string;
  type: string;
  severity: Severity;
  status: AlertStatus;
  description: string;
  payload?: any;
}

export interface SystemMetric {
  name: string;
  value: number;
  unit: string;
  change: number;
}

export interface ThreatData {
  id: string;
  lat: number;
  lng: number;
  intensity: number;
  type: string;
}
