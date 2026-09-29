(() => {
  "use strict";

  const AVOGADRO = 6.022e23;
  const STORAGE_KEY = "studymonkey:chem:v1";
  const TOTAL_MINUTES = 30;

  const elements = {
    H:  { z: 1,  name: "Hidrógeno", mass: "1,008", approx: 1 },
    C:  { z: 6,  name: "Carbono",   mass: "12,011", approx: 12 },
    N:  { z: 7,  name: "Nitrógeno", mass: "14,007", approx: 14 },
    O:  { z: 8,  name: "Oxígeno",   mass: "15,999", approx: 16 },
    Na: { z: 11, name: "Sodio",     mass: "22,990", approx: 23 },
    S:  { z: 16, name: "Azufre",    mass: "32,06",  approx: 32 },
    Cl: { z: 17, name: "Cloro",     mass: "35,45",  approx: 35.45 },
    Ca: { z: 20, name: "Calcio",    mass: "40,078", approx: 40 },
    Fe: { z: 26, name: "Hierro",    mass: "55,845", approx: 55.85 }
  };

  function tile(symbol) {
    const e = elements[symbol];
    return "<div class='element-tile'>" +
      "<div class='element-z'>" + e.z + "</div>" +
      "<div class='element-symbol'>" + symbol + "</div>" +
      "<div class='element-meta'>" + e.name + "<br>masa atómica: <span class='element-mass'>" + e.mass + "</span></div>" +
    "</div>";
  }

  function recall(text) {
    return "<div class='recall'><span class='recall-badge'>Recuerda</span><p>" + text + "</p></div>";
  }

  function visual(title, content) {
    return "<div class='visual'><div class='visual-title'>" + title + "</div>" + content + "</div>";
  }

  function easyTechnical(easy, technical) {
    return "<div class='section-grid'>" +
      "<section class='card easy'><h2>En simple</h2>" + easy + "</section>" +
      "<section class='card technical'><h2>En lenguaje químico</h2>" + technical + "</section>" +
    "</div>";
  }

  const slides = [
    {
      title: "Leer fórmulas",
      eyebrow: "01 · Punto de partida",
      lead: "Antes de calcular, hay que poder mirar una fórmula y saber qué está diciendo. Aquí no se presupone tabla periódica ni masas.",
      body: () =>
        recall("Un elemento es un tipo de átomo. Cada elemento tiene un símbolo: H es hidrógeno, O es oxígeno, C es carbono. El símbolo se consulta en la tabla periódica.") +
        easyTechnical(
          "<p>En <strong>H<sub>2</sub>O</strong>, el número pequeño 2 pertenece a H: hay 2 átomos de hidrógeno. Como O no tiene número escrito, hay 1 átomo de oxígeno.</p><p>Ese número pequeño se llama <strong>subíndice</strong>.</p>",
          "<p>Una fórmula química representa la composición de una sustancia. Los subíndices indican la proporción de átomos de cada elemento. Cuando el subíndice es 1, se omite.</p>"
        ) +
        visual("Mira de dónde sale cada cantidad",
          "<div class='formula-box'>H<sub>2</sub>SO<sub>4</sub></div>" +
          "<div class='origin-grid'>" +
            "<div class='origin'><small>H<sub>2</sub></small><strong>2 átomos de H</strong></div>" +
            "<div class='origin'><small>S sin subíndice</small><strong>1 átomo de S</strong></div>" +
            "<div class='origin'><small>O<sub>4</sub></small><strong>4 átomos de O</strong></div>" +
          "</div>"
        ) +
        "<details class='note-box'><summary>Apunte: coeficiente no es lo mismo que subíndice</summary><div>En 2 H<sub>2</sub>O, el 2 grande de delante multiplica toda la fórmula. El 2 pequeño sólo pertenece al H. Esta diferencia será importante al balancear reacciones.</div></details>",
      exercise: {
        type: "number",
        prompt: "En H₂SO₄, ¿cuántos átomos de oxígeno indica la fórmula?",
        answer: 4,
        tolerance: 0,
        unit: "átomos",
        explanation: "El subíndice 4 está unido a O. Por eso una unidad de H₂SO₄ contiene 4 átomos de oxígeno."
      }
    },
    {
      title: "Masa atómica",
      eyebrow: "02 · Leer la tabla",
      lead: "Los valores como H ≈ 1 u u O ≈ 16 u no se adivinan ni tienen que aparecer memorizados: se leen en la tabla periódica.",
      body: () =>
        recall("Ya sabes leer subíndices. Ahora añadimos otra fuente de información: la tabla periódica. La masa atómica aparece dentro de la casilla de cada elemento.") +
        visual("Así se lee una casilla de la tabla periódica",
          "<div class='periodic-row'>" + tile("H") + tile("C") + tile("O") + "</div>" +
          "<p class='note' style='color:#b9bdc7;margin-top:14px'>Para ejercicios escolares suelen usarse aproximaciones: H ≈ 1, C ≈ 12, O ≈ 16. Si el ejercicio entrega otros valores, se usan los valores indicados.</p>"
        ) +
        easyTechnical(
          "<p>Busca el símbolo. Dentro de su casilla verás un número decimal de masa. Por ejemplo, O tiene 15,999; en muchos ejercicios se redondea a 16.</p><p>No confundas este valor con el <strong>número atómico</strong>, que para O es 8.</p>",
          "<p>La <strong>masa atómica relativa</strong> expresa la masa promedio de los átomos de un elemento considerando su composición isotópica. En este nivel la usamos como dato para obtener masas molares.</p>"
        ) +
        "<div class='mathline'>O → tabla periódica → masa atómica 15,999 → aproximación escolar ≈ 16</div>",
      exercise: {
        type: "choice",
        prompt: "En la casilla del oxígeno mostrada arriba, ¿qué valor usamos aproximadamente como masa atómica?",
        options: ["8", "16", "32", "6,022 × 10²³"],
        answer: 1,
        explanation: "8 es el número atómico. La masa atómica indicada es 15,999, que suele aproximarse a 16 para estos cálculos."
      }
    },
    {
      title: "Masa molar",
      eyebrow: "03 · De la fórmula a gramos por mol",
      lead: "Ahora combinamos sólo dos cosas ya vistas: contar átomos en la fórmula y buscar la masa de cada elemento en la tabla.",
      body: () =>
        recall("Para H₂O: el subíndice dice 2 H y 1 O. En la tabla encontramos aproximadamente H ≈ 1 y O ≈ 16. No hace falta tener esos valores memorizados.") +
        visual("Construcción completa de M(H₂O)",
          "<div class='flow'>" +
            "<span class='flow-node'>H<sub>2</sub>O</span><span class='flow-arrow'>→</span>" +
            "<span class='flow-node'>2 H + 1 O</span><span class='flow-arrow'>→</span>" +
            "<span class='flow-node'>H ≈ 1; O ≈ 16</span><span class='flow-arrow'>→</span>" +
            "<span class='flow-node'>2×1 + 1×16</span><span class='flow-arrow'>→</span>" +
            "<span class='flow-node'>18 g/mol</span>" +
          "</div>"
        ) +
        easyTechnical(
          "<p>La masa molar responde: <strong>¿qué masa tiene 1 mol de esta sustancia?</strong> Para obtenerla, sumamos el aporte de cada átomo de la fórmula.</p>",
          "<p>La masa molar, M, se expresa en g/mol. Se calcula sumando las masas atómicas de todos los elementos, multiplicadas por sus respectivos subíndices.</p>"
        ) +
        "<div class='section-grid'><div class='card'><h3>Ejemplo CO₂</h3><p>C: 1 × 12 = 12<br>O: 2 × 16 = 32<br><strong>Total = 44 g/mol</strong></p></div><div class='card'><h3>¿De dónde salen 12 y 16?</h3><p>De las masas atómicas aproximadas de C y O consultadas en la tabla periódica.</p></div></div>",
      exercise: {
        type: "number",
        prompt: "Usando H ≈ 1 y O ≈ 16, ¿cuál es la masa molar aproximada de H₂O?",
        answer: 18,
        tolerance: 0.05,
        unit: "g/mol",
        explanation: "La fórmula tiene 2 H y 1 O: 2×1 + 1×16 = 18 g/mol."
      }
    },
    {
      title: "El mol y Avogadro",
      eyebrow: "04 · Contar partículas",
      lead: "Un mol no es una masa. Es una cantidad, como una docena, pero diseñada para contar átomos, moléculas e iones.",
      body: () =>
        recall("La masa molar nos dijo cuánto pesa 1 mol, pero todavía necesitamos fijar qué significa esa palabra: un mol es un número fijo de entidades.") +
        visual("Docena y mol cumplen la misma función conceptual",
          "<div class='flow'>" +
            "<span class='flow-node'>1 docena</span><span class='flow-arrow'>=</span><span class='flow-node'>12 objetos</span>" +
          "</div><div class='flow' style='margin-top:12px'>" +
            "<span class='flow-node'>1 mol</span><span class='flow-arrow'>=</span><span class='flow-node'>6,022 × 10<sup>23</sup> partículas</span>" +
          "</div>"
        ) +
        easyTechnical(
          "<p>Si dices 1 mol de agua, estás diciendo un grupo con 6,022 × 10²³ moléculas de H₂O. Si dices 1 mol de carbono, son 6,022 × 10²³ átomos de C.</p>",
          "<p>La constante de Avogadro, N<sub>A</sub>, vale aproximadamente 6,022 × 10²³ mol⁻¹. Vincula la cantidad de sustancia en mol con el número de entidades elementales.</p>"
        ) +
        "<div class='card'><h3>Conexión con lo anterior</h3><p>1 mol de H₂O contiene 6,022 × 10²³ moléculas <strong>y</strong>, como calculamos M(H₂O) ≈ 18 g/mol, ese mol tiene una masa aproximada de 18 g.</p></div>",
      exercise: {
        type: "choice",
        prompt: "¿Qué representa 6,022 × 10²³?",
        options: ["La masa del oxígeno", "La cantidad de partículas en 1 mol", "El número atómico del carbono", "La masa de 1 molécula de agua en gramos"],
        answer: 1,
        explanation: "Es la constante de Avogadro: aproximadamente 6,022 × 10²³ entidades por cada mol."
      }
    },
    {
      title: "Masa ↔ mol",
      eyebrow: "05 · La conversión central",
      lead: "Cuando un problema entrega gramos y pregunta por mol —o al revés— usamos la masa molar como puente.",
      body: () =>
        recall("Masa molar significa gramos correspondientes a 1 mol. Para H₂O obtuvimos 18 g/mol buscando H y O en la tabla y sumando 2×1 + 16.") +
        visual("El puente",
          "<div class='flow'>" +
            "<span class='flow-node'>gramos</span><span class='flow-arrow'>÷ masa molar →</span>" +
            "<span class='flow-node'>mol</span><span class='flow-arrow'>× masa molar →</span>" +
            "<span class='flow-node'>gramos</span>" +
          "</div>"
        ) +
        easyTechnical(
          "<p>Si cada mol de CO₂ pesa 44 g, entonces 88 g contienen exactamente dos grupos de 44 g: <strong>2 mol</strong>.</p>",
          "<p>Para masa → mol: n = m/M. Para mol → masa: m = n·M. Aquí n es cantidad de sustancia, m es masa y M es masa molar.</p>"
        ) +
        "<div class='mathline'>CO₂ → C≈12 y O≈16 → M = 12 + 2×16 = 44 g/mol<br>88 g ÷ 44 g/mol = 2 mol</div>",
      exercise: {
        type: "number",
        prompt: "CO₂ tiene M ≈ 44 g/mol. ¿Cuántos mol hay en 88 g de CO₂?",
        answer: 2,
        tolerance: 0.01,
        unit: "mol",
        explanation: "Para pasar de gramos a mol divides por la masa molar: 88 ÷ 44 = 2 mol."
      }
    },
    {
      title: "Mol ↔ partículas",
      eyebrow: "06 · Volver a Avogadro",
      lead: "Aquí reutilizamos el número de Avogadro. No aparece como un dato nuevo: sigue significando cuántas partículas contiene 1 mol.",
      body: () =>
        recall("1 mol = 6,022 × 10²³ partículas. Esa cifra se llama constante de Avogadro. Para mol → partículas multiplicamos; para partículas → mol dividimos.") +
        visual("Dos caminos que pasan por mol",
          "<div class='flow'>" +
            "<span class='flow-node'>masa</span><span class='flow-arrow'>↔</span><span class='flow-node'>mol</span><span class='flow-arrow'>↔</span><span class='flow-node'>partículas</span>" +
          "</div>" +
          "<div class='origin-grid' style='margin-top:12px'>" +
            "<div class='origin'><small>masa → mol</small><strong>÷ masa molar</strong></div>" +
            "<div class='origin'><small>mol → partículas</small><strong>× 6,022×10²³</strong></div>" +
            "<div class='origin'><small>partículas → mol</small><strong>÷ 6,022×10²³</strong></div>" +
          "</div>"
        ) +
        easyTechnical(
          "<p>2 mol contienen dos grupos de Avogadro: 2 × 6,022 × 10²³ = 1,2044 × 10²⁴ partículas.</p>",
          "<p>La relación es N = n·N<sub>A</sub>. Para despejar cantidad de sustancia: n = N/N<sub>A</sub>.</p>"
        ) +
        "<details class='note-box'><summary>¿Átomos o moléculas?</summary><div>Depende de lo que estés contando. 1 mol de O contiene átomos de O; 1 mol de O₂ contiene moléculas de O₂. El valor de Avogadro es el mismo.</div></details>",
      exercise: {
        type: "number",
        prompt: "1,2044 × 10²⁴ moléculas de H₂O corresponden aproximadamente a ¿cuántos mol?",
        answer: 2,
        tolerance: 0.02,
        unit: "mol",
        explanation: "Dividimos por Avogadro: 1,2044×10²⁴ ÷ 6,022×10²³ ≈ 2 mol."
      }
    },
    {
      title: "Composición %",
      eyebrow: "07 · Qué fracción aporta cada elemento",
      lead: "La composición porcentual mezcla una idea química —masa molar— con una idea matemática conocida: parte ÷ total × 100.",
      body: () =>
        recall("Para H₂O ya sabemos reconstruir M: fórmula → 2 H + 1 O → tabla: H≈1, O≈16 → masa molar total ≈18 g/mol.") +
        visual("Separar la masa total en aportes",
          "<div class='origin-grid'>" +
            "<div class='origin'><small>H en H₂O</small><strong>2×1 = 2</strong></div>" +
            "<div class='origin'><small>O en H₂O</small><strong>1×16 = 16</strong></div>" +
            "<div class='origin'><small>Total</small><strong>2 + 16 = 18</strong></div>" +
          "</div>"
        ) +
        easyTechnical(
          "<p>Preguntar el porcentaje de H es preguntar: de las 18 partes de masa, ¿qué fracción corresponde a las 2 aportadas por H?</p>",
          "<p>% elemento = (masa aportada por el elemento / masa molar del compuesto) × 100.</p>"
        ) +
        "<div class='mathline'>% H = (2 / 18) × 100 ≈ 11,1 %<br>% O = (16 / 18) × 100 ≈ 88,9 %<br>Total ≈ 100 %</div>",
      exercise: {
        type: "number",
        prompt: "En H₂O, el H aporta 2 de una masa molar total de 18. ¿Qué porcentaje representa aproximadamente?",
        answer: 11.1,
        tolerance: 0.15,
        unit: "%",
        explanation: "(2 ÷ 18) × 100 ≈ 11,1 %. La suma con el porcentaje de O debe quedar cerca de 100 %."
      }
    },
    {
      title: "Fórmula empírica",
      eyebrow: "08 · Encontrar la proporción mínima",
      lead: "La fórmula empírica no intenta dibujar la molécula completa: sólo conserva la relación entera más sencilla entre sus elementos.",
      body: () =>
        recall("Los subíndices de una fórmula indican proporciones. En C₆H₁₂O₆ tenemos la relación 6 : 12 : 6.") +
        visual("Reducir una proporción",
          "<div class='flow'>" +
            "<span class='flow-node'>C₆H₁₂O₆</span><span class='flow-arrow'>→ dividir todo por 6 →</span><span class='flow-node'>C₁H₂O₁</span><span class='flow-arrow'>→</span><span class='flow-node'>CH₂O</span>" +
          "</div>"
        ) +
        easyTechnical(
          "<p>Es como reducir 6:12:6 a 1:2:1. La relación se conserva, sólo queda en su forma más simple.</p>",
          "<p>La fórmula empírica expresa la razón entera mínima de átomos. Cuando se parte de porcentajes, se asumen 100 g, se convierten gramos a mol y luego se divide cada cantidad de mol por la menor.</p>"
        ) +
        "<div class='card'><h3>Ruta cuando entregan porcentajes</h3><p><strong>% → imaginar 100 g → gramos → dividir por masa molar de cada elemento → mol → dividir todos por el menor → subíndices.</strong></p><p class='note'>Las masas atómicas necesarias se vuelven a consultar en la tabla periódica.</p></div>",
      exercise: {
        type: "choice",
        prompt: "¿Cuál es la fórmula empírica de C₆H₁₂O₆?",
        options: ["C₆H₁₂O₆", "CH₂O", "C₂H₄O₂", "CHO"],
        answer: 1,
        explanation: "Los subíndices 6:12:6 tienen como divisor común 6. Al dividirlos queda 1:2:1 → CH₂O."
      }
    },
    {
      title: "Nomenclatura binaria",
      eyebrow: "09 · Aprender a decidir el nombre",
      lead: "No basta con memorizar «CO₂ = dióxido de carbono». La meta es poder mirar una fórmula nueva, reconocer qué información contiene y decidir paso a paso cómo nombrarla.",
      body: () =>
        recall("Primero lee la fórmula como en la sección 1. Los subíndices siguen significando cantidad de átomos. «Binario» sólo indica que aparecen dos elementos diferentes. CO₂ tiene C y O: dos elementos, aunque haya tres átomos en total.") +
        visual("Paso 1 · Antes de nombrar, identifica qué estás mirando",
          "<div class='decision-map'>" +
            "<div class='decision-step'><span>1</span><div><small>Cuenta tipos de elementos</small><strong>CO₂ → C + O → es binario</strong></div></div>" +
            "<div class='decision-step'><span>2</span><div><small>Lee los subíndices</small><strong>C = 1 · O = 2</strong></div></div>" +
            "<div class='decision-step'><span>3</span><div><small>Reconoce la familia</small><strong>Hay oxígeno → puede nombrarse como óxido</strong></div></div>" +
            "<div class='decision-step'><span>4</span><div><small>Elige el sistema pedido</small><strong>Prefijos o nomenclatura Stock</strong></div></div>" +
          "</div>"
        ) +
        easyTechnical(
          "<p>Para empezar por lo más simple, usa los <strong>prefijos como contadores</strong>. El nombre traduce los subíndices: mono = 1, di = 2, tri = 3, tetra = 4, penta = 5.</p><p>CO₂ tiene 2 oxígenos. Por eso aparece <strong>di</strong> + óxido: <strong>dióxido de carbono</strong>.</p>",
          "<p>La nomenclatura sistemática usa prefijos multiplicativos para expresar la estequiometría del compuesto. La nomenclatura Stock, en cambio, puede indicar con números romanos el <strong>estado de oxidación</strong> de un elemento cuando éste puede presentar más de uno.</p>"
        ) +
        visual("Los prefijos no son otra fórmula: sólo traducen cantidades",
          "<div class='flow'>" +
            "<span class='flow-node'>CO → 1 O → monóxido</span>" +
            "<span class='flow-node'>CO₂ → 2 O → dióxido</span>" +
            "<span class='flow-node'>N₂O₃ → 3 O → trióxido</span>" +
            "<span class='flow-node'>N₂O₅ → 5 O → pentóxido</span>" +
          "</div>"
        ) +
        "<div class='card'><h3>Ejemplo guiado · N₂O₅</h3><p><strong>1.</strong> Hay N y O: dos elementos → compuesto binario.</p><p><strong>2.</strong> O tiene subíndice 5 → penta + óxido = <strong>pentóxido</strong>.</p><p><strong>3.</strong> N tiene subíndice 2 → di + nitrógeno = <strong>dinitrógeno</strong>.</p><p><strong>Resultado:</strong> pentóxido de dinitrógeno.</p></div>" +
        recall("No confundas tres cosas distintas: <strong>subíndice</strong> = cuántos átomos hay; <strong>coeficiente</strong> = cuántas unidades/mol participan en una reacción; <strong>número romano</strong> = estado de oxidación en nomenclatura Stock.") +
        "<div class='section-grid'>" +
          "<div class='card'><h3>¿De dónde sale Fe (III)?</h3><p>En Fe₂O₃, el oxígeno suele trabajar con −2. Tres O aportan −6 en total. Como el compuesto completo debe quedar neutro, los dos Fe deben aportar +6. Entonces cada Fe aporta +3: por eso se escribe <strong>hierro (III)</strong>.</p></div>" +
          "<div class='card'><h3>¿Por qué no significa “3 hierros”?</h3><p>Porque la cantidad de átomos ya está escrita en la fórmula como Fe₂. El III pertenece al <strong>estado de oxidación</strong>, otra propiedad diferente.</p></div>" +
        "</div>" +
        visual("Ruta práctica para un ejercicio de nombre",
          "<div class='flow'>" +
            "<span class='flow-node'>leo fórmula</span><span class='flow-arrow'>→</span>" +
            "<span class='flow-node'>cuento elementos</span><span class='flow-arrow'>→</span>" +
            "<span class='flow-node'>leo subíndices</span><span class='flow-arrow'>→</span>" +
            "<span class='flow-node'>identifico óxido / familia</span><span class='flow-arrow'>→</span>" +
            "<span class='flow-node'>aplico sistema pedido</span>" +
          "</div>"
        ) +
        "<details class='note-box'><summary>Si te piden ir al revés: nombre → fórmula</summary><div>Los prefijos vuelven a convertirse en subíndices. <strong>Dióxido de carbono</strong>: di = 2 oxígenos; carbono sin prefijo explícito = 1 carbono → CO₂. En Stock, primero hay que usar los estados de oxidación para que la suma de cargas del compuesto sea neutra.</div></details>",
      exercise: {
        type: "choice",
        prompt: "Te entregan N₂O₃. ¿Qué razonamiento lleva al nombre correcto?",
        options: [
          "Tiene 2 elementos; O₃ indica trióxido y N₂ indica dinitrógeno → trióxido de dinitrógeno",
          "El 3 es número romano → óxido de nitrógeno (III)",
          "Tiene 5 átomos, por eso es pentóxido de nitrógeno",
          "Se suman 2 + 3 y se usa el prefijo penta para todo"
        ],
        answer: 0,
        explanation: "Primero distingues elementos y subíndices. N₂O₃ tiene dos elementos; O₃ se traduce con tri- y N₂ con di-. Los prefijos describen cantidades de cada elemento, no el total de átomos."
      }
    },
    {
      title: "Estequiometría",
      eyebrow: "10 · Elegir la operación antes de calcular",
      lead: "La estequiometría no consiste en recordar una fórmula larga. Consiste en reconocer qué variable tienes, qué variable necesitas y qué puente permite pasar de una a la otra.",
      body: () =>
        recall("Antes de esta sección ya tienes cuatro ideas: 1) una fórmula dice cuántos átomos hay; 2) la tabla periódica entrega masas atómicas; 3) la masa molar M expresa g/mol; 4) 1 mol contiene 6,022 × 10²³ partículas. Ahora sólo vamos a conectarlas.") +
        visual("Las variables · qué significa cada letra",
          "<div class='variable-table'>" +
            "<div><strong>m</strong><span>masa</span><small>se mide en g</small></div>" +
            "<div><strong>M</strong><span>masa molar</span><small>se mide en g/mol</small></div>" +
            "<div><strong>n</strong><span>cantidad de sustancia</span><small>se mide en mol</small></div>" +
            "<div><strong>N</strong><span>número de partículas</span><small>átomos, moléculas, iones…</small></div>" +
            "<div><strong>N<sub>A</sub></strong><span>Avogadro</span><small>6,022 × 10²³ partículas/mol</small></div>" +
          "</div>"
        ) +
        "<div class='card'><h3>La pregunta que manda: ¿qué unidad tengo y qué unidad necesito?</h3><p>Las unidades te dicen qué operación tiene sentido. No eliges una fórmula porque “te suena”: eliges un puente porque conecta las unidades del dato con las unidades de la respuesta.</p></div>" +
        visual("Por qué cada fórmula usa esa operación",
          "<div class='decision-map'>" +
            "<div class='decision-step'><span>g→mol</span><div><small>n = m / M</small><strong>g ÷ (g/mol) = mol</strong><p>Tienes gramos y cada mol pesa M gramos. Dividir dice cuántos grupos de M caben en la masa.</p></div></div>" +
            "<div class='decision-step'><span>mol→g</span><div><small>m = n · M</small><strong>mol × (g/mol) = g</strong><p>Tienes n grupos y cada grupo pesa M gramos: por eso multiplicas.</p></div></div>" +
            "<div class='decision-step'><span>mol→N</span><div><small>N = n · N<sub>A</sub></small><strong>mol × (partículas/mol) = partículas</strong><p>Cada mol contiene un grupo de Avogadro: por eso multiplicas.</p></div></div>" +
            "<div class='decision-step'><span>N→mol</span><div><small>n = N / N<sub>A</sub></small><strong>partículas ÷ (partículas/mol) = mol</strong><p>Preguntas cuántos grupos de Avogadro están contenidos en ese número de partículas.</p></div></div>" +
          "</div>"
        ) +
        recall("Si hay una <strong>reacción química</strong>, aparece un puente adicional: <strong>mol de una sustancia → mol de otra sustancia</strong>. Ese puente sale de los coeficientes de la ecuación balanceada.") +
        visual("Reacción balanceada · los coeficientes son una proporción molar",
          "<div class='formula-box'>2 H<sub>2</sub> + O<sub>2</sub> → 2 H<sub>2</sub>O</div>" +
          "<div class='origin-grid'>" +
            "<div class='origin'><small>2 delante de H₂</small><strong>2 mol H₂</strong></div>" +
            "<div class='origin'><small>sin número delante de O₂</small><strong>1 mol O₂</strong></div>" +
            "<div class='origin'><small>2 delante de H₂O</small><strong>2 mol H₂O</strong></div>" +
          "</div>"
        ) +
        "<div class='card'><h3>¿Por qué los coeficientes no comparan gramos directamente?</h3><p>Porque 2 mol de H₂ y 2 mol de H₂O contienen el mismo número de moléculas, pero <strong>no pesan lo mismo</strong>. H₂ tiene M ≈ 2 g/mol; H₂O tiene M ≈ 18 g/mol. Los coeficientes comparan cantidades de partículas o mol, no masas en gramos.</p></div>" +
        visual("Problema nivel 1 · sólo mol",
          "<div class='worked-problem'>" +
            "<p><strong>Pregunta:</strong> si reaccionan 6 mol de H₂, ¿cuántos mol de H₂O pueden formarse?</p>" +
            "<p><strong>Dato:</strong> 6 mol H₂. <strong>Piden:</strong> mol H₂O.</p>" +
            "<p><strong>Decisión:</strong> ya estamos en mol. No necesitamos masa molar ni Avogadro. Usamos sólo los coeficientes.</p>" +
            "<div class='mathline'>2 mol H₂ → 2 mol H₂O<br>6 mol H₂ → 6 mol H₂O</div>" +
          "</div>"
        ) +
        visual("Problema nivel 2 · gramos → mol",
          "<div class='worked-problem'>" +
            "<p><strong>Pregunta:</strong> ¿cuántos mol hay en 4 g de H₂?</p>" +
            "<p><strong>Dato:</strong> gramos. <strong>Piden:</strong> mol.</p>" +
            "<p><strong>Decisión:</strong> gramos → mol exige masa molar M.</p>" +
            "<p><strong>¿De dónde sale M?</strong> H₂ tiene 2 H; en la tabla H ≈ 1 → M(H₂)=2×1=2 g/mol.</p>" +
            "<div class='mathline'>n = m/M = 4 g ÷ 2 g/mol = 2 mol H₂</div>" +
          "</div>"
        ) +
        visual("Problema nivel 3 · completo: gramos de A → gramos de B",
          "<div class='worked-problem'>" +
            "<p><strong>Pregunta:</strong> ¿cuántos gramos de H₂O pueden producirse a partir de 4 g de H₂?</p>" +
            "<div class='decision-map compact'>" +
              "<div class='decision-step'><span>1</span><div><small>Tengo gramos H₂</small><strong>Debo llegar primero a mol H₂</strong><p>Uso M(H₂)=2 g/mol → 4÷2 = 2 mol H₂.</p></div></div>" +
              "<div class='decision-step'><span>2</span><div><small>Tengo mol H₂</small><strong>Ahora puedo usar la reacción</strong><p>2 mol H₂ : 2 mol H₂O → obtengo 2 mol H₂O.</p></div></div>" +
              "<div class='decision-step'><span>3</span><div><small>Tengo mol H₂O</small><strong>Pero me piden gramos H₂O</strong><p>Busco M(H₂O): 2×1 + 16 = 18 g/mol.</p></div></div>" +
              "<div class='decision-step'><span>4</span><div><small>mol → gramos</small><strong>m = n·M</strong><p>2 mol × 18 g/mol = 36 g H₂O.</p></div></div>" +
            "</div>" +
          "</div>"
        ) +
        easyTechnical(
          "<p>La regla práctica es <strong>¿qué tengo? → ¿cómo llego a mol? → ¿la reacción cambia de sustancia? → ¿cómo salgo de mol hacia lo que me piden?</strong></p>",
          "<p>En una conversión estequiométrica masa→masa, las masas molares convierten entre masa y cantidad de sustancia, mientras la relación entre coeficientes balanceados convierte entre cantidades de sustancias diferentes.</p>"
        ) +
        "<details class='note-box' open><summary>Tarjeta de decisión para usar durante ejercicios</summary><div><strong>Si veo g:</strong> pienso en masa molar.<br><strong>Si veo mol:</strong> puedo usar directamente una relación estequiométrica.<br><strong>Si veo partículas:</strong> pienso en Avogadro.<br><strong>Si cambio de una sustancia A a otra B:</strong> necesito una ecuación balanceada y sus coeficientes.<br><strong>Si no sé qué hacer:</strong> escribo las unidades del dato y de la respuesta y construyo un camino que pase por mol.</div></details>",
      exercise: {
        type: "choice",
        prompt: "Problema: «¿Cuántos gramos de H₂O se forman a partir de 6 mol de H₂?» ¿Cuál es el camino correcto?",
        options: [
          "6 mol H₂ → usar relación 2:2 → 6 mol H₂O → calcular M(H₂O) → convertir a gramos",
          "6 mol H₂ → multiplicar inmediatamente por 6,022×10²³ → convertir partículas directamente a gramos",
          "6 mol H₂ → usar el subíndice ₂ como relación con H₂O → 12 g H₂O",
          "6 mol H₂ → sumar las masas atómicas de H₂ y H₂O y dividir"
        ],
        answer: 0,
        explanation: "Ya tienes mol, así que no necesitas convertir H₂ antes de usar la ecuación. Los coeficientes 2:2 llevan de mol H₂ a mol H₂O. Recién después usas M(H₂O)=18 g/mol para obtener gramos: 6×18 = 108 g."
      }
    }
  ];

  const refs = {
    slide: document.getElementById("slide"),
    outlineNav: document.getElementById("outlineNav"),
    progressBar: document.getElementById("progressBar"),
    progressLabel: document.getElementById("progressLabel"),
    outlinePercent: document.getElementById("outlinePercent"),
    slideTime: document.getElementById("slideTime"),
    slideCounter: document.getElementById("slideCounter"),
    prevButton: document.getElementById("prevButton"),
    nextButton: document.getElementById("nextButton"),
    resetButton: document.getElementById("resetButton"),
    timerButton: document.getElementById("timerButton"),
    timerValue: document.getElementById("timerValue")
  };

  let state = loadState();
  let secondsLeft = TOTAL_MINUTES * 60;
  let timerId = null;

  function loadState() {
    try {
      const raw = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (raw && Number.isInteger(raw.current) && Array.isArray(raw.completed)) {
        return {
          current: Math.min(Math.max(raw.current, 0), slides.length - 1),
          completed: raw.completed.filter(n => Number.isInteger(n) && n >= 0 && n < slides.length)
        };
      }
    } catch (_) {}
    return { current: 0, completed: [] };
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function minutesFor(index) {
    const start = index * 3;
    return "Min " + start + "–" + (start + 3);
  }

  function renderOutline() {
    refs.outlineNav.innerHTML = slides.map((s, index) => {
      const active = index === state.current ? " active" : "";
      const done = state.completed.includes(index) ? " done" : "";
      return "<button class='outline-button" + active + done + "' data-slide='" + index + "' type='button'>" +
        "<span class='outline-number'>" + String(index + 1).padStart(2, "0") + "</span>" +
        "<span class='outline-title'>" + s.title + "</span>" +
      "</button>";
    }).join("");

    refs.outlineNav.querySelectorAll("[data-slide]").forEach(btn => {
      btn.addEventListener("click", () => goTo(Number(btn.dataset.slide)));
    });
  }

  function renderExercise(exercise) {
    let controls = "";
    if (exercise.type === "choice") {
      controls = "<div class='answers'>" + exercise.options.map((option, index) =>
        "<label class='answer-option'><input type='radio' name='answer' value='" + index + "'> <span>" + option + "</span></label>"
      ).join("") + "</div>";
    } else {
      controls = "<div class='number-answer'><input name='answer' inputmode='decimal' autocomplete='off' placeholder='Escribe tu respuesta'><button class='check-button' type='submit'>Comprobar</button></div>";
    }

    if (exercise.type === "choice") {
      controls += "<div style='margin-top:12px'><button class='check-button' type='submit'>Comprobar</button></div>";
    }

    return "<form class='exercise' id='exerciseForm'>" +
      "<div class='exercise-kicker'>Microejercicio · 1 minuto</div>" +
      "<h2>" + exercise.prompt + "</h2>" +
      "<p>Resuelve antes de avanzar. Si fallas, la explicación reconstruye el origen del dato.</p>" +
      controls +
      "<div class='feedback' id='exerciseFeedback'></div>" +
    "</form>";
  }

  function render() {
    const s = slides[state.current];
    refs.slide.innerHTML =
      "<header class='slide-head'>" +
        "<div class='eyebrow'>" + s.eyebrow + "</div>" +
        "<h1>" + s.title + "</h1>" +
        "<div class='slide-lead'>" + s.lead + "</div>" +
      "</header>" +
      "<div class='slide-body'>" + s.body() + renderExercise(s.exercise) + "</div>";

    const form = document.getElementById("exerciseForm");
    form.addEventListener("submit", handleExercise);

    refs.slideCounter.textContent = String(state.current + 1).padStart(2, "0") + " / " + String(slides.length).padStart(2, "0");
    refs.slideTime.textContent = minutesFor(state.current);
    refs.prevButton.disabled = state.current === 0;
    refs.nextButton.textContent = state.current === slides.length - 1 ? "Volver al inicio ↺" : "Siguiente →";

    updateProgress();
    renderOutline();

    requestAnimationFrame(() => {
      const active = refs.outlineNav.querySelector(".active");
      if (active) active.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleExercise(event) {
    event.preventDefault();
    const exercise = slides[state.current].exercise;
    const feedback = document.getElementById("exerciseFeedback");
    const data = new FormData(event.currentTarget);
    const raw = data.get("answer");
    let correct = false;

    if (raw === null || String(raw).trim() === "") {
      feedback.className = "feedback show wrong";
      feedback.textContent = "Falta una respuesta. Revisa el recordatorio del bloque y prueba de nuevo.";
      return;
    }

    if (exercise.type === "choice") {
      correct = Number(raw) === exercise.answer;
    } else {
      const normalized = String(raw).replace(",", ".").replace(/[^0-9eE+\-.]/g, "");
      const value = Number(normalized);
      correct = Number.isFinite(value) && Math.abs(value - exercise.answer) <= exercise.tolerance;
    }

    if (correct) {
      if (!state.completed.includes(state.current)) state.completed.push(state.current);
      saveState();
      feedback.className = "feedback show correct";
      feedback.innerHTML = "<strong>Correcto.</strong> " + exercise.explanation + (exercise.unit ? " <strong>Unidad esperada:</strong> " + exercise.unit + "." : "");
      updateProgress();
      renderOutline();
    } else {
      feedback.className = "feedback show wrong";
      feedback.innerHTML = "<strong>Aún no.</strong> " + exercise.explanation;
    }
  }

  function updateProgress() {
    const done = state.completed.length;
    const percent = Math.round((done / slides.length) * 100);
    refs.progressBar.style.width = percent + "%";
    refs.progressLabel.textContent = done + " de " + slides.length + " conceptos dominados";
    refs.outlinePercent.textContent = percent + "%";
  }

  function goTo(index) {
    state.current = Math.min(Math.max(index, 0), slides.length - 1);
    saveState();
    render();
  }

  function next() {
    if (state.current === slides.length - 1) goTo(0);
    else goTo(state.current + 1);
  }

  function prev() {
    goTo(state.current - 1);
  }

  function resetStudy() {
    if (!window.confirm("¿Reiniciar progreso y temporizador de esta guía?")) return;
    state = { current: 0, completed: [] };
    saveState();
    stopTimer();
    secondsLeft = TOTAL_MINUTES * 60;
    updateTimerLabel();
    render();
  }

  function updateTimerLabel() {
    const min = Math.floor(secondsLeft / 60);
    const sec = secondsLeft % 60;
    refs.timerValue.textContent = String(min).padStart(2, "0") + ":" + String(sec).padStart(2, "0");
  }

  function startTimer() {
    if (timerId) return;
    refs.timerButton.classList.add("running");
    timerId = window.setInterval(() => {
      secondsLeft -= 1;
      if (secondsLeft <= 0) {
        secondsLeft = 0;
        stopTimer();
      }
      updateTimerLabel();
    }, 1000);
  }

  function stopTimer() {
    if (timerId) window.clearInterval(timerId);
    timerId = null;
    refs.timerButton.classList.remove("running");
  }

  function toggleTimer() {
    if (timerId) stopTimer();
    else if (secondsLeft > 0) startTimer();
  }

  refs.prevButton.addEventListener("click", prev);
  refs.nextButton.addEventListener("click", next);
  refs.resetButton.addEventListener("click", resetStudy);
  refs.timerButton.addEventListener("click", toggleTimer);

  document.addEventListener("keydown", event => {
    if (event.target.matches("input")) return;
    if (event.key === "ArrowRight") next();
    if (event.key === "ArrowLeft") prev();
  });

  let touchStartX = null;
  refs.slide.addEventListener("touchstart", event => {
    touchStartX = event.changedTouches[0].clientX;
  }, { passive: true });

  refs.slide.addEventListener("touchend", event => {
    if (touchStartX === null) return;
    const delta = event.changedTouches[0].clientX - touchStartX;
    touchStartX = null;
    if (Math.abs(delta) < 80) return;
    if (delta < 0) next();
    else prev();
  }, { passive: true });

  updateTimerLabel();
  render();
})();