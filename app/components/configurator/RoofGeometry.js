/*
  Stałe geometrii dachu.

  Wszystkie elementy dachu są pozycjonowane ręcznie w Model.js (GLB dostarcza tylko
  surowe siatki). Wcześniej pary elementów miały wpisane niesymetryczne liczby
  (np. połacie na z=+1.591 i z=-1.618), przez co kalenica nie schodziła się w osi.
  Tutaj wartości są wyliczane z kilku parametrów, więc symetria wynika z konstrukcji:
  w Model.js używamy +ROOF.slopeZ / -ROOF.slopeZ zamiast dwóch niezależnych liczb.
*/

const PITCH = Math.PI / 9; // 20° - nachylenie połaci dwuspadu
const SLOPE_HALF = 1.729; // skala z połaci (połowa długości połaci)

export const ROOF = {
  pitch: PITCH,
  slopeScale: [3.131, 1.137, SLOPE_HALF],
  slopeY: 2.641, // wysokość środka połaci
  // kalenica dokładnie w z=0: rzut poziomy połowy połaci
  slopeZ: SLOPE_HALF * Math.cos(PITCH), // 1.6249
  // wierzchołek kalenicy = wierzchołek szczytu (2.571 + 0.662 = 3.233)
  ridgeY: 2.641 + SLOPE_HALF * Math.sin(PITCH), // 3.2324

  // obróbki połaci (wiatrownice) - wysunięte poza ścianę
  trimX: 3.115,
  trimY: 2.606,
  trimScale: [0.0345, 3.585, 1.7292],

  // Szczyty dach-przod / dach-tyl (używane, gdy nie ma wspólnego dachu z wiatą).
  // 2.96 zamiast 2.98 trzyma prześwit względem lica ściany - przy mniejszym odstępie
  // panele zaczynają walczyć o bufor głębi i tekstura rozmywa się w plamy.
  gableX: 2.96,
  gableY: 2.571,

  // obróbki narożników ścian
  postX: 2.98, // rozstaw podpór wiaty (były 3.011 / 0.014 / -2.958)

  wallTrimX: 2.96,
  wallTrimZ: 2.98,

  // dach jednospadowy
  mono: {
    pitch: 0.0873, // 5°
    z: 3.133, // obróbki okapu lewo/prawo
    x: 3.09, // obróbki szczytu przod/tył
    trimScaleY: 3.585,
    trimScaleZ: 3.13,
    centerY: 2.427, // wysokość środka połaci jednospadowej
    trimHang: 0.033, // o ile obróbka zwisa poniżej krawędzi połaci
    wallTrimX: 3.0,
  },

};

export default ROOF;

// Wysokość obróbki szczytowej dachu jednospadowego.
// sign = +1 strona wysoka (przód), -1 strona niska (tył).
// Liczone z jednej płaszczyzny połaci, więc obie obróbki leżą symetrycznie
// względem środka spadku - wcześniej były to dwie niezależne liczby (2.6671 / 2.1279).
export const monoTrimY = (sign) =>
  ROOF.mono.centerY +
  sign * ROOF.mono.x * Math.tan(ROOF.mono.pitch) -
  ROOF.mono.trimHang;

/*
  Wspólny dach dwuspadowy nad garażem i wiatą.

  Gdy wiata jest doklejona od strony okapu, dach ma być JEDNYM symetrycznym dwuspadem
  nad całym obrysem: kalenica przechodzi na środek (garaż + wiata), obie połacie mają
  ten sam kąt co dach garażu bez wiaty, oba okapy schodzą na tę samą wysokość.
  Wcześniej połać nad wiatą była rozciągana skalą rodzica, przez co jej nachylenie
  spadało do połowy (0.22 zamiast 0.41) i na kalenicy powstawało załamanie.

  rozpietosc - wymiar garażu w poprzek kalenicy (m)
  wiata      - szerokość wiaty (m), 0 = brak

  Kąt trzymamy stały mimo dłuższej połaci, więc rotację połaci trzeba podkręcić
  o współczynnik k: niejednorodna skala grupy spłaszcza kąt dokładnie k razy.
*/
export function combinedRoof(rozpietosc, wiata) {
  const k = (rozpietosc + wiata) / rozpietosc;
  const pitch = Math.atan(Math.tan(PITCH) * k);
  const okapY = ROOF.slopeY - SLOPE_HALF * Math.sin(PITCH); // wysokość okapu bez zmian
  return {
    k,
    pitch,
    // połać wydłuża się tak, żeby jej rzut poziomy został ten sam w jednostkach lokalnych
    planeScaleZ: (SLOPE_HALF * Math.cos(PITCH)) / Math.cos(pitch),
    planeZ: ROOF.slopeZ, // środek połaci - kalenica nadal wypada w z=0
    planeY: okapY + ROOF.slopeZ * Math.tan(pitch),
    ridgeY: okapY + 2 * ROOF.slopeZ * Math.tan(pitch),
    okapY,
    groupScale: (rozpietosc + wiata) / 6,
    ridgeShift: wiata / 2, // o tyle kalenica jedzie w stronę wiaty (m)
    // granica garaż/wiata w układzie lokalnym grupy dachu
    styk: (3 * (wiata - rozpietosc)) / (rozpietosc + wiata),
  };
}
