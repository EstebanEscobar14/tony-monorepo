# Delivery Runbook

## Objetivo

Dejar evidencia operativa de que la plataforma puede validarse y levantarse con un proceso repetible, automatizado y auditable.

## Validación continua

El workflow de CI está definido en [.github/workflows/ci.yml](C:/Users/User/Desktop/angular-expert/tony-monorepo/.github/workflows/ci.yml) y ejecuta:

- instalación determinista con `npm ci`
- validación del workspace con `npm run ci:validate`
- `lint` de los microfrontends Angular principales
- tests de `@tony-ui/core`
- `build` de `core`, `shell`, todos los microfrontends Angular, `mfe-analytics` y `docs`

## Tests automatizados

La librería compartida `@tony-ui/core` está registrada como proyecto Nx y expone un target de test:

```bash
npx nx test core
```

La validación actual ejecuta 61 archivos de especificación y 493 tests de componentes/directivas de
la librería.

## Comando único de validación

```bash
npm run ci:validate
```

## Contenedores de demo / staging local

El stack puede levantarse con:

```bash
npm run docker:up
```

Servicios publicados:

- `shell`: [http://localhost:4200](http://localhost:4200)
- `mfe-payments`: [http://localhost:4201](http://localhost:4201)
- `mfe-treasury`: [http://localhost:4202](http://localhost:4202)
- `mfe-analytics`: [http://localhost:4203](http://localhost:4203)
- `mfe-auth`: [http://localhost:4204](http://localhost:4204)
- `mfe-compliance`: [http://localhost:4205](http://localhost:4205)
- `mfe-onboarding`: [http://localhost:4206](http://localhost:4206)
- `mfe-admin`: [http://localhost:4207](http://localhost:4207)
- `docs`: [http://localhost:4301](http://localhost:4301)

Todos los contenedores Nginx exponen `GET /healthz`.

## Evidencias para defensa

- despliegue desacoplado por dominio
- budgets de build configurados en producción
- pipeline reproducible de CI
- suite de tests ejecutable para la librería compartida
- empaquetado contenedorizado para entorno de demo/staging
- documentación operativa mínima para continuidad del servicio
