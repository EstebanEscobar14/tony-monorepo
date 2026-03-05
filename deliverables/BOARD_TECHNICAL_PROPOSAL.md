# Propuesta TÃ©cnica para CapitalFlow

## 1. Executive Summary

CapitalFlow tiene un riesgo tÃ©cnico real para la ronda Serie B por cuatro razones: arquitectura acoplada, rendimiento insuficiente, exposiciÃ³n grave en seguridad y un proceso de despliegue frÃ¡gil. La recomendaciÃ³n es ejecutar una modernizaciÃ³n incremental en 6 meses, sin detener el delivery, con un enfoque de `Nx + microfrontends + librerÃ­a de componentes + hardening de seguridad + CI/CD automatizado`.

La propuesta minimiza riesgo operativo porque no exige una reescritura total. En su lugar, crea una plataforma de coexistencia para Angular y React, permite despliegues por dominio, reduce el bundle inicial, encapsula la deuda tÃ©cnica mÃ¡s peligrosa y establece controles de seguridad y calidad que hoy no existen.

En 8 semanas el objetivo no es "terminar la transformaciÃ³n", sino demostrar a Board e inversores que:

1. Existe una arquitectura objetivo creÃ­ble.
2. Ya hay una primera vertical funcionando.
3. Seguridad, rendimiento y despliegue tienen un plan ejecutable con mÃ©tricas.
4. Los equipos pueden seguir entregando producto durante la transiciÃ³n.

## 2. DiagnÃ³stico de situaciÃ³n actual

### Problemas crÃ­ticos

1. Arquitectura monolÃ­tica de entrega.
   El build y deploy Ãºnicos bloquean a todos los equipos, elevan el tiempo de recuperaciÃ³n y convierten cualquier fix en riesgo sistÃ©mico.

2. Incompatibilidad tecnolÃ³gica entre dominios.
   Conviven mÃºltiples versiones de Angular y un equipo React sin una estrategia de integraciÃ³n estable.

3. Rendimiento insuficiente para clientes enterprise.
   El bundle inicial y el procesamiento en cliente ya estÃ¡n afectando renovaciones y SLA.

4. Brecha de seguridad grave.
   El informe de auditorÃ­a describe fallos incompatibles con una fintech regulada: XSS almacenado y reflejado, uso inseguro de `iframe`, carga de archivos sin sanitizaciÃ³n, ausencia de CSP y flags inseguros en cookies.

5. Deuda tÃ©cnica estructural.
   Servicios monolÃ­ticos, componentes gigantes, duplicaciÃ³n funcional y baja cobertura hacen que cada cambio sea caro y arriesgado.

6. OperaciÃ³n manual.
   Sin staging fiable, sin health checks, sin tests en pipeline y con rollback manual, la continuidad de servicio no es defendible ante inversores.

### PriorizaciÃ³n

Prioridad 1:

- RemediaciÃ³n de seguridad crÃ­tica.
- SeparaciÃ³n de despliegues por dominio.
- MÃ©tricas de rendimiento y quick wins.

Prioridad 2:

- LibrerÃ­a compartida.
- Refactoring de los mÃ³dulos mÃ¡s costosos.
- Pipeline CI/CD con controles automÃ¡ticos.

Prioridad 3:

- EstandarizaciÃ³n de patterns de equipo.
- Mejora progresiva de cobertura.
- OptimizaciÃ³n avanzada y observabilidad de negocio.

## 3. Arquitectura objetivo

### Principios

- Un monorepo Nx como plataforma de coordinaciÃ³n, no como monolito de despliegue.
- Microfrontends por dominio de negocio.
- Shell Angular como composiciÃ³n principal.
- Remotes Angular para dominios Angular.
- IntegraciÃ³n del dominio React mediante Web Components para no forzar migraciÃ³n.
- LibrerÃ­as compartidas desacopladas del dominio.
- Contratos claros entre equipos.

### Propuesta

- `shell`: navegaciÃ³n, autenticaciÃ³n transversal, layout, observabilidad y composition root.
- `mfe-payments`: ownership del equipo Payments, despliegue independiente.
- `mfe-treasury`: ownership del equipo Treasury, despliegue independiente.
- `mfe-analytics`: equipo React, integrado como custom element para preservar autonomÃ­a.
- `libs/core`: librerÃ­a `@tony-ui/core` con sistema de diseÃ±o y componentes Angular compartidos.
- `libs/utils`: tipos, formateadores, helpers y contratos comunes.

### Diagrama de composiciÃ³n

```mermaid
flowchart LR
  User["Usuario CapitalFlow"] --> Shell["Angular shell"]
  Shell --> Auth["mfe-auth"]
  Shell --> Payments["mfe-payments"]
  Shell --> Treasury["mfe-treasury"]
  Shell --> Compliance["mfe-compliance"]
  Shell --> Onboarding["mfe-onboarding"]
  Shell --> Admin["mfe-admin"]
  Shell --> AnalyticsElement["mfe-analytics-root"]
  AnalyticsElement --> Analytics["React analytics"]
  Shell --> Core["@tony-ui/core"]
  Payments --> Core
  Treasury --> Core
  Compliance --> Core
  Onboarding --> Core
  Admin --> Core
  Shell --> Utils["@tony-ui/utils"]
```

### Evidencia prÃ¡ctica incluida

El repositorio entrega una vertical ejecutable que demuestra la arquitectura objetivo:

- Shell Angular con lazy loading por rutas federadas.
- Seis remotes Angular desacoplados por dominio.
- Analytics en React cargado por el shell como Web Component, sin obligar al equipo a migrar.
- LibrerÃ­a `@tony-ui/core` con componentes reutilizables, documentaciÃ³n y tests automatizados.
- Docker Compose, Nginx con health checks y workflow de CI reproducible.

### Coexistencia de Angular y React

La convivencia se resuelve en tres capas:

1. Design tokens compartidos.
   Variables CSS, escala tipogrÃ¡fica, spacing y semÃ¡ntica visual comunes.

2. Fronteras de integraciÃ³n cross-framework.
   Angular standalone para equipos Angular y custom elements para dominios no Angular.

3. Contrato de integraciÃ³n estable.
   El shell consume el dominio React como custom element, no como dependencia directa de React internals.

### Alternativas descartadas

- Reescritura total a una Ãºnica versiÃ³n de Angular.
  Descartada por coste, riesgo y calendario.

- Federar React directamente dentro de Angular sin capa de diseÃ±o compartida.
  Descartada porque resuelve integraciÃ³n tÃ©cnica, pero no consistencia visual ni independencia real.

- Mantener repositorios separados.
  Descartada porque complica gobierno, visibilidad de dependencias y reutilizaciÃ³n.

## 4. Plan de optimizaciÃ³n de rendimiento

### Medidas inmediatas

- Lazy loading completo de dominios.
- DivisiÃ³n por remotes para sacar cÃ³digo del bundle inicial.
- Imports dinÃ¡micos para secciones pesadas.
- PaginaciÃ³n o virtualizaciÃ³n en grids de gran volumen.
- Offloading de exportaciones pesadas a backend o Web Worker.
- Presupuestos de bundle por app.

### Medidas de segunda fase

- SSR/edge rendering solo donde haya beneficio real.
- Caching agresivo de assets versionados.
- TelemetrÃ­a de Web Vitals por cliente y paÃ­s.
- OptimizaciÃ³n de imÃ¡genes, fuentes y polyfills.

### Targets

- Bundle inicial del shell: de 2.8 MB a < 800 KB comprimido.
- FCP en 4G: de 9.2 s a < 3.5 s.
- TTI: de 14 s a < 5 s.
- Tabla masiva: de congelaciÃ³n total a interacciÃ³n fluida con paginaciÃ³n/virtualizaciÃ³n.

### Navegadores legacy

IE11 no debe condicionar la arquitectura principal. RecomendaciÃ³n:

- Definir fecha de sunset negociada con clientes legacy.
- Mantener compatibilidad mÃ­nima mediante fallback temporal o portal legacy aislado.
- No bloquear la modernizaciÃ³n principal por un 6% de usuarios.

## 5. Estrategia de seguridad

### RemediaciÃ³n inmediata

- Eliminar renderizado inseguro de HTML y comentarios.
- Sustituir `bypassSecurityTrust...` por validaciÃ³n estricta y sanitizaciÃ³n controlada.
- Validar y normalizar filenames y metadatos de subida.
- Escapar siempre tÃ©rminos de bÃºsqueda reflejados en UI.
- Encapsular el editor WYSIWYG con allowlist de tags/atributos.
- Configurar CSP estricta por entorno.
- Forzar `HttpOnly`, `Secure` y `SameSite` en cookies.

### Controles permanentes

- ESLint rules de seguridad.
- SAST en pipeline.
- Dependency scanning.
- Checklist de secure coding en PR.
- FormaciÃ³n trimestral de Angular Security y OWASP.

### WYSIWYG

No se elimina. Se mantiene con:

- SanitizaciÃ³n server-side.
- Allowlist de HTML.
- Vista previa segura.
- PolÃ­tica clara de contenido permitido.

## 6. Roadmap de refactoring incremental

### Orden recomendado

1. Extraer librerÃ­as compartidas.
2. Aislar servicios "dios" en facades y servicios de dominio.
3. Adoptar standalone components y boundaries de Nx.
4. Introducir pattern de estado por feature.
5. Reducir componentes >800 lÃ­neas en slices presentational/container.

### Patrones

- Facade pattern.
- Adapter pattern para integraciones legacy.
- Ports and adapters para infra sensible.
- Presentational/container split.
- Feature libraries por dominio.

### MÃ©tricas

- Tiempo medio de build.
- Tiempo medio de PR.
- Cobertura en dominios criticos.
- Numero de duplicaciones eliminadas.
- Numero de componentes y servicios por encima de umbrales definidos.

## 7. Libreria de componentes compartidos

### Objetivo

Eliminar duplicacion, dar consistencia visual y permitir que Angular y React compartan experiencia de usuario sin compartir framework.

### DiseÃ±o de la soluciÃ³n

- Tokens visuales en CSS variables.
- Componentes Angular standalone para ecosistema Angular.
- Web Components para integraciones cross-framework.
- Versionado semÃ¡ntico.
- Catalogo vivo de componentes y contratos de compatibilidad.

### Gobierno

- Core team de plataforma como owner.
- RFC ligero para breaking changes.
- Changelog y codemods para cambios mayores.

## 8. ModernizaciÃ³n del despliegue

### Estado objetivo

- CI con tests, lint, build y security gates.
- CD por dominio.
- Entorno staging realista.
- Deploy blue/green o rolling con zero-downtime.
- Health checks, smoke tests y rollback automatizado.

### Pipeline propuesto

1. PR validation:
   lint, tests, build affected, SAST, dependency scan.
2. Merge to main:
   build versionado, artefactos firmados.
3. Deploy a staging:
   smoke tests y validaciÃ³n funcional.
4. Deploy a producciÃ³n:
   progresivo, con mÃ©tricas y rollback automÃ¡tico.

### Infraestructura

- Docker por aplicaciÃ³n.
- OrquestaciÃ³n gestionada en nube.
- CDN para assets estÃ¡ticos.
- Secret management centralizado.

## 9. Plan de ejecuciÃ³n a 6 meses

### Fase 0. Semanas 1-2

- Crear equipo de plataforma.
- Acordar arquitectura objetivo.
- Establecer mÃ©tricas baseline.
- Corregir vulnerabilidades crÃ­ticas mÃ¡s expuestas.

### Fase 1. Semanas 3-8

- Crear monorepo Nx.
- Implementar shell y primeros remotes.
- Crear `libs/core` y `libs/utils`.
- Integrar React mediante Web Components.
- Activar CI mÃ­nima y staging fiable.

### Fase 2. Semanas 9-16

- Migrar dominios prioritarios.
- Refactoring de servicios crÃ­ticos.
- Introducir observabilidad y budgets.
- Endurecer CSP, cookies y validaciones.

### Fase 3. Semanas 17-24

- Escalar la librerÃ­a compartida.
- Completar despliegues independientes.
- Mejorar cobertura y runbooks.
- Preparar cierre de hallazgos de auditorÃ­a.

## 10. AnÃ¡lisis de riesgos

Riesgo:
Resistencia de equipos.
MitigaciÃ³n:
Arquitectura de coexistencia, no migraciÃ³n forzada.

Riesgo:
Sobrecarga del equipo plataforma.
MitigaciÃ³n:
Priorizar dominios crÃ­ticos y usar templates repetibles.

Riesgo:
Cambios de seguridad rompen UX.
MitigaciÃ³n:
Feature flags, allowlists y validaciÃ³n con negocio.

Riesgo:
La due diligence llegue antes de materializar suficientes resultados.
MitigaciÃ³n:
Entregar en 8 semanas una vertical demostrable, roadmap cuantificado y KPIs de avance.

## 11. MÃ©tricas de Ã©xito

### KPIs tÃ©cnicos

- Tiempo de build total.
- Tiempo de deploy.
- Tasa de fallos de deploy.
- FCP y TTI por mercado.
- Cobertura de tests en dominios crÃ­ticos.
- NÃºmero de vulnerabilidades crÃ­ticas abiertas.
- TamaÃ±o del bundle inicial del shell.

### KPIs de negocio

- RenovaciÃ³n de clientes con incidencias de performance.
- Incidentes SLA por trimestre.
- Tiempo medio de entrega por feature.
- NÃºmero de releases independientes por equipo.

### Targets por fase

En 8 semanas:

- arquitectura demostrable
- primer dominio desacoplado
- CI funcional
- quick wins de seguridad y rendimiento visibles

En 6 meses:

- despliegue por dominio
- zero-downtime operativo
- auditorÃ­a de seguridad bajo control
- mejora material de NPS tÃ©cnico de clientes enterprise

## Respuesta a la pregunta del inversor

Si Analytics quiere seguir en React de forma indefinida, la experiencia unificada se consigue sin forzar migraciÃ³n mediante:

1. Sistema de diseÃ±o compartido y gobernado.
2. Web Components para encapsular UI reutilizable entre frameworks.
3. Tokens visuales y guidelines Ãºnicos.
4. Contratos de integraciÃ³n estables.
5. Observabilidad comÃºn para medir que la UX realmente es consistente.

Eso permite autonomÃ­a tecnolÃ³gica por equipo sin fragmentar la experiencia del usuario final.
