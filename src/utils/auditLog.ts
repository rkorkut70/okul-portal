import type { AuditActionType, AuditLogEntry, RegisteredUserRecord, User, UserRole } from '../types';

const USERS_REGISTRY_KEY = 'adu_portal_users_registry_v1';
const AUDIT_LOGS_KEY = 'adu_portal_audit_logs_v1';
const MAX_AUDIT_LOGS = 500;

export function getRegisteredUsers(): RegisteredUserRecord[] {
  try {
    const raw = localStorage.getItem(USERS_REGISTRY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function upsertRegisteredUser(
  user: User,
  options?: { isLogin?: boolean; isRegister?: boolean }
): void {
  const cleanEmail = user.email.trim().toLowerCase();
  const users = getRegisteredUsers();
  const now = new Date().toISOString();
  const existingIdx = users.findIndex((u) => u.email.toLowerCase() === cleanEmail);

  if (existingIdx >= 0) {
    const existing = users[existingIdx];
    users[existingIdx] = {
      ...existing,
      name: user.name || existing.name,
      title: user.title || existing.title,
      department: user.department || existing.department,
      role: existing.role || user.role,
      lastLoginAt: options?.isLogin ? now : existing.lastLoginAt,
      loginCount: options?.isLogin ? existing.loginCount + 1 : existing.loginCount,
    };
  } else {
    users.unshift({
      email: cleanEmail,
      name: user.name,
      title: user.title,
      department: user.department,
      role: user.role,
      registeredAt: now,
      lastLoginAt: now,
      loginCount: options?.isLogin || options?.isRegister ? 1 : 0,
    });
  }

  localStorage.setItem(USERS_REGISTRY_KEY, JSON.stringify(users));
}

export function getStoredUserRole(email: string): UserRole | null {
  const cleanEmail = email.trim().toLowerCase();
  const found = getRegisteredUsers().find((u) => u.email.toLowerCase() === cleanEmail);
  return found ? found.role : null;
}

export function updateRegisteredUserRole(email: string, role: UserRole): RegisteredUserRecord[] {
  const cleanEmail = email.trim().toLowerCase();
  const users = getRegisteredUsers();
  const updated = users.map((u) =>
    u.email.toLowerCase() === cleanEmail ? { ...u, role } : u
  );
  localStorage.setItem(USERS_REGISTRY_KEY, JSON.stringify(updated));
  return updated;
}

export function getAuditLogs(): AuditLogEntry[] {
  try {
    const raw = localStorage.getItem(AUDIT_LOGS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function addAuditLog(params: {
  userEmail: string;
  userName: string;
  userRole: UserRole;
  action: AuditActionType;
  description: string;
  details?: string;
}): AuditLogEntry {
  const logs = getAuditLogs();
  const entry: AuditLogEntry = {
    id: `log-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    timestamp: new Date().toISOString(),
    ...params,
  };
  const next = [entry, ...logs].slice(0, MAX_AUDIT_LOGS);
  localStorage.setItem(AUDIT_LOGS_KEY, JSON.stringify(next));
  return entry;
}

export function clearAuditLogs(): void {
  localStorage.setItem(AUDIT_LOGS_KEY, JSON.stringify([]));
}
