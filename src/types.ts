export interface TeamMember {
  id: number;
  name: string;
  role: string;
  team: string;
  category: string;
  skills?: string[];
  avatar?: string;
  bio?: string;
  github?: string;
  linkedin?: string;
  status?: string;
}

export interface SystemDiagnostic {
  channel: string;
  status: string;
  freq: string;
  voltage: string;
  bandwidth: string;
}

export interface LoadingLetter {
  char: string;
  label: string;
  description: string;
  glow: string;
}

export interface TelemetryPacket {
  id: string;
  timestamp: string;
  source: string;
  data: string;
  type: 'UART' | 'I2C' | 'SPI' | 'GPIO' | 'AI_CORE';
}
