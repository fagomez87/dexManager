# CHALLENGE QA


El contenido del documento se deberá basar en lo explicado en el siguiente video:
https://www.youtube.com/watch?v=isVJI7wxPP0&list=PL3yK-mI1dAp2boP2R_cc3xboks7Za8lPS&index=7 


El documento debe cumplir con los siguientes requisitos:
Debe incluir un Test Suit con al menos 8 casos de prueba basados en las funcionalidades mostradas en el video.
Test Suit: Debe tener una nomenclatura clara y descriptiva de la funcionalidad que abarca. También debe incluir una pequeña descripción.
Test Case: Debe tener una nomenclatura clara y descriptiva de la funcionalidad que abarca. Breve descripción, precondiciones, pasos de ejecución y resultado esperado.


No es obligatorio, pero se valorará:
Cualquier tipo de prueba adicional que no figure en las funcionalidades mostradas en el video y que surja de su propia interpretación del  proceso.

El documento debe realizarse en Google Docs o en una planilla de cálculo de Google Sheet.

En base a lo que se ve en el video, realizar propuestas sobre qué diferentes tipos de tests se podrían realizar en Dex Manager, los mismos pueden estar orientados a FrontEnd y/o Backend. Esto debe estar al final del documento en una sección aparte. No debe ser extenso, solo mencionar el tipo de test, para qué se usaría y qué utilidad brindaría su creación.
## Hacer solo si se tiene conocimiento en automatización:
 Automatizar el ingreso al sistema accediendo a la siguiente URL : https://demo4.dexmanager.com/ 
usuario : challengeqa
Password : Abcd1234
Se valorará la automatización de casos extras.
Como resultado de la automatización, se pide subir el código a un repositorio en github y compartirlo. 

Una vez terminado, te pido que por favor me compartas el documento.
Cualquier cosa me avisas.

---
## Contexto de la solución

El flujo de login está contenido dentro de múltiples Shadow DOM open, lo que impide el uso de selectores planos o encadenamientos clásicos de Cypress.

La dificultad principal no fue acceder al Shadow DOM en sí, sino mantener el código legible y mantenible sin esconder la complejidad con hacks o dependencias externas.

Decisión técnica

Opté por utilizar la API nativa de Cypress (.shadow()) para atravesar los distintos boundaries, evitando:

* Plugins que aplanen el DOM

* Accesos manuales al shadowRoot

* Workarounds que oculten el flujo real del árbol

El objetivo fue hacer explícito el recorrido, pero localizar esa complejidad dentro del Page Object.

### Encapsulación del punto de entrada

El método getLoginForm() define un entry point único al Shadow DOM del login:

Resuelve una sola vez el árbol dex-app → dex-login → form

* Evita repetir el selector base

* Centraliza el impacto ante cambios estructurales

Esto permite que el resto de las interacciones trabajen sobre un contexto ya resuelto, sin reabrir el Shadow DOM desde cero en cada paso.

Interacción con inputs encapsulados

Los inputs están compuestos por varios niveles (paper-input → paper-input-container → iron-input → input), cada uno con su propio Shadow DOM.

Las dificultades principales fueron:

* No todos los niveles exponen directamente el input

* Cypress no permite encadenar selectores a través del shadow boundary sin .shadow()

* El retry automático es menos confiable dentro del shadow tree

Por eso opté por:

* Resolver el componente externo (paper-input)

* Entrar explícitamente a su Shadow DOM

* Usar within() sobre iron-input para garantizar el scope correcto antes de tipear

Este enfoque reduce falsos positivos y mejora la estabilidad.

### Envío del formulario

El botón de login se encuentra en el mismo form, pero no requiere atravesar otro Shadow DOM adicional, por lo que se interactúa directamente una vez resuelto el contexto del formulario.

### Resultado

Login automatizado de forma consistente

Complejidad del Shadow DOM contenida en un único Page Object

Flujo de negocio legible desde el test

Solución alineada con buenas prácticas sin ocultar la realidad técnica

### Conclusión

La solución prioriza claridad y control por sobre shortcuts, lo que la hace más sostenible a largo plazo en un entorno con Web Components.