import { BufferGeometry, BufferAttribute } from "three";

/*
  Geometria wnęki - otwartego wcięcia w bryle garażu.

  Bryła garażu w modelu to JEDNA zamknięta siatka (`calosc` przy dwuspadzie,
  `bryla` przy spadach), więc otworu nie da się w niej zrobić samą skalą,
  a skalowanie `bryla` wzdłuż osi spadku psuje kąt skosu (skos jest wypieczony
  w wierzchołkach). Dlatego przy włączonej wnęce bryłę składamy z trzech klocków
  obejmujących ją "dookoła" wcięcia, plus sufit wnęki.

  Wszystko liczymy w układzie LOKALNYM grupy, w której siedzi bryła - dzięki temu
  całe istniejące skalowanie (szerokość/długość/wysokość) działa bez zmian.
  1 jednostka lokalna = (wymiar garażu / 6) metra na danej osi.
*/

// Obrys bryły w układzie lokalnym grupy.
// mono: górna krawędź jest pochyła - wartości odczytane z wierzchołków `bryla`
// (Cube.003: y od ~0.93 przy x=-1 do ~1.42 przy x=+1, transform [0,1.131,0.006] x [3,1.102,2.994]).
export const BODY = {
  gable: {
    xMin: -3, xMax: 3, zMin: -3, zMax: 3,
    yBottom: -1,
    yTop: () => 1,
    uvRef: [
      { min: -3, span: 6 },
      { min: -1, span: 2 },
      { min: -3, span: 6 },
    ],
  },
  mono: {
    xMin: -3,
    xMax: 3,
    zMin: -2.988,
    zMax: 3.0,
    yBottom: 0.029,
    yTop: (x) => 2.4256 + 0.0903 * x,
    uvRef: [
      { min: -3, span: 6 },
      { min: 0.029, span: 2.67 },
      { min: -2.988, span: 5.988 },
    ],
  },
};

const EPS = 0.02; // poniżej tej szerokości klocka nie ma sensu rysować

/*
  Sześcian o pionowych ścianach bocznych; spód i góra mogą być pochyłe wzdłuż osi X
  (wysokości podajemy jedną liczbą albo osobno dla czterech naroży). Dzięki temu ten sam
  helper daje płaską bryłę dwuspadu i pochyłą bryłę spadową - skos zostaje ciągły
  mimo pocięcia bryły na kawałki.
  UV liczymy tak samo jak siatki z GLB: każda ścianka bryły rozciąga teksturę na
  0..1 po całym obrysie (uvRef), a nie po samym kawałku. Dzięki temu wspólne mapy
  (drewno + przetłoczenia) mają tu dokładnie taką samą gęstość jak na ścianach z
  modelu i tekstura biegnie w poprzek styków bez skoku.
*/
export function createBox({ x0, x1, z0, z1, yBottom, yTop, uvRef }) {
  // yBottom / yTop: liczba albo 4 wysokości naroży w kolejności
  // (x0,z0), (x1,z0), (x1,z1), (x0,z1)
  const naroza = (v) => (Array.isArray(v) ? v : [v, v, v, v]);
  const [bA, bB, bC, bD] = naroza(yBottom);
  const [tA, tB, tC, tD] = naroza(yTop);

  const b00 = [x0, bA, z0], b10 = [x1, bB, z0], b11 = [x1, bC, z1], b01 = [x0, bD, z1];
  const t00 = [x0, tA, z0], t10 = [x1, tB, z0], t11 = [x1, tC, z1], t01 = [x0, tD, z1];

  // odniesienie UV: obrys, względem którego normalizujemy współrzędne (0 = x, 1 = y, 2 = z)
  const ref = uvRef || [
    { min: 0, span: 1 },
    { min: 0, span: 1 },
    { min: 0, span: 1 },
  ];
  const wsp = (punkt, os) => (punkt[os] - ref[os].min) / ref[os].span;

  // ścianki: 4 wierzchołki CCW od zewnątrz + osie, z których liczymy U i V
  const faces = [
    { pts: [b10, t10, t11, b11], u: 2, v: 1 }, // +X
    { pts: [b00, b01, t01, t00], u: 2, v: 1 }, // -X
    { pts: [b01, b11, t11, t01], u: 0, v: 1 }, // +Z
    { pts: [b10, b00, t00, t10], u: 0, v: 1 }, // -Z
    { pts: [t00, t01, t11, t10], u: 0, v: 2 }, // góra
    { pts: [b00, b10, b11, b01], u: 0, v: 2 }, // spód
  ];

  const pos = [];
  const uv = [];
  const idx = [];
  faces.forEach((f, i) => {
    f.pts.forEach((punkt) => {
      pos.push(punkt[0], punkt[1], punkt[2]);
      uv.push(wsp(punkt, f.u), wsp(punkt, f.v));
    });
    const o = i * 4;
    idx.push(o, o + 1, o + 2, o, o + 2, o + 3);
  });

  const g = new BufferGeometry();
  g.setAttribute("position", new BufferAttribute(new Float32Array(pos), 3));
  g.setAttribute("uv", new BufferAttribute(new Float32Array(uv), 2));
  g.setIndex(idx);
  g.computeVertexNormals();
  return g;
}

/*
  Składa bryłę z wnęką.

  axis    - oś, w którą wcina się wnęka: "x" (przód/tył) albo "z" (bok)
  sign    - +1 dla ściany na dodatnim krańcu osi, -1 dla przeciwnej
  center  - środek wnęki wzdłuż drugiej osi (jednostki lokalne)
  half    - połowa szerokości wnęki (jednostki lokalne)
  depth   - głębokość wnęki w głąb bryły (jednostki lokalne)

  Zwraca geometrie klocków + sufitu oraz współrzędne pionowych krawędzi otworu,
  na które Model.js nakłada obróbki i (przy wnęce na całą ścianę) słupki.
*/
export function buildWneka({ mono, axis, sign, center, half, depth }) {
  const B = mono ? BODY.mono : BODY.gable;
  const top = (x) => B.yTop(x);
  const boxes = [];

  const along = axis === "x" ? { min: B.zMin, max: B.zMax } : { min: B.xMin, max: B.xMax };
  const into = axis === "x" ? { min: B.xMin, max: B.xMax } : { min: B.zMin, max: B.zMax };

  // zakres wnęki wzdłuż ściany, przycięty do bryły
  const c0 = Math.max(along.min, center - half);
  const c1 = Math.min(along.max, center + half);
  const face = sign > 0 ? into.max : into.min;
  const inner = face - sign * depth;
  const iMin = Math.min(face, inner);
  const iMax = Math.max(face, inner);

  const box = (x0, x1, z0, z1) =>
    createBox({
      x0, x1, z0, z1,
      yBottom: B.yBottom,
      yTop: [top(x0), top(x1), top(x1), top(x0)],
      uvRef: B.uvRef,
    });

  if (axis === "x") {
    if (c0 - along.min > EPS) boxes.push(box(into.min, into.max, along.min, c0));
    if (along.max - c1 > EPS) boxes.push(box(into.min, into.max, c1, along.max));
    // ściana tylna wnęki
    if (sign > 0) boxes.push(box(into.min, inner, c0, c1));
    else boxes.push(box(inner, into.max, c0, c1));
  } else {
    if (c0 - along.min > EPS) boxes.push(box(along.min, c0, into.min, into.max));
    if (along.max - c1 > EPS) boxes.push(box(c1, along.max, into.min, into.max));
    if (sign > 0) boxes.push(box(c0, c1, into.min, inner));
    else boxes.push(box(c0, c1, inner, into.max));
  }

  // sufit wnęki - przy spadach pochylony razem z górną krawędzią ściany
  const T = 0.06;
  const ceiling =
    axis === "x"
      ? createBox({
          x0: iMin, x1: iMax, z0: c0, z1: c1,
          yBottom: [top(iMin) - T, top(iMax) - T, top(iMax) - T, top(iMin) - T],
          yTop: [top(iMin), top(iMax), top(iMax), top(iMin)],
          uvRef: B.uvRef,
        })
      : createBox({
          x0: c0, x1: c1, z0: iMin, z1: iMax,
          yBottom: [top(c0) - T, top(c1) - T, top(c1) - T, top(c0) - T],
          yTop: [top(c0), top(c1), top(c1), top(c0)],
          uvRef: B.uvRef,
        });

  // pionowe krawędzie otworu: dwie zewnętrzne (w licu ściany) i dwie wewnętrzne
  const corner = (a, c) =>
    axis === "x"
      ? { x: a, z: c, yBottom: B.yBottom, yTop: top(a) }
      : { x: c, z: a, yBottom: B.yBottom, yTop: top(c) };

  return {
    boxes,
    ceiling,
    outerEdges: [corner(face, c0), corner(face, c1)],
    innerEdges: [corner(inner, c0), corner(inner, c1)],
    // czy przy danej krawędzi została ściana - jeśli nie, w narożniku staje słupek
    flanks: [c0 - along.min > EPS, along.max - c1 > EPS],
  };
}

/*
  Mapowanie stron widzianych przez użytkownika (świat) na osie układu lokalnego
  grupy, w której siedzi bryła. Grupa RoofDirection jest obracana zależnie od
  kierunku spadku, więc te same nazwy stron trafiają na różne osie lokalne.
  Zgodne z tabelą tłumaczeń stron z CarportSetting.js.
*/
export function localAxis(roof, side) {
  const map = {
    "spad przód": { przod: ["x", -1], tył: ["x", 1], lewo: ["z", -1], prawo: ["z", 1] },
    "spad w prawo": { lewo: ["x", 1], prawo: ["x", -1], tył: ["z", 1], przod: ["z", -1] },
    "spad w lewo": { prawo: ["x", 1], lewo: ["x", -1], przod: ["z", 1], tył: ["z", -1] },
  };
  const domyslne = { przod: ["x", 1], tył: ["x", -1], lewo: ["z", 1], prawo: ["z", -1] };
  const [axis, sign] = (map[roof] || domyslne)[side] || domyslne.przod;
  return { axis, sign };
}

// Skala grupy na osiach lokalnych: ile metrów przypada na jednostkę lokalną.
export function localScale(roof, { width, depth }) {
  const obrocony = roof === "spad w lewo" || roof === "spad w prawo";
  return obrocony ? { x: width / 6, z: depth / 6 } : { x: depth / 6, z: width / 6 };
}

/*
  Zwrot lokalnej osi "wzdłuż ściany" względem świata. Grupa spadowa bywa obrócona,
  więc bez tego dodatnie przesunięcie wnęki jechałoby raz w lewo, raz w prawo
  zależnie od typu dachu.
*/
export function localAlongSign(roof, alongAxis) {
  const obrocone = {
    "spad przód": { x: -1, z: -1 },
    "spad w prawo": { x: 1, z: -1 },
    "spad w lewo": { x: -1, z: 1 },
  };
  return (obrocone[roof] || { x: 1, z: 1 })[alongAxis];
}

/*
  Ściana szczytowa dla wspólnego dachu garaż + wiata.

  Przy wspólnym dwuspadzie kalenica nie stoi już nad środkiem garażu, więc szczytu
  nie da się złożyć z gotowego symetrycznego trójkąta z GLB - generujemy płytę,
  której górna krawędź biegnie po połaci (z załamaniem w kalenicy, jeśli kalenica
  wypada w podanym zakresie).

  zFrom, zTo - zakres w układzie lokalnym grupy dachu
  ridgeY     - wysokość kalenicy (lokalnie), kalenica jest w z = 0
  tan        - nachylenie połaci w jednostkach lokalnych
*/
export function buildGablePanels({ x, thickness, zFrom, zTo, yBottom, ridgeY, tan }) {
  const y = (z) => ridgeY - Math.abs(z) * tan;
  // Grupa dachu ma inną skalę Y niż grupa ścian (1.12 vs 1.2), więc żeby przetłoczenia
  // na szczycie miały tę samą gęstość w świecie co na ścianie, odniesienie w pionie to
  // 6 / (1.12 * 2.5 przetłoczenia na jednostkę) = 2.143.
  const uvRef = [
    { min: -3, span: 6 },
    { min: yBottom, span: 2.143 },
    { min: -3, span: 6 },
  ];
  const a = Math.min(zFrom, zTo);
  const b = Math.max(zFrom, zTo);
  const punkty = a < 0 && b > 0 ? [a, 0, b] : [a, b];
  const out = [];
  for (let i = 0; i < punkty.length - 1; i++) {
    const z0 = punkty[i];
    const z1 = punkty[i + 1];
    if (z1 - z0 < 0.001) continue;
    out.push(
      createBox({
        x0: x - thickness / 2,
        x1: x + thickness / 2,
        z0,
        z1,
        yBottom,
        yTop: [y(z0), y(z0), y(z1), y(z1)],
        uvRef,
      })
    );
  }
  return out;
}


/*
  Wnęka w METRACH, w układzie świata (tym samym, w którym stoją drzwi, okna i bramy).
  Nie zależy od typu dachu - obrót grupy z bryłą dotyczy tylko geometrii samej wnęki,
  a elementy wstawiamy bezpośrednio w układzie modelu.

  osA  - oś w głąb wnęki, osB - wzdłuż ściany
  lico - płaszczyzna lica ściany zewnętrznej, tyl - ściana tylna wnęki
  c1   - krawędź wnęki od strony "lewej" (ta sama, od której liczy się pozycję
         wnęki i bram), c0 - od strony "prawej"
*/
export function wnekaWSwiecie({
  wneka,
  wnekaSide,
  wnekaAnchor,
  wnekaPositionValue,
  wnekaWidth,
  wnekaDepth,
  width,
  depth,
}) {
  if (!wneka) return null;
  const przodTyl = wnekaSide === "przod" || wnekaSide === "tył";
  const znakA = wnekaSide === "przod" || wnekaSide === "lewo" ? 1 : -1;
  const polowaA = przodTyl ? depth / 2 : width / 2;
  const dlugoscSciany = przodTyl ? width : depth;
  const znakKrawedzi = wnekaAnchor === "prawa" ? -1 : 1;
  const srodek =
    znakKrawedzi * (dlugoscSciany / 2 - wnekaPositionValue / 100 - wnekaWidth / 2);
  return {
    osA: przodTyl ? "x" : "z",
    osB: przodTyl ? "z" : "x",
    znakA,
    lico: znakA * polowaA,
    tyl: znakA * (polowaA - wnekaDepth),
    c1: srodek + wnekaWidth / 2,
    c0: srodek - wnekaWidth / 2,
  };
}

// Kąt obrotu elementu wg kierunku, w który patrzy jego lico - konwencja jak przy
// ścianach zewnętrznych: +x = 0, -x = PI, +z = -PI/2, -z = PI/2.
export const katDlaNormalnej = (os, znak) =>
  os === "x" ? (znak > 0 ? 0 : Math.PI) : znak > 0 ? -Math.PI / 2 : Math.PI / 2;

/*
  Środek drzwi/okna na ściance wnęki.
  pozycja    - "wnęka tył" | "wnęka lewo" | "wnęka prawo"
  odsuniecie - cm: na ściance tylnej od krawędzi "lewej" wnęki,
               na bocznych od lica ściany w głąb wnęki
  szerokosc  - szerokość elementu w metrach (do wyśrodkowania)
*/
export function miejsceNaSciance(W, pozycja, odsuniecie, szerokosc) {
  if (!W) return null;
  const d = odsuniecie / 100;
  const przodTyl = W.osA === "x";
  const zloz = (a, b) => (przodTyl ? { x: a, z: b } : { x: b, z: a });
  if (pozycja === "wnęka tył") {
    const wzdluz = W.c1 - d - szerokosc / 2;
    return { ...zloz(W.tyl, wzdluz), kat: katDlaNormalnej(W.osA, W.znakA) };
  }
  const wLewo = pozycja === "wnęka lewo";
  const wGlab = W.lico - W.znakA * (d + szerokosc / 2);
  return {
    ...zloz(wGlab, wLewo ? W.c1 : W.c0),
    kat: katDlaNormalnej(W.osB, wLewo ? -1 : 1),
  };
}
