export type UserRole = 'analyst' | 'operator' | 'compliance' | 'admin';

export type AuthSession = {
  username: string;
  displayName: string;
  role: UserRole;
  permissions: string[];
  loggedAt: string;
};

type SessionInput = {
  username: string;
  role: UserRole;
};

const STORAGE_KEY = 'tony.auth.session';
export const AUTH_SESSION_EVENT = 'tony-auth-changed';

const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  analyst: ['analytics:view', 'payments:view', 'treasury:view'],
  operator: ['onboarding:view', 'onboarding:create', 'payments:view', 'treasury:view'],
  compliance: ['compliance:view', 'compliance:report', 'analytics:view'],
  admin: ['admin:view', 'admin:manage', 'compliance:view', 'onboarding:view', 'analytics:view'],
};

function hasStorage(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function notifyAuthChange(): void {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(AUTH_SESSION_EVENT));
  }
}

export function readAuthSession(): AuthSession | null {
  if (!hasStorage()) {
    return null;
  }

  try {
    const rawValue = window.localStorage.getItem(STORAGE_KEY);

    if (!rawValue) {
      return null;
    }

    return JSON.parse(rawValue) as AuthSession;
  } catch {
    return null;
  }
}

export function saveAuthSession(input: SessionInput): AuthSession {
  const normalizedName = input.username.trim() || 'Invitado';
  const session: AuthSession = {
    username: normalizedName.toLowerCase(),
    displayName: normalizedName
      .split(/\s+/)
      .map((token) => token.charAt(0).toUpperCase() + token.slice(1))
      .join(' '),
    role: input.role,
    permissions: ROLE_PERMISSIONS[input.role],
    loggedAt: new Date().toISOString(),
  };

  if (hasStorage()) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  }

  notifyAuthChange();
  return session;
}

export function clearAuthSession(): void {
  if (hasStorage()) {
    window.localStorage.removeItem(STORAGE_KEY);
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
