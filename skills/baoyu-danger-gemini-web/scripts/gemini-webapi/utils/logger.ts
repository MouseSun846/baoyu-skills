export type LogLevel = 'TRACE' | 'DEBUG' | 'INFO' | 'WARNING' | 'ERROR' | 'CRITICAL' | number;

const lvl: Record<Exclude<LogLevel, number>, number> = {
  TRACE: 0,
  DEBUG: 1,
  INFO: 2,
  WARNING: 3,
  ERROR: 4,
  CRITICAL: 5,
};

let cur = lvl.TRACE;

function toNum(level: LogLevel): number {
  if (typeof level === 'number') return level;
  return lvl[level] ?? lvl.TRACE;
}

export function set_log_level(level: LogLevel): void {
  cur = toNum(level);
}

export const setLogLevel = set_log_level;

function emit(level: Exclude<LogLevel, number>, args: unknown[]): void {

  const prefix = `[gemini_webapi] ${level}:`;
  console.log(prefix, ...args);
}

export const logger = {
  trace: (...args: unknown[]) => emit('TRACE', args),
  debug: (...args: unknown[]) => emit('DEBUG', args),
  info: (...args: unknown[]) => emit('INFO', args),
  warning: (...args: unknown[]) => emit('WARNING', args),
  error: (...args: unknown[]) => emit('ERROR', args),
  success: (...args: unknown[]) => emit('INFO', args),
};

