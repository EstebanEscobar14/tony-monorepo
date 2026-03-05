# Preguntas probables para la defensa tecnica

## Mensaje guia

Tu mejor estrategia no es responder como si todo estuviera perfecto, sino como alguien que sabe distinguir entre:

- demo valida
- arquitectura objetivo
- endurecimiento enterprise pendiente

Eso te da mucha credibilidad.

## Preguntas y respuestas sugeridas

### 1. Por que usaste Nx y no un proyecto React normal con Module Federation

Respuesta sugerida:

Use `Nx` porque el problema no era levantar una sola aplicacion React, sino gobernar una plataforma con varios dominios, equipos y frameworks. `Nx` me aporta grafo de dependencias, cache, ejecucion incremental, targets consistentes, workspace unificado y una forma ordenada de convivir Angular, React, librerias compartidas y documentacion. Un proyecto React aislado con Module Federation resuelve una parte tecnica del frontend, pero no resuelve el gobierno del workspace completo.

### 2. Por que elegiste microfrontends y no un monolito frontend

Respuesta sugerida:

Porque el problema principal del caso es el acoplamiento organizacional y de despliegue. Los microfrontends permiten ownership por dominio, despliegues mas independientes y menor radio de impacto. No los plantee como moda, sino como respuesta al cuello de botella del build y release unicos.

### 3. Por que Angular como shell

Respuesta sugerida:

Porque la base principal del ecosistema ya estaba en Angular y era la opcion mas pragmatica para una modernizacion incremental. El shell actua como composition root, routing root y punto de integracion. Asi reduzco riesgo y evito reescrituras innecesarias.

### 4. Por que React entra por Web Components y no por federacion directa

Respuesta sugerida:

Porque queria una frontera mas estable y menos acoplada a internals del framework. El custom element me da interoperabilidad real entre Angular y React, mantiene autonomia del equipo Analytics y evita forzar una migracion o introducir dependencias cruzadas mas fragiles.

### 5. Esto escala de verdad o solo funciona para demo

Respuesta sugerida:

Escala como arquitectura objetivo. La demo prueba que la direccion tecnica es viable. Lo que aun no esta completo es el endurecimiento enterprise total: configuracion por entorno, quality gates homogéneos, seguridad mas fuerte y observabilidad operativa. Justamente esa diferencia entre demo valida y plataforma final es parte del criterio de diseño.

### 6. Por que no hiciste una reescritura completa

Respuesta sugerida:

Porque en un contexto enterprise una reescritura total aumenta riesgo, frena delivery y retrasa retorno de inversion. Preferi una modernizacion incremental que permita seguir entregando producto mientras se reduce deuda tecnica y se crea una arquitectura sostenible.

### 7. Como justificas la coexistencia Angular y React a largo plazo

Respuesta sugerida:

La justifico con contratos de integracion estables, design system compartido y separacion clara entre framework y experiencia de usuario. La empresa no gana nada forzando una migracion si el equipo React ya entrega valor y puede convivir de forma gobernada.

### 8. Que ventajas reales te dio la libreria `@tony-ui/core`

Respuesta sugerida:

Reutilizacion, consistencia visual, menor duplicacion, mejor mantenibilidad y una base comun para el ecosistema Angular. Ademas me sirvio para demostrar que la modernizacion no es solo estructural, sino tambien de experiencia de usuario y gobierno de componentes.

### 9. Por que no hiciste todo como Web Components

Respuesta sugerida:

Porque no todo el sistema necesita el mismo nivel de desacoplamiento. Para Angular con Angular, usar Module Federation es mas natural y eficiente. Reserve Web Components para la frontera cross-framework, donde realmente aportan valor.

### 10. Como controlas que un microfrontend no rompa a los demas

Respuesta sugerida:

Con contratos de exposicion claros, aislamiento por remote, librerias compartidas gobernadas, CI centralizada y controles de build por proyecto. El objetivo es que el shell componga dominios, no que mezcle internals de cada equipo.

### 11. Como defenderias que esto es enterprise

Respuesta sugerida:

Lo defiendo por la direccion tecnica: ownership por dominio, shell de composicion, libreria compartida, pipeline reproducible, contenedorizacion, health checks y una estrategia clara de coexistencia tecnologica. Tambien soy transparente con lo pendiente, porque una solucion enterprise seria no se mide solo por lo que muestra, sino por el control que tiene sobre sus siguientes pasos.

### 12. Cual fue el criterio para separar dominios

Respuesta sugerida:

No los separe por componentes visuales sino por bounded contexts del negocio: auth, payments, treasury, compliance, onboarding, admin y analytics. Eso permite alinear arquitectura con equipos y con responsabilidades reales.

### 13. Por que no repos separados

Respuesta sugerida:

Porque para este caso pesaban mas la trazabilidad, el reuse, la consistencia de tooling y la visibilidad de dependencias. `Nx` en monorepo me permite independencia de dominios sin perder gobierno central.

### 14. Como manejarias versionado y breaking changes

Respuesta sugerida:

Con semver para librerias compartidas, contratos de exposicion bien definidos, changelog y reglas de compatibilidad. La idea no es compartir codigo sin control, sino compartir con gobierno.

### 15. Que haria falta para llevarlo a produccion enterprise real

Respuesta sugerida:

Externalizar configuracion por entorno, mover sesion a backend con cookies seguras, añadir SAST y dependency scanning, homogeneizar testing y lint para todos los proyectos, y endurecer CSP sin dependencias a `localhost` ni `unsafe-inline`.

### 16. Si te cuestionan que usas `localStorage` para sesion

Respuesta sugerida:

Responderia que es una simplificacion de demo para mostrar flujo de autenticacion y autorizacion por roles. No lo venderia como la solucion final. En produccion lo cambiaria por sesion respaldada por backend y cookies `HttpOnly`, `Secure` y `SameSite`.

### 17. Si te cuestionan que la URL de Analytics esta hardcodeada

Respuesta sugerida:

Diria que esta asi para simplificar la demo local y hacer visible la integracion. La siguiente iteracion natural es resolverlo con configuracion por entorno o discovery de remotes, precisamente porque en enterprise no deberia vivir hardcodeado.

### 18. Como justificas que el pipeline es serio

Respuesta sugerida:

Porque no solo existe en papel: ejecuta `lint`, pruebas reales en la libreria compartida y builds de todos los artefactos principales. Ademas pude validar que hoy pasa extremo a extremo. El siguiente paso es enriquecerlo con escaneo de seguridad y controles mas finos.

### 19. Que evidencia concreta tienes de calidad

Respuesta sugerida:

Puedo mostrar que el workspace pasa `ci:validate`, que `core` tiene `493` pruebas verdes, que los remotes Angular pasan lint y que el shell y los remotes construyen en modo produccion. Esa evidencia es mejor que una afirmacion abstracta.

### 20. Que trade-off aceptaste conscientemente

Respuesta sugerida:

Priorizo demostrar arquitectura, desacoplamiento y viabilidad de coexistencia por encima de cerrar todos los detalles de hardening productivo. Lo hice asi porque en una modernizacion incremental primero hay que probar la direccion correcta y luego endurecerla.

### 21. Despues de tus cambios, por que dices que los quality gates estan mas solidos

Respuesta sugerida:

Porque ya no dependo solo de `build` y `lint` en una parte del workspace. Ahora los proyectos principales pasan por una base comun de `lint`, `test` y `build`, incluyendo `mfe-analytics` y `docs`, que antes estaban menos gobernados. Eso hace que la calidad no quede concentrada solo en la libreria compartida.

### 22. Que significa exactamente configuracion por entorno en tu implementacion

Respuesta sugerida:

Significa que la URL del remote de Analytics ya no vive hardcodeada dentro del componente. La movi a archivos de entorno del shell, de forma que desarrollo y produccion pueden apuntar a orígenes distintos sin tocar la logica del componente. En local sigue funcionando con `localhost`, pero el diseño ya soporta staging o produccion.

### 23. Por que no dejaste la URL directamente en el componente si el examen corre en local

Respuesta sugerida:

Porque aunque el examen corra en local, una defensa fuerte no se queda en el “me funciona en mi maquina”. Quise dejar clara la separacion entre codigo y configuracion para demostrar criterio enterprise, sin complicar la ejecucion local.

### 24. Como justificas que tus tests no son solo de relleno

Respuesta sugerida:

No intente inflar numeros sin sentido. En cada proyecto deje al menos una prueba que valida comportamiento real del modulo: guards, flujos de formulario, creacion de datos, exposicion de rutas o registro del custom element. Son tests pequeños, pero si prueban responsabilidades reales.

### 25. Si te dicen que la cobertura no es 100 por ciento en lineas, que respondes

Respuesta sugerida:

No venderia una cobertura de lineas del 100% si no la he medido asi. Lo que si puedo defender es cobertura funcional minima en todos los proyectos principales y homogeneidad de quality gates. Para mi, en una entrega de este tipo era mas importante que todos los dominios entren al circuito de validacion que perseguir un numero artificial.

### 26. Por que seguiste usando Angular unit-test aun con el warning del builder webpack

Respuesta sugerida:

No lo deje asi al final. Mantengo el `build` real en webpack porque es el que necesita Module Federation, pero para pruebas cree un `test-build` soportado por `@angular/build:application`. Asi separo el runtime real de composicion del pipeline de test y elimino el warning de tooling sin romper la arquitectura.

### 27. Por que creaste un `test-build` aparte y no migraste toda la app a `application`

Respuesta sugerida:

Porque una migracion total cambiaba mas cosas de las necesarias para el objetivo del ejercicio. El problema estaba en la alineacion del runner de test, no en el build productivo. Separar `build` y `test-build` me deja el sistema estable, el warning resuelto y un cambio de bajo riesgo.

### 28. Como demostrarias que no solo sabes programar sino gobernar una plataforma

Respuesta sugerida:

Mostrando que no me quede en construir pantallas: defini boundaries por dominio, formalice una libreria compartida, homogeneice quality gates, prepare configuracion por entorno, automatice validaciones y deje trazabilidad clara entre decisiones tecnicas y necesidades de negocio.

### 29. Si te preguntan cual fue la mejora mas importante despues de la primera revision, que dirias

Respuesta sugerida:

Que pase de una arquitectura bien planteada pero desigual en controles, a una plataforma mas coherente en gobierno tecnico. La gran mejora fue cerrar la brecha entre el discurso enterprise y la validacion real del workspace.

### 30. Que dirias si te cuestionan que docs siga excediendo budget en build

Respuesta sugerida:

Diria que lo tomo como warning de optimizacion y no como fallo bloqueante del producto principal. El sitio de documentacion no tiene la misma criticidad que shell o los remotes de negocio, pero justamente el budget visible me ayuda a demostrar que hay control y que la mejora de performance esta medida.

### 31. Cual es hoy tu mayor gap tecnico abierto

Respuesta sugerida:

La autenticacion de demo con `localStorage` y el hardening de seguridad final. La arquitectura y los quality gates ya estan mucho mejor encaminados, pero si esto fuera a produccion regulada, la primera prioridad seria mover sesion y autorizacion a una estrategia respaldada por backend.

## Preguntas de seguimiento que tambien te pueden hacer

### Por que no SSR

Porque para esta fase el mayor beneficio venia de desacoplar dominios, lazy loading y reducir riesgo operativo. SSR puede evaluarse despues donde aporte valor real.

### Por que no single-spa

Porque aqui quise una solucion mas alineada con Angular/Nx y con menor complejidad adicional en la orquestacion.

### Por que no Turborepo

Porque `Nx` ofrece una integracion mas madura con Angular, Module Federation y gobierno de proyectos heterogeneos dentro del mismo workspace.

### Por que no un design system aparte en otro repo

Porque para esta fase interesaba maximizar velocidad, trazabilidad y adopcion desde el mismo workspace.

## Frases utiles para sonar senior en la defensa

- "No quise optimizar solo el codigo; quise optimizar la forma de evolucionarlo por equipos."
- "La decision tecnica se tomo por costo total de cambio, no por preferencia de framework."
- "Diferencie intencionalmente entre una vertical demostrable y el endurecimiento enterprise final."
- "Mi objetivo no era esconder trade-offs, sino hacerlos explicitos y gobernables."
- "La convivencia Angular/React aqui no es deuda, es una estrategia de transicion controlada."
