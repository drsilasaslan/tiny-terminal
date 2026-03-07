# Detaillierter Plan: Deutsch als Primärsprache + deutsches Eingabe-Matching

## Ziel
Die App soll Antworten/Interaktion konsequent auf Deutsch ausgeben und deutsche Eingaben wie `katze`, `katzen`, `flugzeug`, `fahrerzeuge` etc. als gültige Kommandos/Antworten erkennen, während englische Eingaben weiterhin funktionieren.

## Ist-Analyse (Stand jetzt)
- Die App rendert aktuell die Logik in `mobile-app-temirnal/mobile/android/app/src/main/assets/public/index.html`.
- `terminal-shell.js` und `terminal-content.js` liefern das Welcome/ASCII und ergänzen die Daten-Objekte.
- Einige Antwort- und Erkennungsdaten sind auf Englisch kodiert, z. B.:
  - Challenges (`answer: 'cat'`, `'red'`, ...)
  - Eingabe-Erkennung für bekannte Wörter (`isKnownWord`) ohne durchgängige deutsche Alias-Einträge.

## Umsetzungsziele
1. Primäre Sprachlage im Terminal-Output auf Deutsch lassen.
2. Eingaben in Deutsch erkennen, ohne bestehende englische Eingaben kaputt zu machen.
3. Herausforderungen (`challenges`) sollten deutsche Antworten akzeptieren.
4. Ausgabe bei Listen (`animals`, `vehicles`, `colors`, Hilfe) klar in deutscher Sprache.

## Technische Änderungen

### A) zentrale Synonym-/Alias-Schicht einführen
- In `index.html` neue Funktion anlegen:
  - `normalizeInput(text)` (trim + lowercase + vereinheitlichte Groß-/Kleinschreibung).
  - `canonicalCommand(raw)` (deutsche Begriffe auf interne Standard-Keys mappen).
- Mapping-Objekt `deAliasMap`:
  - Tiere: `katze->cat`, `hund->dog`, `frosch->frog`, `schlange->snake`, `hummer->lobster`, `hase->rabbit`, `delfin->dolphin` usw.
  - Fahrzeuge: `flugzeug->airplane`, `lkw->truck`, `zug->train`, `hubschrauber->helicopter`, `boot->boat`, `auto->car`, `kran->crane`, etc.
  - Farben: `rot->red`, `blau->blue`, ...
  - Kommandos: `hilfe->help`, `tiere->animals`, `fahrzeuge->vehicles`, `farben->colors`, `lustig->funny`, `witz->joke`, `farben->colours`, `buchtaben->letters`, `zahlen->numbers`, `loeschen/clear/cls`.

### B) Challenge-Validierung auf Canonicalisierung umstellen
- Bei `pendingChallenge` in `handleCommand` nicht mehr direkt `answers.includes(lower)`.
- Vergleich auf `answers.map(canonicalCommand).includes(canonical)`.
- `challenges`-Antworten mit deutschen Varianten erweitern, z. B. `['cat', 'katze']`.

### C) isKnownWord robust gegen deutsche Eingaben machen
- Vorbestehendes Set ergänzen bzw. auf Canonicalisierung basieren.
- Einfache Wörter via `animals/vehicles/colors`-Objekte nach Canonicalisierung prüfen.
- Beispiel:
  - `cat/katze` -> `animals[canonical]` true
  - `rot` -> `colors[canonical]` true

### D) Ausgaben vollständig auf Deutsch konsolidieren
- Bereits vorhandene deutsche Texte vereinheitlichen (insb. ggf. verbleibende Mischtexte):
  - Begrüßung/Willkommen, Fehler (`Gib bitte etwas ein`), Challenge-Erfolg, Hilfetexte.
- Hints/Antworten in Challenges bleiben deutsch.

### E) Kompatibilität sicherstellen
- Englische Kommandos unverändert weiter akzeptieren.
- `terminal-content.js` bleibt Quelle für zusätzliche Tiere/Fahrzeuge.
- Keine Funktionsänderung der Spiel-Mechanik außer Erkennungslogik.

## Umsetzungsschritte
1. `mobile-app-temirnal/mobile/android/app/src/main/assets/public/index.html` öffnen.
2. `canonicalize`-Funktionen + `deAliasMap` oberhalb von `isKnownWord` einfügen.
3. `isKnownWord` auf Canonicalisierung umstellen.
4. `pendingChallenge`-Abgleich auf canonicalisierte Antworten umsetzen.
5. `challenges` um deutsche Antwort-Alternativen ergänzen.
6. Hilfetexte/Listenausgaben ggf. nach deutscher Form nachziehen.
7. (Optional) `terminal-shell.js` nicht strukturell ändern, nur auf Sprachkonsistenz prüfen.

## Testplan
- Eingaben testen:
  - `katze`, `hund`, `rot`, `flugzeug`, `tiere`, `fahrzeuge`, `zahlen`, `buchstaben`, `hallo`, `hilfe`, `witz`
  - Mischfälle: `rot` als farbe und `roT` (Fallback via lowercase).
- Challenge-Tests:
  - Herausforderung Tier mit Emoji `🐱` + Antwort `katze`
  - Herausforderung Farbe mit Emoji `🔴` + Antwort `rot`

## Deployment
1. `cd mobile-app-temirnal/mobile`
2. `npx cap sync`
3. `npx cap run android --target <aktive AVD-ID>`

## Erfolgskriterien
- Deutsche Eingaben liefern erwartete Inhalte statt unbekannt/gibberish.
- Herausforderungen akzeptieren deutsche Antworten.
- Englische Eingaben bleiben kompatibel.

## Ausführungshandbuch (für diese Umstellung)
- 1. Alias-Schicht aktivieren:
  - `commandAliases` in der Datei auf `terminal`-Frontend-Ebene erweitert.
  - `canonicalize()` nutzt Normalisierung (Lowercase, Umlaut-Normalisierung, Satzzeichen).
- 2. Erkennungslogik auf Canonicalisierung umstellen:
  - `isKnownWord(...)` verwendet jetzt intern `canonicalize(...)`.
  - `pendingChallenge` vergleicht Antworten nach Canonicalisierung.
- 3. Eingabepfade zentralisieren:
  - `handleCommand(...)` prüft jetzt auf `canonical` statt auf Roh-Input.
  - Tiere/Fahrzeuge/Farben/Listen/Kommandos laufen über canonicalisierte Schlüssel.
- 4. Deutsche Kommandos auflösen:
  - `hallo`, `hilfe`, `witz`, `farben`, `tiere`, `fahrzeuge`, `zahlen`, `buchstaben`, `loeschen`, `mein name ist`, `ich bin`, etc.
- 5. Abschlusscheck:
  - Eingaben wie `katze`, `rot`, `flugzeug` (oder ähnliche Synonyme, falls ergänzt) werden korrekt verarbeitet.
  - Sprach-Feedback ist deutsch und Challenges akzeptieren deutsch benannte Antworten.
