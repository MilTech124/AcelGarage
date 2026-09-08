import { miejsceNaSciance } from "./WallGeometry";

/*
  Jedno miejsce, w którym liczymy gdzie stoją drzwi i okna.

  Wcześniej te same współczynniki siedziały w <Door>/<Window> w Model.js i
  (przeliczone od nowa) w WnekaSetting.js. Warstwa wymiarowania byłaby trzecią
  kopią, więc placement wyjeżdża tutaj: Model.js stawia z tego siatki, a
  Dimensions.js rysuje z tego miarki - zawsze w tych samych punktach.

  Zwracamy punkt ZACZEPIENIA grupy (tak jak w GLB) plus dane potrzebne do
  wymiarowania: kąt lica, skalę i środek skrzydła w świecie.
  Konwencja kąta jak przy ścianach: +x = 0, -x = PI, +z = -PI/2, -z = PI/2,
  czyli normalna lica to (cos kat, 0, -sin kat), a kierunek wzdłuż ściany
  to (sin kat, 0, cos kat).
*/

export const naWnece = (pozycja) =>
  typeof pozycja === "string" && pozycja.startsWith("wnęka");

export const skalaDrzwi = (size) =>
  size === "100x190" ? 1 : size === "90x190" ? 0.95 : 0.92;

// "100x190" -> { szer: 1.0, wys: 1.9 } (metry)
export const rozmiarWMetrach = (size) => {
  const [w, h] = String(size || "").split("x").map(Number);
  return { szer: (w || 0) / 100, wys: (h || 0) / 100 };
};

export const wzdluzSciany = (kat) => [Math.sin(kat), 0, Math.cos(kat)];
export const normalnaLica = (kat) => [Math.cos(kat), 0, -Math.sin(kat)];

// skrzydło drzwi siedzi 0.362 (w skali drzwi) przed punktem zaczepienia grupy
const ODSUNIECIE_SKRZYDLA = 0.362;

export function pozycjaDrzwi(item, { width, depth, wnekaSwiat }) {
  if (!item) return null;
  const skala = skalaDrzwi(item.size);

  if (naWnece(item.position)) {
    const m = miejsceNaSciance(wnekaSwiat, item.position, item.positionValue, skala);
    if (!m) return null; // wnęka wyłączona albo brak ścianki bocznej
    return {
      position: [
        m.x + ODSUNIECIE_SKRZYDLA * skala * Math.sin(m.kat),
        1.054,
        m.z + ODSUNIECIE_SKRZYDLA * skala * Math.cos(m.kat),
      ],
      kat: m.kat,
      skala,
      srodek: [m.x, 1.054, m.z],
    };
  }

  const p = item.positionValue / 100;
  const position =
    item.position === "przod"
      ? [
          (2.965 * depth) / 6,
          1.054,
          (width < 5 ? (2.82 * width) / 6 : (2.92 * width) / 6) - p,
        ]
      : item.position === "tył"
      ? [(-2.965 * depth) / 6, 1.054, ((-2.2 - 0.71) * width) / 6 + p]
      : item.position === "prawo"
      ? [(2.86 * depth) / 6 - p, 1.054, (-2.965 * width) / 6]
      : item.position === "lewo"
      ? [(2.86 * depth) / 6 - p - (0.6 * width) / 6, 1.054, (2.965 * width) / 6]
      : null;
  if (!position) return null;

  const kat =
    item.position === "przod"
      ? 0
      : item.position === "tył"
      ? Math.PI
      : item.position === "prawo"
      ? Math.PI / 2
      : -Math.PI / 2;

  const t = wzdluzSciany(kat);
  const d = -ODSUNIECIE_SKRZYDLA * skala;
  return {
    position,
    kat,
    skala,
    srodek: [position[0] + d * t[0], position[1], position[2] + d * t[2]],
  };
}

export function pozycjaOkna(item, { width, depth, wnekaSwiat }) {
  if (!item) return null;

  if (naWnece(item.position)) {
    // skrzydło okna ma 0.8 m - tyle podajemy do wyśrodkowania na ściance wnęki
    const m = miejsceNaSciance(wnekaSwiat, item.position, item.positionValue, 0.8);
    if (!m) return null;
    return { position: [m.x, 1.631, m.z], kat: m.kat, srodek: [m.x, 1.631, m.z] };
  }

  const p = item.positionValue / 100;
  const wzdluzZ = width >= 6 ? (2.7 * width) / 6 - p : (2 * width) / 6 - p;
  const wzdluzX = depth <= 6 ? (-2.4 * depth) / 6 + p : (-2.7 * depth) / 6 + p;
  const position =
    item.position === "przod"
      ? [(3.006 * depth) / 6, 1.631, wzdluzZ]
      : item.position === "tył"
      ? [(-3.006 * depth) / 6, 1.631, wzdluzZ]
      : item.position === "lewo"
      ? [wzdluzX, 1.631, (3 * width) / 6]
      : item.position === "prawo"
      ? [wzdluzX, 1.631, (-3 * width) / 6]
      : null;
  if (!position) return null;

  const kat =
    item.position === "przod"
      ? 0
      : item.position === "tył"
      ? Math.PI
      : item.position === "lewo"
      ? -Math.PI / 2
      : Math.PI / 2;

  return { position, kat, srodek: position };
}
