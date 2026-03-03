import { inject } from '@angular/core';
import { CanMatchFn, Router, UrlSegment } from '@angular/router';
import { hasAnyRole, readAuthSession, type UserRole } from '@tony-ui/utils';

function buildRedirectPath(segments: UrlSegment[]): string {
  const path = segments.map((segment) => segment.path).join('/');
  return path ? `/${path}` : '/';
}

export function requireSession(roles?: UserRole[]): CanMatchFn {
  return (_route, segments) => {
    const router = inject(Router);
    const session = readAuthSession();

    if (!session) {
      return router.createUrlTree(['/auth'], {
        queryParams: { redirect: buildRedirectPath(segments) },
      });
    }

    if (roles?.length && !hasAnyRole(session, roles)) {
      return router.createUrlTree(['/auth'], {
        queryParams: { denied: roles.join(',') },
      });
    }

    return true;
  };
}
