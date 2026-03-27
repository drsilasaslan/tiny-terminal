# Android + iOS Umsetzungsplan für `tiny-terminal`

Stand: 2026-03-07

## 1) Ausgangsanalyse (bestehendes Projekt)

Das geklonte Projekt besteht aus einer einzelnen HTML-Datei mit vollständiger Game-Logik:

- Offline-fähiger Browser-Terminall-Input mit POSITIVEM Feedback auf fast alle Eingaben
- Tiere, Fahrzeuge, Farben, Buchstaben- und Zahlenlogik in reinem JS
- Gibberish/Challenge-Mechanik
- Stil- und Darstellung über CSS im selben File
- externe Dependencies: nur Google Font (`JetBrains Mono`)
- kein Backend

Für App-Portierung eignet sich das als statische Web-UI, die wir per WebView-Wrapper einbetten.

## 2) Technische Entscheidung: Capacitor (Multi-Platform)

Empfohlenes Framework: **Capacitor** als leichter Wrapper.

Warum:

- minimaler Rewrite-Aufwand (bestehende Logik bleibt erhalten)
- Android + iOS aus derselben Web-App
- klare Trennung von Web-Inhalt und nativen Plattformprojekten
- später optional native Erweiterungen (Vibration, TTS, Fullscreen, Safe Area)

## 3) Zielstruktur (für beide Plattformen)

```text
mobile-app-temirnal/
  README.md
  LICENSE
  social-preview.png
  web/
    index.html
    social-preview.png
    (später: css/js/assets separat auslagern)
  mobile/
    package.json
    capacitor.config.json
    android/     (von Capacitor erzeugt)
    ios/         (von Capacitor erzeugt)
  android-app-plan.md  (Projektplan / Status)
```

## 4) Umsetzung (sogleich für beide Plattformen)

### Phase 1 – Projektstruktur + Web-Basis fixen

1. `mobile-app-temirnal/web/` vorbereiten
   - `index.html` in `web/index.html` bereitstellen
   - optional: `social-preview.png` ebenfalls kopieren
2. Offline-Sicherheits-Check im HTML
   - externe Font-URL entfernen (später lokal oder systemseitig ersetzen)
   - keine externen JS-/CSS-Calls beibehalten

### Phase 2 – Capacitor-Bootstrap (sowohl Android als auch iOS)

1. In `mobile-app-temirnal/mobile/` `npm`-Projekt anlegen
   - `package.json` mit `@capacitor/core`, `@capacitor/android`, `@capacitor/ios`, `@capacitor/cli`
2. `capacitor.config.json` anlegen
   - `appId`, `appName`, `webDir: "../web"`, `bundledWebRuntime: false`
3. `npx cap add android`
4. `npx cap add ios`
5. `npx cap sync`

Nach diesem Schritt existieren beide Plattform-Projekte parallel.

### Phase 3 – iOS- und Android-spezifische Feinschliffe

- Android
  - `MainActivity`-/Manifest-Defaults prüfen
  - Back-Handling, Splashscreen, App-Icon
  - ggf. Edge-to-Edge/Inset-Handling
- iOS
  - `info.plist` prüfen (Status-Strings nur falls nativ genutzt)
  - Launch Screen, App-Icon, Storyboard/Safe-Area
  - Xcode-Build auf kompatiblen Simulator-Geräten prüfen

### Phase 4 – Native Komfort-Features via Plugins (optional)

- Vibration bei Erfolgs-Events
- TextToSpeech bei Begrüßung oder Challenges
- Sounds später als lokale Assets (statt textlicher Sound-Hinweise)

Implementierung über Capacitor-Plugin-Rufe mit JS-Fallback, damit Web-Version weiterhin läuft.

## 5) Build- und Release-Flow

- Android: `npm run sync` + `npx cap run android`
- iOS: `npm run sync` + `npx cap run ios`
- Release-Pfade:
  - Android App Bundle (Play Console)
  - Xcode Archive (App Store)

## 6) Qualitätssicherung

- Offline-Verhalten testen (ohne Netz)
- Eingaben unter allen Kernpfaden:
  - `animals`, `vehicles`, `colors`, `letters`, `numbers`, `clear`, `help`, Gibberish + Challenge
- Große Eingaben / Sonderzeichen
- Portrait-Betrieb, On-Screen-Keyboard, Fokusverhalten
- Performance (Frame-Drops bei Emoji-Flood/ASCII-Ausgaben)
- Plattformvergleich Android vs. iOS auf mindestens je einem Gerät/Simulator

## 7) Risiken

- WebView-Rendering-Unterschiede zwischen Android/iOS
- externe Font-URL blockiert Offline-Nutzung, daher lokal/fallback-basiert lösen
- zu große Terminal-Historie kann Mobile-Memory beeinflussen
- iOS Build/Signing/Developer-Account erfordert zusätzliche Umgebungsvoraussetzungen

## 8) Empfehlungen für jetzt

- Nicht zuerst native Compose/SwiftUI portieren.
- Erst Capacitor-MVP mit Android + iOS parallel hochziehen.
- Danach: native Komfortfeatures in kleinen Iterationen.
