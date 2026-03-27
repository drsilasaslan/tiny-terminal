# Erweiterungsplan: Tiny Terminal – Tiere/Fahrzeuge + Refactor

## Zielbild
- Die App bleibt offline und kapazitorbasiert.
- Neue Inhalte sind datengetrieben und leicht erweiterbar.
- Der bestehende Gameplay-Fokus (spielerisches Tippen, positive Rückmeldungen, Challenges) bleibt erhalten.
- Refactor macht Code wartbar und wiederverwendbar für künftige Inhalte.

## Nicht-Ziele (in dieser Iteration)
- Voller Plattform-Store-Release.
- KI-basierte Antworten.
- komplettes Rebrand/Neudesign.

## Deliverables
- 3 neue Tiere im `animals`-Set.
- 3 neue Fahrzeuge im `vehicles`-Set.
- Refactor der bisherigen monolithischen `web/index.html`.
- Dokumentierte Inhalte in separater Datenstruktur.
- Funktionsfähiger Sync auf Android und iOS.
- Neues APK in `dist/`.

## Ist-Stand
- Kernlogik läuft in einer einzigen HTML-Datei unter `web/index.html`.
- Android/iOS laden diese Datei als WebView-Asset.
- Antworten werden aktuell über JS-Objekte (`animals`, `vehicles`, `colors` usw.) und Eingabelogik im selben Script erzeugt.

## Zielarchitektur
- `web/index.html`
  - Struktur für Terminal UI.
  - Lädt CSS, Daten, Core-Engine als Module.
- `web/styles.css`
  - Alle bisherigen Styles aus der HTML ausgelagert.
- `web/data/terminal-entries.json`
  - Tiere und Fahrzeuge als strukturierte Daten.
- `web/js/terminal-data.js`
  - Hilfsdaten + Loader + normale Datenstruktur für Tiere/Fahrzeuge.
- `web/js/terminal-engine.js`
  - Eingabe-Parsing, Routing, Antwortgenerierung.
- `web/js/main.js`
  - App-Start, Event-Bindings, erste Ausgabe.

## Datenmodell (vorgeschlagen)
- Animal-Eintrag
  - `key` (String, Primärschlüssel)
  - `emoji` (String)
  - `art` (String, mehrere Zeilen)
  - `sound` (String)
  - `aliases` (Array Strings, optional)
  - `tags` (Array Strings, optional)
  - `category` (String, default `animal`)
- Vehicle-Eintrag
  - `key`
  - `emoji`
  - `art`
  - `sound`
  - `aliases`
  - `category` (String, default `vehicle`)

## Vorschlag: neue Inhalte
- Neue Tiere
  - `penguin` als bereits bestehender Kandidat? Falls vorhanden wird er erweitert oder ersetzt durch neuen Key, nicht duplizieren.
  - `dolphin`
  - `wolf`
  - `unicorn`
- Neue Fahrzeuge
  - `scooter`
  - `spaceship`
  - `steamtrain`

Hinweis: Konkrete ASCII-Assets werden im Plan als Platzhalter definiert und können nach Freigabe in echten Varianten ergänzt werden.

## Schritt-für-Schritt-Plan

1. Refactor-Grundlage
- `web/index.html` in ein schlankes Shell-Template umwandeln.
- Bestehende Inline-Styles in `web/styles.css` auslagern.
- Bestehendes Inline-JavaScript aufteilen.
- Modulstruktur mit `type="module"` in `web/index.html` einführen.
- Ziel: `web/index.html` bleibt lesbar, Logik sitzt in `web/js/*.js`.

2. Datenextraktion
- Neue Datei `web/data/terminal-entries.json` anlegen.
- Bestehende Objekte (`animals`, `vehicles`, `colors`) als JSON-Blöcke übertragen.
- Konsistente Felder erzwingen (s. Datenmodell).
- Einheitliche Funktion für Normalisierung (`trim/lowercase/schlüsselwörter`) definieren.

3. Engine-Refactor
- Neue Engine-Datei `web/js/terminal-engine.js` erstellen.
- Funktion `getAnimalByInput(input)` anhand von Key und Aliases.
- Funktion `getVehicleByInput(input)` analog.
- Bestehende Farb-/Buchstaben-/Zahlenlogik als klare Handlerfunktionen belassen.
- Zufallsantworten über zentrale Hilfsfunktion `pickRandom(list)` laufen lassen.

4. Neue Tiere und Fahrzeuge eintragen
- In JSON-Datei 3 neue Einträge ergänzen.
- Für jedes Tier/Fahrzeug:
  - `key` eindeutig halten.
  - ASCII-Art konsistent in Monospace-Format halten.
  - `sound` als Kinder-freundlicher Short-Text.
  - mindestens 2 Aliasse vorsehen (z. B. `dolphin` + `delphin` + `wal`).

5. Eingabe-Fluss anpassen
- Nach Refactor auf Reihenfolge prüfen:
  - 1) Kommandos
  - 2) Tiere
  - 3) Fahrzeuge
  - 4) Farben
  - 5) Buchstaben
  - 6) Zahlen
  - 7) Gibberish/Challenge-Fallback
- Für Tiere/Fahrzeuge ausschließlich Datenmodell nutzen, nicht mehr harte Objekte im Render-Block.

6. Optionaler Qualitäts-Reflex
- Alias-Ambiguitäten definieren:
  - Beispiel: `car`, `auto` oder `rakete` vs. bestehende Keys.
- Eingabelogik mit Regex auf Wortgrenzen und Synonyme absichern.

7. App-/Build-Integration
- `npx cap sync` nach Refactor im `mobile-app-temirnal/mobile` ausführen.
- Android-Start und Deployment: `npx cap run android --target emulator-5554`.
- iOS-Start und Deployment: `npx cap run ios --target <simulator-id> --scheme App`.

8. APK-Refresh
- Nach erfolgreichem Build `./gradlew assembleDebug` in `mobile-app-temirnal/mobile/android`.
- Ausgabe nach `/dist/tiny-terminal.apk` kopieren.

9. Tests ohne neue Infrastruktur (manuell)
- Testsatz Tiererkennung: neue Tier-Keys + Aliasse.
- Testsatz Fahrzeugerkennung: neue Vehicle-Keys + Aliasse.
- Testsatz Fallback: unbekannte Eingaben behalten Verhalten.
- Testsatz Regression: vorhandene Eingaben wie bestehende Tiere/Fahrzeuge/ Farben/Buchstaben weiterhin existent.
- Testsatz Mobile-Viewport: Scrollverhalten und Eingabefokus.

## Akzeptanzkriterien
- 3 neue Tiere sind mit eindeutiger Ausgabe sichtbar nutzbar.
- 3 neue Fahrzeuge sind mit eindeutiger Ausgabe sichtbar nutzbar.
- Keine hartkodierten tier-/fahrzeugspezifischen Blöcke mehr in `index.html`.
- Refactor-Dateien werden korrekt geladen (`styles.css`, `terminal-data.js`, `terminal-engine.js`, `main.js`).
- App startet ohne JS-Fehler auf Android-Emulator und iOS-Simulator.
- Neues APK erzeugt ohne Fehler.

## Risiken und Gegenmaßnahmen
- Risiko: Unicode/ASCII-Rückgabe bricht Zeilenlayout auf Geräten mit schmalen Fonts.
- Gegenmaßnahme: Monospace testen und fixe Zeilenumbrüche beibehalten.
- Risiko: Refactor verschiebt Seiteneffekte wie `window._showWelcome`.
- Gegenmaßnahme: Einmalige API in `terminal-init` festlegen und kompatibel halten.
- Risiko: JSON-Syntaxfehler durch lange ASCII-Strings.
- Gegenmaßnahme: Multi-Line-Strings im JSON vermeiden, stattdessen `\n` explizit nutzen.

## Zeitplan
- Tag 1: Refactor-Grundlage + Datenextraktion.
- Tag 2: Engine-Refactor + neue Inhalte ergänzen.
- Tag 3: Input-Routing + iOS/Android Sync + manuelle Verifikation.
- Tag 4: Bugfixes und APK-Output.

## Ergebnisartefakte
- `[tiny-terminal-erweiterungs-plan.md](/Users/drsilas.eth/CascadeProjects/bullshitbingoprojects/mobile-app-temirnal/tiny-terminal-erweiterungs-plan.md)`
- `[web/styles.css]`
- `[web/js/terminal-data.js]`
- `[web/js/terminal-engine.js]`
- `[web/js/main.js]`
- Aktualisiertes `[web/data/terminal-entries.json]`
- Aktualisierte `[web/index.html]`
- Neues APK: `/dist/tiny-terminal.apk`
