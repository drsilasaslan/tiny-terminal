(function() {
  const t = document.getElementById('terminal');
  window._showWelcome = function() {
    const emoji = ['🚀','🦕','🐱','🔥','⭐','🌈','💎','🎸','🦞','🐙','🎪','🌸','🍕','🎯','🐋','🦋','🌊','🎵','🍭','🐲','👾','🪐','🦈','🌻','🎨','🐸','🏀','🦄','🎃','🐧'];
    let row = '';
    for (let i = 0; i < 8; i++) row += emoji[Math.floor(Math.random() * emoji.length)];
    const hello = `<pre style="color:var(--green);font-size:13px;line-height:1.1"> _          _ _       _ \n| |__   ___| | | ___ | |\n| '_ \\ / _ \\ | |/ _ \\| |\n| | | |  __/ | | (_) |_|\n|_| |_|\\___|_|_|\\___/(_)</pre>`;
    t.innerHTML = hello + `<div class="output emoji-big celebration">${row}</div><div class="output" style="margin-bottom:8px"></div>`;
  };
})();
