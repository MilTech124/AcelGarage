import React, { useMemo } from "react";
import { Line, Html } from "@react-three/drei";
import { wnekaWSwiecie } from "./WallGeometry";
import {
  pozycjaDrzwi,
  pozycjaOkna,
  rozmiarWMetrach,
  wzdluzSciany,
  normalnaLica,
} from "./ItemPlacement";

/*
  Miarki wymiarowe rysowane obok modelu - szerokość / głębokość / wysokość bryły
  oraz wymiary drzwi i okien przy każdym z nich.

  Układ współrzędnych sceny (patrz Model.js):
  - korzeń modelu stoi na y = -0.5, więc poziom gruntu to Y0,
  - w poziomie 1 jednostka sceny = 1 metr (bryła sięga +-depth/2 po X i +-width/2 po Z),
  - w pionie bryła 213 cm ma 2.4 jednostki, stąd stała JEDN_Y.
  Etykiety siedzą w <Html>, więc zawsze stoją prosto i są czytelne pod każdym
  kątem orbity.
*/

const Y0 = -0.5; // poziom gruntu w świecie
const JEDN_Y = 2.4 / 2.13; // jednostki sceny na metr wysokości
const KOLOR = "#0f172a";
const KOLOR_POM = "#64748b"; // linie odnoszące
const ODSUNIECIE = 0.8; // ile miarka bryły stoi od ściany
const ODSUNIECIE_EL = 0.14; // ile miarka elementu stoi od lica ściany

const dodaj = (a, b, k = 1) => [a[0] + b[0] * k, a[1] + b[1] * k, a[2] + b[2] * k];
const srodekOdc = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2];
const cm = (metry) => `${Math.round(metry * 100)} cm`;

function Etykieta({ position, tekst, male }) {
  return (
    <Html
      position={position}
      center
      zIndexRange={[15, 0]}
      style={{ pointerEvents: "none" }}
    >
      <div
        style={{
          whiteSpace: "nowrap",
          padding: male ? "1px 5px" : "2px 7px",
          borderRadius: 4,
          fontSize: male ? 10 : 12,
          fontWeight: 600,
          lineHeight: 1.3,
          color: KOLOR,
          background: "rgba(255,255,255,0.92)",
          border: `1px solid ${male ? KOLOR_POM : KOLOR}`,
          boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
          userSelect: "none",
        }}
      >
        {tekst}
      </div>
    </Html>
  );
}

/*
  Pojedyncza miarka: linia od-do, dwie kreski końcowe wzdłuż `kreska`,
  opcjonalne linie odnoszące od bryły do miarki i etykieta nad środkiem.
*/
function Miarka({ od, koniec, kreska, tekst, odnosniki = [], male }) {
  const etykieta = dodaj(srodekOdc(od, koniec), kreska, male ? 1.6 : 2.0);
  const grubosc = male ? 1.2 : 2;
  return (
    <group>
      <Line points={[od, koniec]} color={KOLOR} lineWidth={grubosc} />
      <Line
        points={[dodaj(od, kreska, -1), dodaj(od, kreska, 1)]}
        color={KOLOR}
        lineWidth={grubosc}
      />
      <Line
        points={[dodaj(koniec, kreska, -1), dodaj(koniec, kreska, 1)]}
        color={KOLOR}
        lineWidth={grubosc}
      />
      {odnosniki.map((o, i) => (
        <Line
          key={i}
          points={[o[0], o[1]]}
          color={KOLOR_POM}
          lineWidth={1}
          dashed
          dashSize={0.08}
          gapSize={0.06}
        />
      ))}
      <Etykieta position={etykieta} tekst={tekst} male={male} />
    </group>
  );
}

/*
  Miarki elementu (drzwi / okno): szerokość nad elementem i wysokość z jego boku,
  obie odsunięte od lica ściany wzdłuż normalnej, żeby nie wtapiały się w blachę.
*/
function MiarkiElementu({ srodek, kat, szer, wys, dol, gora }) {
  const t = wzdluzSciany(kat);
  const n = normalnaLica(kat);
  const baza = dodaj([srodek[0], 0, srodek[2]], n, ODSUNIECIE_EL);

  const yGora = gora + 0.16;
  const szerOd = [baza[0] - t[0] * (szer / 2), yGora, baza[2] - t[2] * (szer / 2)];
  const szerDo = [baza[0] + t[0] * (szer / 2), yGora, baza[2] + t[2] * (szer / 2)];

  const bok = szer / 2 + 0.2;
  const wysOd = [baza[0] + t[0] * bok, dol, baza[2] + t[2] * bok];
  const wysDo = [baza[0] + t[0] * bok, gora, baza[2] + t[2] * bok];

  return (
    <group>
      <Miarka
        od={szerOd}
        koniec={szerDo}
        kreska={[0, 0.06, 0]}
        tekst={cm(szer)}
        male
        odnosniki={[
          [
            [srodek[0] - t[0] * (szer / 2), gora, srodek[2] - t[2] * (szer / 2)],
            szerOd,
          ],
          [
            [srodek[0] + t[0] * (szer / 2), gora, srodek[2] + t[2] * (szer / 2)],
            szerDo,
          ],
        ]}
      />
      <Miarka
        od={wysOd}
        koniec={wysDo}
        kreska={[t[0] * 0.06, 0, t[2] * 0.06]}
        tekst={cm(wys)}
        male
        odnosniki={[
          [
            [srodek[0] + t[0] * (szer / 2), dol, srodek[2] + t[2] * (szer / 2)],
            wysOd,
          ],
          [
            [srodek[0] + t[0] * (szer / 2), gora, srodek[2] + t[2] * (szer / 2)],
            wysDo,
          ],
        ]}
      />
    </group>
  );
}

// Bramy nie są tablicą, tylko trzema spłaszczonymi slotami w selectedOptions.
const bramyZOpcji = (o) =>
  [...Array(o.gateCount || 0)].map((_, i) => ({
    szer: o[`gateWidth${i + 1}`],
    wys: o[`gateHeight${i + 1}`] / 100,
    // pozycja liczona jak w Model.js: odsunięcie od lewej krawędzi ściany przedniej
    z: (o.width - o[`gateWidth${i + 1}`]) * 0.5 - o[`gatePositionValue${i + 1}`] / 100,
  }));

// Zwrot, w który wychodzi wiata (świat): lewo = +z, prawo = -z, przod = +x, tył = -x.
const zwrotWiaty = (strona) =>
  strona === "lewo"
    ? { os: "z", znak: 1 }
    : strona === "prawo"
    ? { os: "z", znak: -1 }
    : strona === "przod"
    ? { os: "x", znak: 1 }
    : { os: "x", znak: -1 };

export default function Dimensions({ selectedOptions }) {
  const {
    width,
    depth,
    height,
    door = [],
    window: okna = [],
    carport,
    carportWidth,
    carportSide,
    wneka,
    wnekaSide,
    wnekaAnchor,
    wnekaWidth,
    wnekaDepth,
  } = selectedOptions;

  // ta sama prawda o wnęce co w Model.js - elementy na jej ściankach muszą
  // dostać identyczne punkty, inaczej miarka odjedzie od skrzydła
  const wnekaSwiat = useMemo(
    () =>
      wnekaWSwiecie({
        wneka,
        wnekaSide,
        wnekaAnchor,
        wnekaWidth,
        wnekaDepth,
        width,
        depth,
      }),
    [wneka, wnekaSide, wnekaAnchor, wnekaWidth, wnekaDepth, width, depth]
  );

  const polGl = depth / 2; // pół głębokości (oś X)
  const polSzer = width / 2; // pół szerokości (oś Z)
  const gora = Y0 + (height / 100) * JEDN_Y; // górna krawędź ściany

  /*
    Wiata zajmuje pas przy jednej ze ścian, więc miarka bryły po tej stronie
    musiałaby biec pod jej dachem - odsuwamy ją o szerokość wiaty.
  */
  const wiata = carport ? zwrotWiaty(carportSide) : null;
  const zapasX = wiata && wiata.os === "x" && wiata.znak > 0 ? carportWidth : 0;
  const zapasZ = wiata && wiata.os === "z" && wiata.znak > 0 ? carportWidth : 0;
  const liniaX = polGl + zapasX + ODSUNIECIE; // linia miarki szerokości
  const liniaZ = polSzer + zapasZ + ODSUNIECIE; // linia miarki głębokości

  /*
    Wiata wychodzi poza lico ściany o carportWidth - tyle klient zamawia i tyle
    pokazujemy. Bryła wiaty w modelu jest w części przypadków przybliżona
    (dach rozciągany skalą), miarka trzyma się wartości z konfiguratora.
  */
  const miarkaWiaty = (() => {
    if (!wiata) return null;
    const { os, znak } = wiata;
    const lico = znak * (os === "x" ? polGl : polSzer);
    const kraniec = lico + znak * carportWidth;
    const tekst = `wiata ${cm(carportWidth)}`;
    if (os === "x") {
      return {
        od: [lico, Y0, liniaZ],
        koniec: [kraniec, Y0, liniaZ],
        kreska: [0, 0, 0.1],
        tekst,
        odnosniki: [
          [
            [lico, Y0, polSzer],
            [lico, Y0, liniaZ],
          ],
          [
            [kraniec, Y0, polSzer],
            [kraniec, Y0, liniaZ],
          ],
        ],
      };
    }
    return {
      od: [liniaX, Y0, lico],
      koniec: [liniaX, Y0, kraniec],
      kreska: [0.1, 0, 0],
      tekst,
      odnosniki: [
        [
          [polGl, Y0, lico],
          [liniaX, Y0, lico],
        ],
        [
          [polGl, Y0, kraniec],
          [liniaX, Y0, kraniec],
        ],
      ],
    };
  })();

  /*
    Wnęka - wcięcie w bryle. wnekaWSwiecie() daje jej krawędzie w metrach w świecie,
    ale na osiach nazwanych A (w głąb) i B (wzdłuż ściany), bo raz wypada to na X,
    a raz na Z. `punkt` składa z nich zwykłe [x, y, z].
    Szerokość rysujemy przed licem ściany (bliżej niż miarki bryły, żeby linie się
    nie nałożyły), głębokość - na posadzce wnęki, w jej osi.
  */
  const miarkiWneki = (() => {
    const W = wnekaSwiat;
    if (!W) return null;
    const punkt = (a, b) => (W.osA === "x" ? [a, Y0, b] : [b, Y0, a]);
    const wzdluzA = (d) => (W.osA === "x" ? [d, 0, 0] : [0, 0, d]);
    const wzdluzB = (d) => (W.osA === "x" ? [0, 0, d] : [d, 0, 0]);
    const przed = W.lico + W.znakA * (ODSUNIECIE / 2);
    return [
      {
        od: punkt(przed, W.c0),
        koniec: punkt(przed, W.c1),
        kreska: wzdluzA(0.08 * W.znakA), // etykieta ucieka na zewnątrz bryły
        tekst: `wnęka ${cm(wnekaWidth)}`,
        odnosniki: [
          [punkt(W.lico, W.c0), punkt(przed, W.c0)],
          [punkt(W.lico, W.c1), punkt(przed, W.c1)],
        ],
      },
      {
        od: punkt(W.lico, W.srodekB),
        koniec: punkt(W.tyl, W.srodekB),
        kreska: wzdluzB(0.08),
        tekst: `gł. wnęki ${cm(wnekaDepth)}`,
      },
    ];
  })();

  // bramy stoją zawsze w ścianie przedniej, czyli licem w +x (kąt 0)
  const bramy = bramyZOpcji(selectedOptions).map((b) => ({
    srodek: [polGl, 0, b.z],
    kat: 0,
    szer: b.szer,
    wys: b.wys,
    dol: Y0,
    gora: Y0 + b.wys * JEDN_Y,
  }));

  const drzwi = door
    .map((item) => {
      const m = pozycjaDrzwi(item, { width, depth, wnekaSwiat });
      if (!m) return null;
      const { szer, wys } = rozmiarWMetrach(item.size);
      return {
        srodek: m.srodek,
        kat: m.kat,
        szer,
        wys,
        dol: Y0,
        gora: Y0 + wys * JEDN_Y,
      };
    })
    .filter(Boolean);

  const okienka = okna
    .map((item) => {
      const m = pozycjaOkna(item, { width, depth, wnekaSwiat });
      if (!m) return null;
      const { szer, wys } = rozmiarWMetrach(item.size);
      const srodekY = m.srodek[1] + Y0; // punkt z Model.js jest w układzie korzenia
      return {
        srodek: m.srodek,
        kat: m.kat,
        szer,
        wys,
        dol: srodekY - (wys / 2) * JEDN_Y,
        gora: srodekY + (wys / 2) * JEDN_Y,
      };
    })
    .filter(Boolean);

  return (
    <group name="wymiary">
      {/* szerokość - przed ścianą przednią, przy gruncie */}
      <Miarka
        od={[liniaX, Y0, -polSzer]}
        koniec={[liniaX, Y0, polSzer]}
        kreska={[0.1, 0, 0]}
        tekst={`szer. ${cm(width)}`}
        odnosniki={[
          [
            [polGl, Y0, -polSzer],
            [liniaX, Y0, -polSzer],
          ],
          [
            [polGl, Y0, polSzer],
            [liniaX, Y0, polSzer],
          ],
        ]}
      />

      {/* głębokość - z boku, przy gruncie */}
      <Miarka
        od={[-polGl, Y0, liniaZ]}
        koniec={[polGl, Y0, liniaZ]}
        kreska={[0, 0, 0.1]}
        tekst={`gł. ${cm(depth)}`}
        odnosniki={[
          [
            [-polGl, Y0, polSzer],
            [-polGl, Y0, liniaZ],
          ],
          [
            [polGl, Y0, polSzer],
            [polGl, Y0, liniaZ],
          ],
        ]}
      />

      {/* wysokość ściany - na narożniku przednim */}
      <Miarka
        od={[liniaX - ODSUNIECIE / 2, Y0, liniaZ - ODSUNIECIE / 2]}
        koniec={[liniaX - ODSUNIECIE / 2, gora, liniaZ - ODSUNIECIE / 2]}
        kreska={[0.07, 0, 0.07]}
        tekst={`wys. ${height} cm`}
        odnosniki={[
          [
            [polGl, gora, polSzer],
            [liniaX - ODSUNIECIE / 2, gora, liniaZ - ODSUNIECIE / 2],
          ],
        ]}
      />

      {/* wiata - dorysowana w przedłużeniu tej miarki bryły, którą wydłuża,
          żeby czytało się to jak jeden ciąg wymiarowy */}
      {miarkaWiaty && <Miarka {...miarkaWiaty} />}

      {/* wnęka - szerokość przed licem ściany, głębokość na jej posadzce */}
      {miarkiWneki &&
        miarkiWneki.map((m, i) => <Miarka key={`w-${i}`} {...m} />)}

      {bramy.map((b, i) => (
        <MiarkiElementu key={`b-${i}`} {...b} />
      ))}
      {drzwi.map((d, i) => (
        <MiarkiElementu key={`d-${i}`} {...d} />
      ))}
      {okienka.map((o, i) => (
        <MiarkiElementu key={`o-${i}`} {...o} />
      ))}
    </group>
  );
}
