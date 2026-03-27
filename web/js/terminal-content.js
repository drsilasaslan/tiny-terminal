(function() {
  const newAnimals = {
    'dolphin': {
      emoji: '🐬',
      art: `    .--.  _
   / .-. \
  | (O_o) |
  | /   \\|
   \'---' /
    \\___/
`,
    sound: 'Splash!'
    },
    'panda': {
      emoji: '🐼',
      art: `  /\_/\\
 ( o.o )
  > ^ <
 /|   |\
(_/\_/_)`,
      sound: 'Mmm... Bambus!'
    },
    'koala': {
      emoji: '🐨',
      art: `  (\_/)
 (o o)
  / V \
  \---/
`,
      sound: 'Koala-Stärke!'
    }
  };

  const newVehicles = {
    'bicycle': {
      emoji: '🚲',
      art: `    _o_
  _<\__
   \__
`,
    sound: 'Ring-Ring!'
    },
    'scooter': {
      emoji: '🛴',
      art: `   ___
  /   \
 /_____\\
(_o__ )`,
    sound: 'Brrrm!'
    },
    'ambulance': {
      emoji: '🚑',
      art: `   ______
 _|__|  O  
|  _    -  |
|-(_)-(_)- |
  O     O`,
    sound: 'Tut- tut!'
    }
  };

  if (typeof animals !== 'undefined' && typeof vehicles !== 'undefined') {
    Object.assign(animals, newAnimals);
    Object.assign(vehicles, newVehicles);
    return;
  }

  if (typeof window.terminalData === 'undefined') {
    window.terminalData = { animals: {}, vehicles: {} };
  }

  Object.assign(window.terminalData.animals, newAnimals);
  Object.assign(window.terminalData.vehicles, newVehicles);
})();
