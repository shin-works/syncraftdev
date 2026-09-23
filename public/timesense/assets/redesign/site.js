/* Progressive enhancement: copy, navigation, FAQ and native audio work without JS. */
const messages = {
  ja: ['声をきく', '停止する', '再生できませんでした。もう一度お試しください。'],
  en: ['Listen', 'Stop', 'Could not play. Please try again.'],
  es: ['Escuchar', 'Detener', 'No se pudo reproducir. Inténtalo de nuevo.'],
  de: ['Anhören', 'Stoppen', 'Wiedergabe fehlgeschlagen. Bitte erneut versuchen.'],
  fr: ['Écouter', 'Arrêter', 'Lecture impossible. Veuillez réessayer.'],
  'pt-BR': ['Ouvir', 'Parar', 'Não foi possível reproduzir. Tente novamente.'],
  ko: ['목소리 듣기', '정지', '재생할 수 없습니다. 다시 시도해 주세요.'],
  'zh-Hant': ['聽聽聲音', '停止', '無法播放，請再試一次。'],
  'zh-Hans': ['听听声音', '停止', '无法播放，请重试。'],
};
const [listen, stop, errorMessage] = messages[document.documentElement.lang] || messages.en;
const players = [];
let requestVersion = 0;
let requestedAudio = null;
for (const card of document.querySelectorAll('.voice-item')) {
  const audio = card.querySelector('audio');
  if (!audio) continue;
  const character = [
    card.querySelector('.character-name')?.firstChild?.textContent.trim(),
    card.querySelector('.voice-scene-label')?.textContent.trim(),
  ].filter(Boolean).join(' · ') || card.dataset.character;
  const control = document.createElement('button');
  control.type = 'button';
  control.className = 'voice-control offset-button';
  const icon = document.createElement('span');
  icon.setAttribute('aria-hidden', 'true');
  const label = document.createElement('span');
  control.append(icon, label);
  const progress = document.createElement('progress');
  progress.className = 'voice-progress';
  progress.max = 1;
  progress.value = 0;
  progress.hidden = true;
  progress.setAttribute('aria-label', character);
  const status = document.createElement('span');
  status.className = 'audio-status';
  status.setAttribute('role', 'status');
  status.setAttribute('aria-live', 'polite');
  const update = () => {
    const playing = !audio.paused && !audio.ended;
    card.classList.toggle('is-playing', playing);
    icon.textContent = playing ? '■' : '▶';
    label.textContent = playing ? stop : listen;
    control.setAttribute('aria-label', `${character}: ${playing ? stop : listen}`);
    control.setAttribute('aria-pressed', String(playing));
    progress.hidden = !playing;
  };
  const reset = () => { audio.pause(); audio.currentTime = 0; update(); };
  players.push({audio, reset});
  control.addEventListener('click', async () => {
    const version = ++requestVersion;
    status.textContent = '';
    if (!audio.paused) { requestedAudio = null; reset(); return; }
    requestedAudio = audio;
    for (const player of players) if (player.audio !== audio) player.reset();
    try {
      await audio.play();
      if (version !== requestVersion) { reset(); return; }
      update();
    } catch (error) {
      if (version === requestVersion && error.name !== 'AbortError') status.textContent = errorMessage;
      update();
    }
  });
  audio.addEventListener('play', () => {
    if (requestedAudio !== audio) { reset(); return; }
    for (const player of players) if (player.audio !== audio) player.reset();
    update();
  });
  for (const event of ['pause', 'ended']) audio.addEventListener(event, update);
  audio.addEventListener('timeupdate', () => { progress.value = audio.duration ? audio.currentTime / audio.duration : 0; });
  audio.addEventListener('error', () => { status.textContent = errorMessage; update(); });
  audio.after(control, progress, status);
  audio.hidden = true;
  update();
}
document.addEventListener('visibilitychange', () => {
  if (document.hidden) { requestVersion++; requestedAudio = null; for (const player of players) player.reset(); }
});
for (const select of document.querySelectorAll('.language-toggle select')) {
  select.addEventListener('change', () => { if (select.value) location.assign(select.value); });
}

// A quiet, user-controlled illustration: no autoplay, audio, or running clock.
const timerDemo = document.querySelector('.hero-timer-control');
if (timerDemo) {
  const remaining = {
    ja: minutes => `あと${minutes}分だよ`,
    en: minutes => `${minutes} minutes left!`,
    es: minutes => `¡Quedan ${minutes} minutos!`,
    de: minutes => `Noch ${minutes} Minuten!`,
    fr: minutes => `Encore ${minutes} minutes !`,
    'pt-BR': minutes => `Faltam ${minutes} minutos!`,
    ko: minutes => `${minutes}분 남았어요!`,
    'zh-Hant': minutes => `還有 ${minutes} 分鐘！`,
    'zh-Hans': minutes => `还有 ${minutes} 分钟！`,
  };
  const stages = [30, 15, 5];
  const bubble = document.querySelector('.hero-speech');
  const initialMessage = bubble.textContent;
  const describe = remaining[document.documentElement.lang] || remaining.en;
  let stage = 0;
  timerDemo.disabled = false;
  timerDemo.addEventListener('click', () => {
    stage = (stage + 1) % stages.length;
    const minutes = stages[stage];
    timerDemo.querySelector('.timer-sector').setAttribute('stroke-dasharray', `${minutes} 60`);
    timerDemo.querySelector('.timer-readout').textContent = `${String(minutes).padStart(2, '0')}:00`;
    bubble.textContent = stage === 0 ? initialMessage : describe(minutes);
  });
}
