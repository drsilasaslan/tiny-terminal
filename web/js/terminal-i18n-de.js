window.I18N_DE = (() => {
  const translations = {
    app: {
      title: 'Tiny Terminal',
      header: 'tiny terminal',
      intro: {
        noInput: 'Bitte gib etwas ein! 🎯',
        promptLine: 'tippe hier'
      }
    },
    responses: {
      greeting: '👋 Hallo! 🖥️✨',
      challengeSuccess: 'RICHTIG! ✨🎉✨',
      countingStart: '{n} wird gezählt...',
      numberRepeat: '{emoji} x {n}',
      numberHeadline: '{n}',
      unknownLetters: '{emoji} {text}! {emoji}',
      lettersCreature: 'Deine Buchstaben haben ein Wesen geformt!',
      lettersLength: '{count} Buchstaben! {emoji}',
      upperLetter: '<span class="rainbow giant">{char}</span>',
      helpHeaderAnimals: '🐾 Tiere:',
      helpHeaderVehicles: '🚗 Fahrzeuge:',
      helpHeaderColors: '🎨 Farben:',
      helpHeaderLetters: '🔤 Buchstaben:',
      helpHeaderNumbers: '🔢 Zahlen:',
      hiReply: '👋 Hallo! 🖥️✨',
      robot: '🤖 BEEP BOOP!',
      moon: '<span class="emoji-big">🌙🌜🌛🌝</span>',
      sun: '<span class="emoji-big">☀️🌞☀️🌞</span>',
      stars: '<span class="emoji-big">⭐🌟✨💫⭐🌟✨</span>',
      rainbow: 'RAINBOW!'
    },
    status: {
      cleared: '✨ Bereit!'
    },
    labels: {
      prompt: 'type here',
      clear: 'Leeren',
      numbers: 'Zahlen',
      animals: 'Tiere',
      vehicles: 'Fahrzeuge',
      colors: 'Farben',
      letters: 'Buchstaben',
      magic: 'MAGIE!',
      cat: 'Katze',
      dog: 'Hund',
      fish: 'Fisch',
      bird: 'Vogel',
      snake: 'Schlange',
      frog: 'Frosch',
      cow: 'Kuh',
      pig: 'Schwein',
      duck: 'Ente',
      shark: 'Hai',
      dinosaur: 'Dinosaurier',
      lobster: 'Hummer',
      elephant: 'Elefant',
      monkey: 'Affe',
      bear: 'Bär',
      rabbit: 'Kaninchen',
      owl: 'Eule',
      turtle: 'Schildkröte',
      penguin: 'Pinguin',
      lion: 'Löwe',
      dolphin: 'Delfin',
      panda: 'Panda',
      koala: 'Koala',
      airplane: 'Flugzeug',
      plane: 'Flugzeug',
      truck: 'LKW',
      excavator: 'Bagger',
      rocket: 'Rakete',
      train: 'Zug',
      helicopter: 'Hubschrauber',
      bulldozer: 'Bagger',
      crane: 'Kran',
      boat: 'Boot',
      car: 'Auto',
      bus: 'Bus',
      red: 'Rot',
      blue: 'Blau',
      green: 'Grün',
      yellow: 'Gelb',
      orange: 'Orange',
      purple: 'Lila',
      pink: 'Rosa',
      black: 'Schwarz',
      white: 'Weiss',
      brown: 'Braun',
      bicycle: 'Fahrrad',
      scooter: 'Roller',
      ambulance: 'Rettungswagen',
      commands: {
        help: 'Hilfe',
        clear: 'Leeren',
        joke: 'Witz',
        party: 'Party',
        magic: 'Zauber',
        rainbow: 'Regenbogen',
        robot: 'Roboter',
        moon: 'Mond',
        sun: 'Sonne',
        stars: 'Sterne',
        animals: 'Tiere',
        vehicles: 'Fahrzeuge',
        colors: 'Farben',
        letters: 'Buchstaben',
        numbers: 'Zahlen'
      }
    },
    numberComparisons: {
      20: 'So viele Finger und Zehen hast du! 🖐️🦶',
      50: 'Das ist ein Fuenfzig-Cent-Stueck! 🪙',
      100: 'Das ist die Zehnoer-Finger-und-Zehen-Anzahl von 10 Leuten! 🦶×10',
      365: 'So viele Tage hat ein Jahr! 📅',
      999: 'Fast Tausend! 😱'
    },
    challengeHints: {
      cat: 'Welches Tier ist das?',
      dog: 'Welches Tier ist das?',
      frog: 'Welches Tier ist das?',
      snake: 'Welches Tier ist das?',
      lobster: 'Welches Tier ist das?',
      rocket: 'Was ist das?',
      airplane: 'Was ist das?',
      truck: 'Was ist das?',
      red: 'Welche Farbe?',
      blue: 'Welche Farbe?',
      green: 'Welche Farbe?',
      yellow: 'Welche Farbe?',
      fish3: 'Wie viele Fische?',
      star5: 'Wie viele Sterne?',
      apples2: 'Wie viele Aepfel?'
    },
    jokes: [
      '🤣 Warum hat der Computer geschnueffelt?<br>Er hatte einen Virus!',
      '🤣 Warum hat der schlafende Dinosaurier geruht?<br>Er war ein Dino-SNORE! 🦕💤',
      '🤣 Warum ist die Banane zum Arzt gegangen?<br>Sie hat sich nicht wohl gefuehlt! 🍌',
      '🤣 Wie nennt man einen Fisch ohne Augen?<br>Ein blinder Fisch! 🐟',
      '🤣 Wie nennt man einen Bienen-Mann ohne Zähne?<br>Gummibienen! 🐻🍬',
      '🤣 Was sagt eine Katze an Weihnachten?<br>Miau-chen Weihnachten! 🐱🎄'
    ],
    help: {
      defaultText: '⚠️ Unbekannter Befehl'
    }
  };

  const get = (key) => {
    const parts = key.split('.');
    let value = translations;
    for (const part of parts) {
      if (!value || typeof value !== 'object' || !(part in value)) return undefined;
      value = value[part];
    }
    return value;
  };

  const interpolate = (text, params = {}) => {
    if (typeof text !== 'string') return text;
    return text.replace(/\{(\w+)\}/g, (_, key) => params[key] ?? `{${key}}`);
  };

  const tt = (key, fallback = '', params = {}) => {
    return interpolate(get(key) ?? fallback, params);
  };

  const labelFor = (scope, key, fallback = key) => tt(`labels.${scope}.${key}`, fallback);

  const formatList = (collection, scope) =>
    Object.keys(collection)
      .map((key) => `${collection[key].emoji} ${labelFor(scope, key, key)}`)
      .join('  ');

  return {
    t: tt,
    labelFor,
    formatList,
    translations
  };
})();
