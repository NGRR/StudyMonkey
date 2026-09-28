# StudyMonkey

Miniapp web de estudio guiado para química, enfocada en **mol, variables estequiométricas, masa molar, composición porcentual, fórmula empírica, nomenclatura binaria y estequiometría**.

## Objetivo

Convertir una sesión de repaso de 30 minutos en una secuencia de aprendizaje acumulativa, sin asumir que conceptos previos ya están memorizados.

Cada bloque vuelve a explicitar:

- qué significa cada símbolo o número;
- si el dato viene de la fórmula química, de la tabla periódica, de la constante de Avogadro o de un cálculo;
- una explicación en lenguaje simple;
- la formulación técnica correspondiente;
- una visualización práctica;
- un microejercicio autocorregible.

## V1

La ruta contiene 10 bloques de aproximadamente 3 minutos:

1. Leer fórmulas químicas
2. Masa atómica y lectura de la tabla periódica
3. Masa molar
4. Mol y constante de Avogadro
5. Conversión masa ↔ mol
6. Conversión mol ↔ partículas
7. Composición porcentual
8. Fórmula empírica
9. Nomenclatura binaria
10. Estequiometría

Incluye:

- navegación por slides;
- progreso persistente con `localStorage`;
- temporizador opcional de 30 minutos;
- navegación por teclado y gesto horizontal;
- tabla periódica simplificada para visualizar dónde se obtiene la masa atómica;
- recordatorios acumulativos;
- ejercicios de selección y respuesta numérica;
- retroalimentación explicada;
- diseño responsive para móvil y escritorio;
- cero dependencias externas.

## Estructura

```text
/
├── index.html
├── assets/
│   ├── css/
│   │   └── app.css
│   └── js/
│       └── app.js
├── .nojekyll
└── README.md
```

## GitHub Pages

La aplicación es estática. En GitHub:

`Settings → Pages → Deploy from a branch → main → /(root)`

La URL esperada, una vez habilitado Pages, es:

`https://ngrr.github.io/StudyMonkey/`

## Principio pedagógico

La interfaz evita presentar resultados como conocimiento supuesto. Ejemplo:

`H₂O → 2 H + 1 O → buscar H y O en tabla → H≈1, O≈16 → 2×1+16 → 18 g/mol`

La intención es que el estudiante pueda reconstruir el procedimiento incluso si olvidó el paso anterior.
