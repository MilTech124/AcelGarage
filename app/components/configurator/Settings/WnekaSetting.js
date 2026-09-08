import React, { useEffect } from "react";
import { Select, InputLabel, FormControl, MenuItem, Slider } from "@mui/material";
import { variable } from "../Variable";
import { wnekaWSwiecie } from "../WallGeometry";
import { toast } from "react-toastify";

/*
  Wnęka - otwarte wcięcie w bryle garażu (dach zostaje nad nią pełny).
  Strony nazywamy tak, jak widzi je klient (przód = ściana z bramami), identycznie
  jak przy drzwiach i oknach - dzięki temu kolizje sprawdzamy porównaniem nazw,
  a przeliczeniem na osie modelu (obracane przy spadach) zajmuje się WallGeometry.
*/
function WnekaSetting({ selectedOptions, setSelectedOptions }) {
  const {
    wneka,
    wnekaSide,
    wnekaWidth,
    wnekaDepth,
    wnekaAnchor,
    width,
    depth,
    door,
    window: okna,
  } = selectedOptions;

  // elementy stojące na ściankach wnęki (trzymamy je w tych samych tablicach co
  // pozostałe drzwi i okna, żeby wycena i model nie musiały znać dwóch list)
  const naWnece = (el) => String(el.position).startsWith("wnęka");
  const drzwiWneki = door.map((d, i) => ({ el: d, i })).filter(({ el }) => naWnece(el));
  const oknaWneki = okna.map((o, i) => ({ el: o, i })).filter(({ el }) => naWnece(el));

  // długość ścianki, po której przesuwamy element
  const dlugoscScianki = (pozycja) =>
    pozycja === "wnęka tył" ? wnekaWidth : wnekaDepth;
  const opisScianki = (pozycja) =>
    pozycja === "wnęka tył"
      ? "od lewej krawędzi wnęki"
      : "od lica ściany w głąb wnęki";

  // nowy element stawiamy za tymi, które już stoją na ściance tylnej,
  // żeby nie wylądował dokładnie na poprzednim
  const wolneMiejsce = (szerokoscElementu) => {
    const zajete = [...drzwiWneki, ...oknaWneki]
      .filter(({ el }) => el.position === "wnęka tył")
      .reduce(
        (koniec, { el }) =>
          Math.max(koniec, el.positionValue + (el.size === "80x60" ? 80 : 100)),
        0
      );
    return Math.min(zajete, Math.max(0, (wnekaWidth - szerokoscElementu) * 100));
  };

  const dodaj = (co) => {
    if (co === "door") {
      if (door.length >= 4) {
        toast.error("Maksymalnie 4 drzwi w całym garażu");
        return;
      }
      setSelectedOptions({
        ...selectedOptions,
        door: [
          ...door,
          {
            size: "100x190",
            type: "lewe",
            color: "Złoty Dąb Jasny",
            direction: "poziom",
            embosse: "wąskie",
            position: "wnęka tył",
            positionValue: wolneMiejsce(1),
          },
        ],
      });
      toast.success("Dodano drzwi we wnęce");
    } else {
      setSelectedOptions({
        ...selectedOptions,
        window: [
          ...okna,
          { size: "80x60", position: "wnęka tył", positionValue: wolneMiejsce(0.8) },
        ],
      });
      toast.success("Dodano okno we wnęce");
    }
  };

  const usun = (co) => {
    const lista = co === "door" ? drzwiWneki : oknaWneki;
    if (!lista.length) return;
    const idx = lista[lista.length - 1].i;
    const klucz = co === "door" ? "door" : "window";
    const zrodlo = co === "door" ? door : okna;
    setSelectedOptions({
      ...selectedOptions,
      [klucz]: zrodlo.filter((_, i) => i !== idx),
    });
  };

  const zmienElement = (co, idx, zmiana) => {
    const klucz = co === "door" ? "door" : "window";
    const zrodlo = co === "door" ? door : okna;
    setSelectedOptions({
      ...selectedOptions,
      [klucz]: zrodlo.map((el, i) => (i === idx ? { ...el, ...zmiana } : el)),
    });
  };

  const przodTyl = wnekaSide === "przod" || wnekaSide === "tył";
  // ściana, w której robimy wnękę, i wymiar prostopadły (na głębokość)
  const dlugoscSciany = przodTyl ? width : depth;
  const glebokoscMax = przodTyl ? depth : width;

  const szerokosci = variable.wnekaWidth.filter((w) => w <= dlugoscSciany);
  const glebokosci = variable.wnekaDepth.filter((g) => g <= glebokoscMax - 1);
  // wnęka stoi w narożniku, więc ścianka dzieląca istnieje tylko wtedy,
  // gdy nie zajmuje całej ściany
  const jestSciankaBoczna = wnekaWidth < dlugoscSciany - 0.01;

  // Zajęte fragmenty ściany (metry, współrzędna świata wzdłuż ściany) - wzory
  // takie same jak w Model.js, żeby ostrzeżenie zgadzało się z tym, co widać.
  // Liczymy zawsze na stanie PO zmianie (o), inaczej blokada trzymałaby wnękę
  // na ścianie z bramą także wtedy, gdy użytkownik chce się z niej przenieść.
  const bramy = (o) => {
    if (o.wnekaSide !== "przod") return [];
    const out = [];
    for (let i = 1; i <= o.gateCount; i++) {
      const gw = o["gateWidth" + i];
      const gp = o["gatePositionValue" + i];
      if (!gw) continue;
      const srodek = (o.width - gw) * 0.5 - gp / 100;
      out.push({ od: srodek - gw / 2, do: srodek + gw / 2, co: "brama " + i });
    }
    return out;
  };

  const drzwiOkna = (o) => {
    const out = [];
    o.door.forEach((d, i) => {
      if (d.position !== o.wnekaSide) return;
      const s =
        d.position === "przod"
          ? (o.width < 5 ? (2.82 * o.width) / 6 : (2.92 * o.width) / 6) -
            d.positionValue / 100
          : d.position === "tył"
          ? (-2.91 * o.width) / 6 + d.positionValue / 100
          : d.position === "prawo"
          ? (2.86 * o.depth) / 6 - d.positionValue / 100
          : (2.86 * o.depth) / 6 - d.positionValue / 100 - (0.6 * o.width) / 6;
      out.push({ od: s - 0.5, do: s + 0.5, co: "drzwi " + (i + 1) });
    });
    o.window.forEach((w, i) => {
      if (w.position !== o.wnekaSide) return;
      const s =
        w.position === "przod" || w.position === "tył"
          ? (o.width >= 6 ? (2.7 * o.width) / 6 : (2 * o.width) / 6) -
            w.positionValue / 100
          : (o.depth <= 6 ? (-2.4 * o.depth) / 6 : (-2.7 * o.depth) / 6) +
            w.positionValue / 100;
      out.push({ od: s - 0.4, do: s + 0.4, co: "okno " + (i + 1) });
    });
    return out;
  };

  // Zakres wnęki wzdłuż ściany w tych samych współrzędnych co bramy i drzwi -
  // liczony tą samą funkcją co geometria, żeby kolizje zgadzały się z modelem.
  const zakresWneki = (o) => {
    const W = wnekaWSwiecie(o);
    if (!W) return { od: 0, do: 0 };
    return { od: Math.min(W.c0, W.c1), do: Math.max(W.c0, W.c1) };
  };

  const koliduje = (lista, opcje) => {
    const { od, do: doo } = zakresWneki(opcje);
    return lista.filter((e) => e.od < doo && e.do > od);
  };

  // zmiana z walidacją: brama we wnęce nie ma sensu, drzwi i okna tylko sygnalizujemy
  const zmien = (zmiana) => {
    const next = { ...selectedOptions, ...zmiana };
    if (!next.wneka) {
      next.door = next.door.filter((d) => !naWnece(d));
      next.window = next.window.filter((o) => !naWnece(o));
    }
    if (next.wneka) {
      const blokady = koliduje(bramy(next), next);
      if (blokady.length) {
        toast.error("Wnęka zachodzi na: " + blokady.map((e) => e.co).join(", "));
        return;
      }
      const ostrzezenia = koliduje(drzwiOkna(next), next);
      if (ostrzezenia.length) {
        toast.warn("Sprawdź ustawienie: " + ostrzezenia.map((e) => e.co).join(", "));
      }
    }
    setSelectedOptions(next);
  };

  // po zmianie wymiarów garażu wnęka musi się zmieścić w ścianie
  useEffect(() => {
    if (!wneka) return;
    const maxSzer = szerokosci.length ? Math.max(...szerokosci) : 0;
    const maxGleb = glebokosci.length ? Math.max(...glebokosci) : 0;
    const nowaSzer = Math.min(wnekaWidth, maxSzer);
    const nowaGleb = Math.min(wnekaDepth, maxGleb);
    // po zwężeniu wnęki jej drzwi i okna muszą zmieścić się na krótszej ściance,
    // a przy wnęce na całą ścianę nie ma już ścianki bocznej - wracają na tylną
    const bokZostaje = nowaSzer < dlugoscSciany - 0.01;
    const przytnij = (lista, szerokoscElementu) =>
      lista.map((el) => {
        if (!naWnece(el)) return el;
        const pozycja = !bokZostaje && el.position === "wnęka bok" ? "wnęka tył" : el.position;
        const dlugosc = pozycja === "wnęka tył" ? nowaSzer : nowaGleb;
        const max = Math.max(0, (dlugosc - szerokoscElementu) * 100);
        const wartosc = Math.min(el.positionValue, max);
        return pozycja !== el.position || wartosc !== el.positionValue
          ? { ...el, position: pozycja, positionValue: wartosc }
          : el;
      });
    const noweDrzwi = przytnij(door, 1);
    const noweOkna = przytnij(okna, 0.8);
    const zmienioneElementy =
      noweDrzwi.some((d, i) => d !== door[i]) ||
      noweOkna.some((o, i) => o !== okna[i]);

    if (nowaSzer !== wnekaWidth || nowaGleb !== wnekaDepth || zmienioneElementy) {
      setSelectedOptions({
        ...selectedOptions,
        wnekaWidth: nowaSzer,
        wnekaDepth: nowaGleb,
        door: noweDrzwi,
        window: noweOkna,
      });
    }
  }, [
    wneka,
    width,
    depth,
    wnekaSide,
    wnekaWidth,
    wnekaDepth,
    wnekaAnchor,
    door,
    okna,
  ]);

  return (
    <div className="py-2">
      <h4 className="bg-slate-900 p-2">Wnęka</h4>
      <div className="flex flex-wrap items-center">
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel>Wnęka</InputLabel>
          <Select
            value={wneka}
            label="Wnęka"
            onChange={(e) => zmien({ wneka: e.target.value })}
          >
            <MenuItem value={false}>Nie</MenuItem>
            <MenuItem value={true}>Tak</MenuItem>
          </Select>
        </FormControl>

        {wneka && (
          <>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel>Strona</InputLabel>
              <Select
                value={wnekaSide}
                label="Strona"
                onChange={(e) => zmien({ wnekaSide: e.target.value })}
              >
                <MenuItem value={"przod"}>Przód</MenuItem>
                <MenuItem value={"tył"}>Tył</MenuItem>
                <MenuItem value={"lewo"}>Lewo</MenuItem>
                <MenuItem value={"prawo"}>Prawo</MenuItem>
              </Select>
            </FormControl>

            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel>Szerokość</InputLabel>
              <Select
                value={wnekaWidth}
                label="Szerokość"
                onChange={(e) => zmien({ wnekaWidth: e.target.value })}
              >
                {szerokosci.map((w) => (
                  <MenuItem key={w} value={w}>
                    {w} m
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel>Głębokość</InputLabel>
              <Select
                value={wnekaDepth}
                label="Głębokość"
                onChange={(e) => zmien({ wnekaDepth: e.target.value })}
              >
                {glebokosci.map((g) => (
                  <MenuItem key={g} value={g}>
                    {g} m
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl variant="standard" sx={{ m: 1, minWidth: 160 }}>
              <InputLabel>Narożnik</InputLabel>
              <Select
                value={wnekaAnchor}
                label="Narożnik"
                onChange={(e) => zmien({ wnekaAnchor: e.target.value })}
              >
                <MenuItem value={"lewa"}>Przy lewym narożniku</MenuItem>
                <MenuItem value={"prawa"}>Przy prawym narożniku</MenuItem>
              </Select>
            </FormControl>

            {/* drzwi i okna na ściankach wnęki */}
            <div className="w-full bg-slate-300 rounded-md p-2 mt-2">
              <div className="flex flex-wrap gap-6 items-center">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-800">
                    Drzwi we wnęce: {drzwiWneki.length}
                  </span>
                  <button
                    className="bg-slate-900 text-white px-2 rounded-md"
                    onClick={() => usun("door")}
                  >
                    -
                  </button>
                  <button
                    className="bg-slate-900 text-white px-2 rounded-md"
                    onClick={() => dodaj("door")}
                  >
                    +
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-800">
                    Okna we wnęce: {oknaWneki.length}
                  </span>
                  <button
                    className="bg-slate-900 text-white px-2 rounded-md"
                    onClick={() => usun("window")}
                  >
                    -
                  </button>
                  <button
                    className="bg-slate-900 text-white px-2 rounded-md"
                    onClick={() => dodaj("window")}
                  >
                    +
                  </button>
                </div>
              </div>

              {[
                ...drzwiWneki.map((x) => ({ ...x, co: "door" })),
                ...oknaWneki.map((x) => ({ ...x, co: "window" })),
              ].map(({ el, i, co }) => (
                <div
                  key={co + i}
                  className="flex flex-wrap gap-2 items-end bg-slate-200 rounded-md p-2 mt-2"
                >
                  <span className="text-xs w-full text-slate-700">
                    {co === "door" ? "Drzwi" : "Okno"}
                  </span>
                  <FormControl variant="standard" sx={{ minWidth: 110 }}>
                    <InputLabel>Ścianka</InputLabel>
                    <Select
                      value={el.position}
                      label="Ścianka"
                      onChange={(e) =>
                        zmienElement(co, i, {
                          position: e.target.value,
                          positionValue: 0,
                        })
                      }
                    >
                      <MenuItem value={"wnęka tył"}>Tylna</MenuItem>
                      {jestSciankaBoczna && (
                        <MenuItem value={"wnęka bok"}>Boczna (dzieląca)</MenuItem>
                      )}
                    </Select>
                  </FormControl>

                  {co === "door" && (
                    <>
                      <FormControl variant="standard" sx={{ minWidth: 100 }}>
                        <InputLabel>Rozmiar</InputLabel>
                        <Select
                          value={el.size}
                          label="Rozmiar"
                          onChange={(e) =>
                            zmienElement(co, i, { size: e.target.value })
                          }
                        >
                          {variable.doorSize.map((r) => (
                            <MenuItem key={r} value={r}>
                              {r}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <FormControl variant="standard" sx={{ minWidth: 90 }}>
                        <InputLabel>Typ</InputLabel>
                        <Select
                          value={el.type}
                          label="Typ"
                          onChange={(e) =>
                            zmienElement(co, i, { type: e.target.value })
                          }
                        >
                          {variable.doorType.map((t) => (
                            <MenuItem key={t} value={t}>
                              {t}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <FormControl variant="standard" sx={{ minWidth: 130 }}>
                        <InputLabel>Kolor</InputLabel>
                        <Select
                          value={el.color}
                          label="Kolor"
                          onChange={(e) => {
                            const kolor = variable.universalColours.find(
                              (c) => c.name === e.target.value
                            );
                            zmienElement(co, i, {
                              color: e.target.value,
                              colorRal: kolor ? kolor.ral : null,
                            });
                          }}
                        >
                          {variable.dooorColors.map((c) => (
                            <MenuItem key={c} value={c}>
                              {c}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </>
                  )}

                  <div className="w-full px-2">
                    <p className="text-xs text-slate-700">
                      {el.positionValue} cm {opisScianki(el.position)}
                    </p>
                    <Slider
                      value={el.positionValue}
                      min={0}
                      max={Math.max(
                        0,
                        dlugoscScianki(el.position) * 100 -
                          (co === "door" ? 100 : 80)
                      )}
                      step={10}
                      onChange={(e, v) =>
                        zmienElement(co, i, { positionValue: v })
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default WnekaSetting;
