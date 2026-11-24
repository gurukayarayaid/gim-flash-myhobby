/* ============================================================
   Flashcard My Hobby — logika (vanilla JS, tanpa build)
   ============================================================ */
(function () {
  'use strict';

  const HOBBIES = Array.isArray(window.HOBBIES) ? window.HOBBIES : [];
  const HOBBIES_SIX = Array.isArray(window.HOBBIES_SIX) && window.HOBBIES_SIX.length === 6
    ? window.HOBBIES_SIX
    : HOBBIES.slice(0, 6);
  const COUNTS = [6, 8, 10, 11];
  const STORAGE_KEY = 'mbj.flashcard-hobby.v1';

  const $ = (id) => document.getElementById(id);
  const el = {
    setup: $('screen-setup'),
    card: $('screen-card'),
    summary: $('screen-summary'),

    segCount: $('seg-count'),
    segMode: $('seg-mode'),
    countHint: $('count-hint'),
    modeHint: $('mode-hint'),
    ckShuffle: $('ck-shuffle'),
    ckTouch: $('ck-touch'),
    btnFullSetup: $('btn-full-setup'),
    btnStart: $('btn-start'),

    topbar: document.querySelector('.topbar'),
    progressText: $('progress-text'),
    progFill: $('prog-fill'),
    btnShuffle: $('btn-shuffle'),
    btnFull2: $('btn-full2'),
    btnQuit: $('btn-quit'),

    flashcard: $('flashcard'),
    frontMedia: $('front-media'),
    frontTag: $('front-tag'),
    backMedia: $('back-media'),
    backTag: $('back-tag'),
    backWord: $('back-word'),
    backIdn: $('back-idn'),
    btnPrev: $('btn-prev'),
    btnNext: $('btn-next'),
    btnReview: $('btn-review'),
    btnKnown: $('btn-known'),
    footCount: $('foot-count'),

    sumEmoji: $('sum-emoji'),
    sumTitle: $('sum-title'),
    sumSub: $('sum-sub'),
    sumKnown: $('sum-known'),
    sumReview: $('sum-review'),
    sumList: $('sum-list'),
    btnReviewLeft: $('btn-review-left'),
    btnRestart: $('btn-restart'),
    btnSetup: $('btn-setup')
  };

  const state = { cards: [], index: 0, flipped: false };
  let settings = loadSettings();
  let suppressClickUntil = 0;
  let swipeStart = null;

  /* ---------------------------- helpers ---------------------------- */

  function shuffle(list) {
    const a = list.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function loadSettings() {
    const base = {
      count: 11,
      mode: 'image',
      shuffle: true,
      touch: window.matchMedia ? window.matchMedia('(pointer: coarse)').matches : false
    };
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return base;
      const s = JSON.parse(raw);
      if (COUNTS.indexOf(s.count) >= 0) base.count = s.count;
      if (s.mode === 'image' || s.mode === 'word') base.mode = s.mode;
      if (typeof s.shuffle === 'boolean') base.shuffle = s.shuffle;
      if (typeof s.touch === 'boolean') base.touch = s.touch;
    } catch (e) { /* localStorage bisa diblokir */ }
    return base;
  }

  function saveSettings() {
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings)); } catch (e) {}
  }

  function setSeg(container, value) {
    const v = String(value);
    Array.prototype.forEach.call(container.querySelectorAll('button[data-v]'), (btn) => {
      btn.classList.toggle('on', btn.dataset.v === v);
    });
  }

  function hintForMode() {
    return settings.mode === 'word'
      ? 'Depan: kata bahasa Inggris. Belakang: foto hobi dan artinya.'
      : 'Depan: foto hobi. Belakang: kata bahasa Inggris dan artinya.';
  }

  function poolForCount() {
    return settings.count === 6 ? HOBBIES_SIX : HOBBIES;
  }

  function hintForCount() {
    return settings.count === 6
      ? '6 kartu: Swimming, Playing football, Dancing, Singing, Reading books, Riding a bike.'
      : 'Tersedia 11 kartu hobi. Kartu diambil acak dari tumpukan.';
  }

  function updateFullUI() {
    const full = !!document.fullscreenElement;
    if (el.btnFullSetup) el.btnFullSetup.textContent = full ? '⛶  Keluar layar penuh' : '⛶  Layar penuh';
    if (el.btnFull2) el.btnFull2.textContent = full ? '⛶ Keluar penuh' : '⛶ Layar penuh';
  }

  function renderSetup() {
    setSeg(el.segCount, settings.count);
    setSeg(el.segMode, settings.mode);
    el.ckShuffle.checked = settings.shuffle;
    el.ckTouch.checked = settings.touch;
    el.countHint.textContent = hintForCount();
    el.modeHint.textContent = hintForMode();
    document.body.classList.toggle('touch-mode', settings.touch);
    updateFullUI();
  }

  function showScreen(name) {
    const screens = { setup: el.setup, card: el.card, summary: el.summary };
    Object.keys(screens).forEach((key) => {
      const on = key === name;
      screens[key].hidden = !on;
      screens[key].classList.toggle('is-active', on);
    });
    window.scrollTo(0, 0);
  }

  function toggleFullscreen() {
    try {
      if (!document.fullscreenElement) {
        const p = document.documentElement.requestFullscreen({ navigationUI: 'hide' });
        if (p && p.catch) p.catch(() => {});
      } else {
        const p = document.exitFullscreen();
        if (p && p.catch) p.catch(() => {});
      }
    } catch (e) {}
  }

  /* ---------------------------- setup events ---------------------------- */

  el.segCount.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-v]');
    if (!btn) return;
    settings.count = Number(btn.dataset.v);
    saveSettings();
    renderSetup();
  });

  el.segMode.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-v]');
    if (!btn) return;
    settings.mode = btn.dataset.v;
    saveSettings();
    renderSetup();
  });

  el.ckShuffle.addEventListener('change', () => {
    settings.shuffle = el.ckShuffle.checked;
    saveSettings();
  });

  el.ckTouch.addEventListener('change', () => {
    settings.touch = el.ckTouch.checked;
    document.body.classList.toggle('touch-mode', settings.touch);
    saveSettings();
  });

  el.btnFullSetup.addEventListener('click', toggleFullscreen);
  el.btnFull2.addEventListener('click', toggleFullscreen);
  document.addEventListener('fullscreenchange', updateFullUI);

  /* ---------------------------- session ---------------------------- */

  function preloadOne(hobby) {
    const img = new Image();
    img.src = hobby.img;
  }

  function preload(list) {
    return Promise.all(list.map((h) => new Promise((resolve) => {
      const img = new Image();
      img.onload = resolve;
      img.onerror = resolve;
      img.src = h.img;
    })));
  }

  function buildSession(pool, limit) {
    const picked = settings.shuffle ? shuffle(pool) : pool.slice();
    state.cards = picked.slice(0, limit).map((h) => ({
      id: h.id,
      word: h.word,
      idn: h.idn,
      img: h.img,
      marked: null
    }));
    state.index = 0;
    state.flipped = false;
    showScreen('card');
    renderCard();
  }

  async function startGame() {
    if (!HOBBIES.length) {
      window.alert('Daftar hobi tidak termuat. Pastikan js/data.js ada.');
      return;
    }
    if (el.btnStart.disabled) return;

    saveSettings();
    const label = el.btnStart.textContent;
    el.btnStart.disabled = true;
    el.btnStart.textContent = 'Menyiapkan gambar…';

    const pool = poolForCount();
    await preload(pool);

    el.btnStart.disabled = false;
    el.btnStart.textContent = label;

    buildSession(pool, Math.min(settings.count, pool.length));
  }

  el.btnStart.addEventListener('click', startGame);

  /* ---------------------------- card render ---------------------------- */

  function makeImg(card, revealAnswer) {
    const img = new Image();
    img.src = card.img;
    img.alt = revealAnswer ? 'Foto: ' + card.word : 'Foto hobi';
    img.decoding = 'async';
    img.draggable = false;
    return img;
  }

  function renderCard() {
    const card = state.cards[state.index];
    if (!card) return;

    state.flipped = false;
    el.flashcard.classList.remove('is-flipped');

    el.frontTag.textContent = settings.mode === 'word' ? 'Apa bahasa Inggrisnya?' : 'What hobby is this?';
    el.backTag.textContent = 'Jawaban';

    el.frontMedia.textContent = '';
    if (settings.mode === 'word') {
      const box = document.createElement('div');
      box.className = 'wordface';
      box.textContent = card.word;
      const hint = document.createElement('small');
      hint.textContent = 'tebak gambarnya';
      box.append(hint);
      el.frontMedia.append(box);
    } else {
      el.frontMedia.append(makeImg(card, false));
    }

    el.backMedia.textContent = '';
    el.backMedia.append(makeImg(card, true));
    el.backWord.textContent = card.word;
    el.backIdn.textContent = card.idn;

    el.progressText.textContent = 'Kartu ' + (state.index + 1) + ' dari ' + state.cards.length;
    el.progFill.style.width = ((state.index + 1) / state.cards.length * 100) + '%';

    el.btnPrev.disabled = state.index === 0;
    el.btnNext.disabled = state.index === state.cards.length - 1;

    const known = state.cards.filter((c) => c.marked === true).length;
    const review = state.cards.filter((c) => c.marked === false).length;
    el.footCount.textContent = known + ' sudah hafal · ' + review + ' belum hafal';
    el.btnKnown.classList.toggle('chosen', card.marked === true);
    el.btnReview.classList.toggle('chosen', card.marked === false);

    [state.cards[state.index + 1], state.cards[state.index - 1]]
      .filter(Boolean)
      .forEach(preloadOne);
  }

  function flipCard() {
    state.flipped = !state.flipped;
    el.flashcard.classList.toggle('is-flipped', state.flipped);
  }

  function go(delta) {
    const next = state.index + delta;
    if (next < 0 || next >= state.cards.length) return;
    state.index = next;
    renderCard();
  }

  function mark(known) {
    const card = state.cards[state.index];
    if (!card) return;
    card.marked = known;

    if (state.cards.every((c) => c.marked !== null)) {
      showSummary();
      return;
    }

    let next = -1;
    for (let step = 1; step <= state.cards.length; step++) {
      const i = (state.index + step) % state.cards.length;
      if (state.cards[i].marked === null) { next = i; break; }
    }
    if (next !== -1) state.index = next;
    renderCard();
  }

  el.flashcard.addEventListener('click', () => {
    if (Date.now() < suppressClickUntil) return;
    flipCard();
  });

  el.btnPrev.addEventListener('click', () => go(-1));
  el.btnNext.addEventListener('click', () => go(1));
  el.btnKnown.addEventListener('click', () => mark(true));
  el.btnReview.addEventListener('click', () => mark(false));

  el.btnShuffle.addEventListener('click', () => {
    if (!state.cards.length) return;
    state.cards = shuffle(state.cards);
    state.index = 0;
    renderCard();
  });

  el.btnQuit.addEventListener('click', () => {
    const ok = window.confirm('Keluar ke menu utama? Progres kartu ronde ini akan hilang.');
    if (!ok) return;
    showScreen('setup');
    renderSetup();
  });

  /* touch swipe */
  el.flashcard.addEventListener('pointerdown', (e) => {
    swipeStart = { x: e.clientX, y: e.clientY };
  });

  el.flashcard.addEventListener('pointerup', (e) => {
    if (!swipeStart) return;
    const dx = e.clientX - swipeStart.x;
    const dy = e.clientY - swipeStart.y;
    swipeStart = null;
    if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.4) {
      suppressClickUntil = Date.now() + 350;
      go(dx < 0 ? 1 : -1);
    }
  });

  el.flashcard.addEventListener('pointercancel', () => { swipeStart = null; });

  /* keyboard */
  document.addEventListener('keydown', (e) => {
    if (!el.card.classList.contains('is-active')) return;
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); return; }
    if (e.key === 'ArrowRight') { e.preventDefault(); go(1); return; }
    if (e.key === ' ' || e.key === 'Enter') {
      if (e.target.closest && e.target.closest('button, input')) return;
      e.preventDefault();
      flipCard();
    }
  });

  /* ---------------------------- summary ---------------------------- */

  function showSummary() {
    const known = state.cards.filter((c) => c.marked === true);
    const review = state.cards.filter((c) => c.marked === false);

    el.sumKnown.textContent = String(known.length);
    el.sumReview.textContent = String(review.length);

    if (review.length === 0) {
      el.sumEmoji.textContent = '🌟';
      el.sumTitle.textContent = 'Semua sudah hafal!';
    } else {
      el.sumEmoji.textContent = '📚';
      el.sumTitle.textContent = 'Selesai belajar!';
    }

    el.sumSub.textContent = known.length + ' dari ' + state.cards.length +
      ' kartu sudah hafal · ' + review.length + ' kartu perlu diulang';

    el.sumList.textContent = '';
    state.cards.forEach((card) => {
      const row = document.createElement('div');
      row.className = 'res-row';

      const img = makeImg(card, false);
      img.alt = '';

      const who = document.createElement('span');
      who.className = 'who';
      const word = document.createElement('b');
      word.textContent = card.word;
      const idn = document.createElement('small');
      idn.textContent = card.idn;
      who.append(word, idn);

      const status = document.createElement('span');
      const ok = card.marked === true;
      status.className = 'state ' + (ok ? 'ok' : 'no');
      status.textContent = ok ? 'Hafal' : 'Ulang';

      row.append(img, who, status);
      el.sumList.append(row);
    });

    el.btnReviewLeft.disabled = review.length === 0;
    el.btnReviewLeft.textContent = review.length
      ? 'Ulangi Kartu Belum Hafal (' + review.length + ')'
      : 'Semua Kartu Sudah Hafal';

    showScreen('summary');
  }

  el.btnReviewLeft.addEventListener('click', () => {
    const review = state.cards.filter((c) => c.marked === false);
    if (!review.length) return;
    buildSession(review, review.length);
  });

  el.btnRestart.addEventListener('click', () => {
    const pool = poolForCount();
    buildSession(pool, Math.min(settings.count, pool.length));
  });

  el.btnSetup.addEventListener('click', () => {
    showScreen('setup');
    renderSetup();
  });

  /* ---------------------------- init ---------------------------- */

  if (document.fullscreenElement === undefined) {
    if (el.btnFullSetup) el.btnFullSetup.hidden = true;
    if (el.btnFull2) el.btnFull2.hidden = true;
  }

  renderSetup();
  showScreen('setup');
})();
