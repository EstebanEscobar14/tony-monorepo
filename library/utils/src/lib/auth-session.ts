export type UserRole = 'analyst' | 'operator' | 'compliance' | 'admin';

export type AuthSession = {
  username: string;
  displayName: string;
  role: UserRole;
  permissions: string[];
  loggedAt: string;
  expiresAt: string;
};

type SessionInput = {
  username: string;
  role: UserRole;
};

const STORAGE_KEY = 'tony.auth.session';
export const AUTH_SESSION_EVENT = 'tony-auth-changed';
export const AUTH_SESSION_TTL_MS = 1000 * 60 * 60 * 8;

type SessionStorageAdapter = {
  read(): string | null;
  write(value: string): void;
  remove(): void;
};

const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  analyst: ['analytics:view', 'payments:view', 'treasury:view'],
  operator: ['onboarding:view', 'onboarding:create', 'payments:view', 'treasury:view'],
  compliance: ['compliance:view', 'compliance:report', 'analytics:view'],
  admin: ['admin:view', 'admin:manage', 'compliance:view', 'onboarding:view', 'analytics:view'],
};

const USER_ROLES = new Set<UserRole>(['analyst', 'operator', 'compliance', 'admin']);

function hasStorage(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function createSessionStorageAdapter(): SessionStorageAdapter | null {
  if (!hasStorage()) {
    return null;
  }

  return {
    read: () => window.localStorage.getItem(STORAGE_KEY),
    write: (value) => window.localStorage.setItem(STORAGE_KEY, value),
    remove: () => window.localStorage.removeItem(STORAGE_KEY),
  };
}

function notifyAuthChange(): void {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(AUTH_SESSION_EVENT));
  }
}

function isUserRole(value: unknown): value is UserRole {
  return typeof value === 'string' && USER_ROLES.has(value as UserRole);
}

function normalizeDisplayName(username: string): string {
  return username
    .split(/\s+/)
    .map((token) => token.charAt(0).toUpperCase() + token.slice(1))
    .join(' ');
}

function isValidIsoDate(value: unknown): value is string {
  return typeof value === 'string' && !Number.isNaN(Date.parse(value));
}

function normalizeSession(value: unknown, now = Date.now()): AuthSession | null {
  if (!value || typeof value !== 'object') {
    return null;
  }

  const candidate = value as Partial<AuthSession>;
  const normalizedUsername =
    typeof candidate.username === 'string' ? candidate.username.trim().toLowerCase() : '';
  const loggedAt = isValidIsoDate(candidate.loggedAt) ? candidate.loggedAt : null;
  const expiresAt = isValidIsoDate(candidate.expiresAt)
    ? candidate.expiresAt
    : loggedAt
      ? new Date(Date.parse(loggedAt) + AUTH_SESSION_TTL_MS).toISOString()
      : null;

  if (!normalizedUsername || !isUserRole(candidate.role) || !loggedAt || !expiresAt) {
    return null;
  }

  if (Date.parse(expiresAt) <= now) {
    return null;
  }

  return {
    username: normalizedUsername,
    displayName:
      typeof candidate.displayName === 'string' && candidate.displayName.trim()
        ? candidate.displayName.trim()
        : normalizeDisplayName(normalizedUsername),
    role: candidate.role,
    permissions: [...ROLE_PERMISSIONS[candidate.role]],
    loggedAt,
    expiresAt,
  };
}

export function readAuthSession(): AuthSession | null {
  const storage = createSessionStorageAdapter();

  if (!storage) {
    return null;
  }

  try {
    const rawValue = storage.read();

    if (!rawValue) {
      return null;
    }

    const session = normalizeSession(JSON.parse(rawValue));

    if (!session) {
      storage.remove();
    }

    return session;
  } catch {
    storage.remove();
    return null;
  }
}

export function saveAuthSession(input: SessionInput): AuthSession {
  const normalizedName = input.username.trim() || 'Invitado';
  const loggedAt = new Date();
  const session: AuthSession = {
    username: normalizedName.toLowerCase(),
    displayName: normalizeDisplayName(normalizedName),
    role: input.role,
    permissions: [...ROLE_PERMISSIONS[input.role]],
    loggedAt: loggedAt.toISOString(),
    expiresAt: new Date(loggedAt.getTime() + AUTH_SESSION_TTL_MS).toISOString(),
  };

  const storage = createSessionStorageAdapter();

  if (storage) {
    storage.write(JSON.stringify(session));
  }

  notifyAuthChange();
  return session;
}

export function clearAuthSession(): void {
  const storage = createSessionStorageAdapter();

  if (storage) {
    storage.remove();
  }

  notifyAuthChange();
}

export function hasAnyRole(session: AuthSession | null, roles: UserRole[]): boolean {
  if (!session) {
    return false;
  }

  return roles.includes(session.role);
}

export function getRoleLabel(role: UserRole): string {
  switch (role) {
    case 'admin':
      return 'Administrador';
    case 'analyst':
      return 'Analista';
    case 'compliance':
      return 'Compliance';
    case 'operator':
      return 'Operaciones';
  }
}
