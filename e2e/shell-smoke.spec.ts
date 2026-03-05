import { expect, test, type Page } from '@playwright/test';

type UserRole = 'analyst' | 'operator' | 'compliance' | 'admin';

function buildSession(role: UserRole, username = 'candidate') {
  const rolePermissions: Record<UserRole, string[]> = {
    analyst: ['analytics:view', 'payments:view', 'treasury:view'],
    operator: ['onboarding:view', 'onboarding:create', 'payments:view', 'treasury:view'],
    compliance: ['compliance:view', 'compliance:report', 'analytics:view'],
    admin: ['admin:view', 'admin:manage', 'compliance:view', 'onboarding:view', 'analytics:view'],
  };

  return {
    username,
    displayName: 'Candidate',
    role,
    permissions: rolePermissions[role],
    loggedAt: new Date().toISOString(),
  };
}

async function seedSession(page: Page, role: UserRole) {
  const session = buildSession(role);
  await page.addInitScript((value) => {
    window.localStorage.setItem('tony.auth.session', JSON.stringify(value));
  }, session);
}

async function waitForRenderWarmup(page: Page) {
  for (let attempt = 0; attempt < 12; attempt += 1) {
    const bodyText = (await page.locator('body').textContent()) ?? '';

    if (!bodyText.includes('Application loading') && !bodyText.includes('Service waking up')) {
      return;
    }

    await page.waitForTimeout(5000);
    await page.reload({ waitUntil: 'domcontentloaded' });
  }
}

async function gotoApp(page: Page, path: string) {
  await page.goto(path, { waitUntil: 'domcontentloaded' });
  await waitForRenderWarmup(page);
}

test.describe('CapitalFlow shell smoke', () => {
  test('home loads and docs link points to deployed docs', async ({ page }) => {
    await gotoApp(page, '/');

    await expect(page.getByRole('heading', { name: /Host Angular con dominios federados/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Ver libreria de componentes/i })).toHaveAttribute(
      'href',
      /capitalflow-docs\.onrender\.com|localhost:4301/
    );
  });

  test('payments route renders the payments remote', async ({ page }) => {
    await gotoApp(page, '/payments');

    await expect(page.getByRole('heading', { name: /Pipeline de pagos en tiempo real/i })).toBeVisible();
    await expect(page.getByText(/Pagos en lote:/i)).toBeVisible();
  });

  test('treasury route renders the treasury remote', async ({ page }) => {
    await gotoApp(page, '/treasury');

    await expect(page.getByRole('heading', { name: /Cash positioning de alto volumen/i })).toBeVisible();
  });

  test('auth route renders the login remote', async ({ page }) => {
    await gotoApp(page, '/auth');

    await expect(page.getByRole('heading', { name: /Acceso y proteccion de rutas/i })).toBeVisible();
    await expect(page.getByLabel(/Usuario/i)).toBeVisible();
  });

  test('protected route redirects to auth without session', async ({ page }) => {
    await gotoApp(page, '/admin');

    await expect(page).toHaveURL(/\/auth/);
    await expect(page.getByRole('heading', { name: /Acceso y proteccion de rutas/i })).toBeVisible();
  });

  test('compliance route renders with a compliance session', async ({ page }) => {
    await seedSession(page, 'compliance');
    await gotoApp(page, '/compliance');

    await expect(
      page.getByRole('heading', { name: /Supervision regulatoria preparada para reporting/i })
    ).toBeVisible();
  });

  test('onboarding route renders with an operator session', async ({ page }) => {
    await seedSession(page, 'operator');
    await gotoApp(page, '/onboarding');

    await expect(page.getByRole('heading', { name: /Altas con formulario basico y pipeline inicial/i })).toBeVisible();
  });

  test('admin route renders with an admin session', async ({ page }) => {
    await seedSession(page, 'admin');
    await gotoApp(page, '/admin');

    await expect(page.getByRole('heading', { name: /Dashboard operativo y configuracion base/i })).toBeVisible();
  });

  test('analytics route loads the React remote inside the shell', async ({ page }) => {
    await gotoApp(page, '/analytics');

    await expect(page.getByRole('heading', { name: /Analytics integrado en la ruta del shell/i })).toBeVisible();
    await expect(page.getByText(/React dashboard consumiendo la misma identidad visual/i)).toBeVisible();
  });
});
