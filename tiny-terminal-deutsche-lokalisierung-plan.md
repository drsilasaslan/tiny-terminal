# Plan: Tiny Terminal komplett auf Deutsch umstellen

## Ziel
Die App soll die komplette Oberflaeche und Reaktionen in deutscher Sprache ausgeben.
Technischer Rahmen bleibt: bestehender Code auf Basis von `web/index.html` + `web/js/*.js`.

---

## 1) Ist-Zustand analysieren

1.1 Strings erfassen
- Alle statischen Texte in `web/index.html` und `web/js/terminal-shell.js`, `web/js/terminal-content.js` inventarisieren.
- Prioritaet:
  - Meta-Texte in `<head>`
  - In-Game-Hilfetexte (`help`, `animals`, `vehicles` etc.)
  - Standard-Responses (Gibberish, Errors, Begruessung, Herausforderungen)
  - Witze, Zahlen-Responses, Emoji-Hilfen
  - Prompt-Texte und UI-Labels

1.2 Datenobjekte identifizieren
- `animals`, `vehicles`, `colors`, `letterAnimals`, `challenges`, `numberComparisons`
- `isKnownWord` / Kommandosammlung
- ASCII-/Soundantworten

1.3 Eingabeverhalten
- Prompt text (`type here>`) in UI
- Fokus-Handling und Click-to-focus Verhalten

---

## 2) Zielbild (deutsches Verhalten)

2.1 Funktional bleibt gleich
- Keinen Kern-Flow aendern: gleiche Kommandos, gleiche Logik, gleiche Reihenfolge.

2.2 Sprachwechsel komplett auf Deutsch
- Alles, was an Nutzer ausgegeben wird, ist deutsch.
- Nur technische Keys/Interna bleiben englisch (`cat`, `dog`, etc.) fuer Mapping.

2.3 Kompatibilitaet
- Bestehende englische Nutzereingaben weiter unterstuetzen (z. B. `help`, `animals`, `hello`).
- Gleichzeitig deutsche Aliase einfuehren (`hilfe`, `tiere`, `fahrzeuge`, `farben`, `farben`, `klar`, `loeschen`, `zuruecksetzen`).

---

## 3) Technischer Ansatz

3.1 Internationalisierung via kleines Dictionary
- Neue Datei: `web/js/terminal-i18n-de.js`
- Struktur:
  - `const t = { ... }` oder `window.I18N = { ... }`
  - Funktion `tt(key, fallback)` fuer sichere Textausgabe

3.2 Zentraler Uebersetzungs-Layer
- Alle hartkodierten Strings in Skript auf `tt('key')` umstellen.
- Kritische Stellen:
  - `window._showWelcome`
  - `handleCommand`-Ausgaben (alle `addOutput(...)` und `addLine`-Hinweise)
  - `challenges` Texte
  - `jokes`-Array
  - `numberComparisons`
  - `gibberishResponses`
  - `isKnownWord` Command-Sets

3.3 Command-Normierung erweitern
- Eingabe normalisieren:
  - `trim().toLowerCase()` beibehalten
  - optional Umlaute behandeln (`ä->ae`, `ö->oe`, `ü->ue`, `ß->ss`) fuer robustere Treffer bei schwierigen Tastaturen.

---

## 4) Konkrete Dateien und Aenderungsschritte

### Schritt 4.1 `web/index.html`
- Meta- und Titeltexte in Deutsch
  - `<title>`, `meta description`, OpenGraph/Twitter-Texte
  - `lang` Attribut auf `de`
- Optional: neue `<meta name="language" content="de">`

### Schritt 4.2 `web/js/terminal-shell.js`
- Welcome-Text in Deutsch (falls textuell enthalten, aktuell hauptsächlich Art/Emojis)
- Ausgabe und Stiltexte via i18n-Funktion nutzen

### Schritt 4.3 `web/js/terminal-content.js`
- Diese Datei bisher fuer neue Tiere/Fahrzeuge genutzt; nicht aendern an Datenlogik, nur optional neue DE-Namen ergänzen.
- Entweder `tt('animals.dolphin.name')` etc. in Ausgabe nutzen oder Mapping beim Rendern:
  - key bleibt `dolphin`, Anzeige z.B. `tt('animalNames.dolphin')`

### Schritt 4.4 Hauptskript in `web/index.html`
- Alle Kommandosprache ins Deutsche ueberfuehren:
  - `isKnownWord` um neue deutsche Keys erweitern
  - `help`/`hilfe`
  - `joke`/`jokes`/`lustiges`/`witz`
  - `dance`/`party` -> `tanzen`
  - `magic`/`zauber`/`abrakadabra`
  - `rainbow`/`regenbogen`
  - `robot`/`beep` -> `roboter`
  - `numbers`/`zahlen`
  - `letters`/`buchstaben`
  - `clear`/`clear` + `clear`-Aliases wie `loeschen`, `zuruecksetzen`
- Alle Ausgabe-Texte auf `tt(...)` umstellen.

### Schritt 4.5 Neues Mapping fuer Ausgabe der Kommandos
- Bei `animals` und `vehicles` statt `map(a => `${emoji} ${a}`)`:
  - Key anzeigen + deutsches Label, z.B. `🐬 ${tt('animalNames.dolphin')}`.

### Schritt 4.6 Jokes & Challenges lokalisiert
- `challenges` Texte komplett uebersetzen.
- `jokes` in klaren, kurzen deutschen Wortlauten.

---

## 5) Konkrete Content-Liste fuer `tt`-Keys (Beispiel)

- `app.title` -> "Tiny Terminal"
- `command.help.de` -> "HILFE"
- `response.hello` -> "Hallo!"
- `response.unknown` -> "Ich habe das nicht verstanden..."
- `response.clear` -> "Eingabebereich geleert!"
- `ui.prompt` -> "tippe hier> "
- `commands.helpLineAnimals` -> "Tiere"
- `commands.helpLineVehicles` -> "Fahrzeuge"
- `commands.helpLineColors` -> "Farben"
- `responses.challenges.correct` -> "Richtig! Super!"
- `responses.gibberishFallback` -> "Deine Eingabe ist unkonventionell..."

---

## 6) Akzeptanzkriterien (Definition of Done)

1. Alle sichtbaren Texte sind deutsch (UI + Spielantworten + Warnings + Hilfetexte).
2. Englische Kommandos funktionieren weiterhin als Alt-Option.
3. Neue deutsche Kommandos (`hilfe`, `tiere`, `fahrzeuge`, `farben`, `klar`, `loeschen`) funktionieren.
4. Keine offensichtlichen Encoding-/Zeilenumbruchsfehler bei ASCII-Art.
5. App baut und laeuft auf Android + iOS Emulator wie gehabt.

---

## 7) Build- und Deploy-Schritte

1. `cd /Users/drsilas.eth/CascadeProjects/bullshitbingoprojects/mobile-app-temirnal/mobile`
2. `npx cap sync`
3. Android: `npx cap run android --target OtongoFun_Pixel7_API35`
4. iOS: `npx cap run ios --target E2A86D4E-3A81-4708-B3C4-37DD8E0B91C0`
5. APK ablegen: `mobile-app-temirnal/dist/tiny-terminal.apk`

---

## 8) Aufwandsschätzung

- String-Inventur und i18n-Grundstruktur: ca. 20-30 min
- Kommandos + Antworten uebersetzen: ca. 45-60 min
- Umsetzung im Code: ca. 45 min
- Test in Emulator + Korrekturen: ca. 30-45 min

Gesamt: ca. 2-2.5 Stunden

---

## 9) Reihenfolge fuer Umsetzung

1. i18n-Datei bauen
2. `isKnownWord` + Kommandosprache anpassen
3. Hauptausgaben (`addOutput`, `help`, Challenges, jokes, Zahlenantworten) auf `tt` umstellen
4. Meta/Title + Prompt + Hilfetexte
5. Tiere/Fahrzeuge-Labels auf deutsch in Listen anzeigen
6. Build + Start auf Emulatoren
7. Kurztest: 10 neue Eingaben in beiden Emulatoren testen
