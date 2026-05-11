# Tony UI Nx Monorepo

Monorepo Nx para el caso CapitalFlow del examen Angular Expert. El proyecto demuestra una
modernizacion incremental con microfrontends, una libreria UI compartida, integracion React mediante
Web Components, CI/CD, contenedores y evidencias de rendimiento.

## Arquitectura

- `shell`: host Angular con routing, layout, guards y composition root.
- `apps/mfe-auth`: remote Angular para autenticacion y roles demo.
- `apps/mfe-payments`: remote Angular del dominio Payments.
- `apps/mfe-treasury`: remote Angular del dominio Treasury.
- `apps/mfe-compliance`: remote Angular protegido por rol.
- `apps/mfe-onboarding`: remote Angular protegido por rol.
- `apps/mfe-admin`: remote Angular protegido por rol admin.
- `apps/mfe-analytics`: remote React publicado como custom element `mfe-analytics-root`.
- `projects/core`: libreria `@tony-ui/core` con componentes Angular reutilizables.
- `library/utils`: datos demo, formateadores y helpers compartidos.
- `projects/docs`: documentacion viva de la libreria de componentes.

## Rutas

- `/auth` -> `mfeAuth`
- `/payments` -> `mfePayments`
- `/treasury` -> `mfeTreasury`
- `/analytics` -> React cargado en el shell como Web Component
- `/compliance` -> `mfeCompliance`, requiere rol `compliance` o `admin`
- `/onboarding` -> `mfeOnboarding`, requiere rol `operator` o `admin`
- `/admin` -> `mfeAdmin`, requiere rol `admin`

## Scripts

- `npm run dev:all`: levanta shell, remotes principales, analytics y docs.
- `npm run dev:shell`: levanta el shell con remotes Angular de desarrollo.
- `npm run dev:analytics`: sirve el custom element React en `http://localhost:4203`.
- `npm run dev:docs`: sirve la documentacion en `http://localhost:4301`.
- `npm run build`: build production de las aplicaciones principales.
- `npm run ci:validate`: lint + build production, igual que el workflow de CI.
- `npm test`: ejecuta los tests Nx disponibles; actualmente cubre `@tony-ui/core`.

## Puertos

- `shell`: `http://localhost:4200`
- `mfe-payments`: `http://localhost:4201`
- `mfe-treasury`: `http://localhost:4202`
- `mfe-analytics`: `http://localhost:4203`
- `mfe-auth`: `http://localhost:4204`
- `mfe-compliance`: `http://localhost:4205`
- `mfe-onboarding`: `http://localhost:4206`
- `mfe-admin`: `http://localhost:4207`
- `docs`: `http://localhost:4301`

## Integracion React

El equipo de Analytics mantiene React sin migracion forzada. El bundle
`http://localhost:4203/analytics-element.js` registra `mfe-analytics-root`, y el shell monta ese
custom element en la ruta `/analytics`. Esto evita acoplar el shell a internals de React y mantiene
una frontera compatible con Angular, React u otros frameworks.

Archivos clave:

- [analytics-element.tsx](/C:/Users/User/Desktop/angular-expert/tony-monorepo/apps/mfe-analytics/src/app/analytics-element.tsx)
- [analytics-host.component.ts](/C:/Users/User/Desktop/angular-expert/tony-monorepo/shell/src/app/analytics-host.component.ts)
- [analytics-host.component.html](/C:/Users/User/Desktop/angular-expert/tony-monorepo/shell/src/app/analytics-host.component.html)

## Libreria compartida

La libreria esta en [projects/core](/C:/Users/User/Desktop/angular-expert/tony-monorepo/projects/core)
y se consume como `@tony-ui/core`. Incluye componentes standalone, tests y empaquetado con
`ng-packagr`.

Comandos utiles:

```bash
npx nx build core
npx nx test core
```

## CI, Docker y operacion

El workflow de CI esta en [.github/workflows/ci.yml](/C:/Users/User/Desktop/angular-expert/tony-monorepo/.github/workflows/ci.yml)
y ejecuta `npm run ci:validate`.

El stack local de demo/staging se levanta con:

```bash
npm run docker:up
```

Los contenedores Nginx exponen `GET /healthz` y aplican headers basicos de seguridad.

## Entregables del examen

- [Propuesta tecnica para Board](/C:/Users/User/Desktop/angular-expert/tony-monorepo/deliverables/BOARD_TECHNICAL_PROPOSAL.md)
- [Runbook de entrega](/C:/Users/User/Desktop/angular-expert/tony-monorepo/deliverables/DELIVERY_RUNBOOK.md)
