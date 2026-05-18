/* ══════════════════════════════════════════════════
   QUOTE DATA
   Add more quotes by extending each array below.
   Format: { text: "...", author: "..." }
══════════════════════════════════════════════════ */
const quotes = {
  bm: [
    {
      text: "Ilmu yang tidak diamalkan adalah seperti pohon yang tidak berbuah.",
      author: "Jal"
    },
    {
      text: "Jangan lihat siapa yang bercakap, tetapi lihat apa yang dicakap.",
      author: "Jal"
    },
    {
      text: "Berani kerana benar, takut kerana salah.",
      author: "Jal"
    },
    {
      text: "Usaha tangga kejayaan. Tanpa usaha, impian hanyalah lamunan.",
      author: "Ungkapan Tradisional"
    },
    {
      text: "Setiap detik yang berlalu adalah guru yang paling jujur.",
      author: "Jal"
    }
  ],
  en: [
    {
      text: "The only way to do great work is to love what you do. If you haven't found it yet, keep looking.",
      author: "Steve Jobs"
    },
    {
      text: "In the middle of every difficulty lies opportunity.",
      author: "Albert Einstein"
    },
    {
      text: "It does not matter how slowly you go as long as you do not stop.",
      author: "Confucius"
    },
    {
      text: "The mind is everything. What you think, you become.",
      author: "Buddha"
    },
    {
      text: "Life is what happens when you're busy making other plans.",
      author: "John Lennon"
    }
  ]
};

/* ══════════════════════════════════════════════════
   UI COPY STRINGS
══════════════════════════════════════════════════ */
const ui = {
  bm: {
    tagline:    "kata-kata bermakna",
    copyLabel:  "Salin",
    copiedLabel:"Disalin!",
    nextLabel:  "Seterusnya",
    toastCopied:"Petikan disalin ✓",
    footer:     "© 2025 kataJal — Semua kata-kata milik pengarang masing-masing."
  },
  en: {
    tagline:    "meaningful words",
    copyLabel:  "Copy",
    copiedLabel:"Copied!",
    nextLabel:  "Next Quote",
    toastCopied:"Quote copied ✓",
    footer:     "© 2025 kataJal — All quotes belong to their respective authors."
  }
};

/* ══════════════════════════════════════════════════
   STATE
══════════════════════════════════════════════════ */
let currentLang  = 'bm';
let lastIndex    = -1;
let toastTimer   = null;

/* ══════════════════════════════════════════════════
   HELPERS
══════════════════════════════════════════════════ */
function randomIndex(len) {
  if (len === 1) return 0;
  let idx;
  do { idx = Math.floor(Math.random() * len); }
  while (idx === lastIndex);
  return idx;
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}

/* ══════════════════════════════════════════════════
   DISPLAY QUOTE  (with fade transition)
══════════════════════════════════════════════════ */
function displayQuote(idx) {
  const textEl   = document.getElementById('quote-text');
  const authorEl = document.getElementById('quote-author');
  const pool     = quotes[currentLang];

  textEl.classList.add('fading');
  authorEl.classList.add('fading');

  setTimeout(() => {
    textEl.textContent   = '\u201C' + pool[idx].text + '\u201D';
    authorEl.textContent = '— ' + pool[idx].author;
    textEl.classList.remove('fading');
    authorEl.classList.remove('fading');
  }, 280);

  lastIndex = idx;
}

/* ══════════════════════════════════════════════════
   NEXT QUOTE
══════════════════════════════════════════════════ */
function nextQuote() {
  const idx = randomIndex(quotes[currentLang].length);
  displayQuote(idx);
}

/* ══════════════════════════════════════════════════
   LANGUAGE TOGGLE
══════════════════════════════════════════════════ */
function setLang(lang) {
  if (lang === currentLang) return;
  currentLang = lang;
  lastIndex   = -1;             // reset so first pick is truly random

  /* Update HTML lang attribute */
  document.documentElement.lang = lang === 'bm' ? 'ms' : 'en';

  /* Swap toggle active state */
  document.getElementById('btn-bm').classList.toggle('active', lang === 'bm');
  document.getElementById('btn-en').classList.toggle('active', lang === 'en');
  document.getElementById('btn-bm').setAttribute('aria-pressed', lang === 'bm');
  document.getElementById('btn-en').setAttribute('aria-pressed', lang === 'en');

  /* Swap UI strings */
  const t = ui[lang];
  document.getElementById('tagline').textContent    = t.tagline;
  document.getElementById('copy-label').textContent = t.copyLabel;
  document.getElementById('next-label').textContent = t.nextLabel;
  document.getElementById('footer-text').textContent = t.footer;

  /* Show a new quote in the new language */
  displayQuote(randomIndex(quotes[lang].length));
}

/* ══════════════════════════════════════════════════
   COPY TO CLIPBOARD
══════════════════════════════════════════════════ */
function copyQuote() {
  const textEl   = document.getElementById('quote-text').textContent;
  const authorEl = document.getElementById('quote-author').textContent;
  const copyBtn  = document.getElementById('copy-btn');
  const copyLbl  = document.getElementById('copy-label');
  const full     = textEl + '\n' + authorEl + '\n\n— kataJal';

  function onSuccess() {
    copyBtn.classList.add('copied');
    copyLbl.textContent = ui[currentLang].copiedLabel;
    showToast(ui[currentLang].toastCopied);
    setTimeout(() => {
      copyBtn.classList.remove('copied');
      copyLbl.textContent = ui[currentLang].copyLabel;
    }, 2200);
  }

  function fallbackCopy() {
    /* Works on HTTP, raw IPs, and older browsers */
    const ta = document.createElement('textarea');
    ta.value = full;
    ta.setAttribute('readonly', '');          // prevent mobile keyboard popup
    ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0;pointer-events:none;';
    document.body.appendChild(ta);

    /* iOS requires a different selection method */
    if (navigator.userAgent.match(/ipad|iphone/i)) {
      const range = document.createRange();
      range.selectNodeContents(ta);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      ta.setSelectionRange(0, 999999);
    } else {
      ta.select();
    }

    let ok = false;
    try { ok = document.execCommand('copy'); } catch (e) {}
    document.body.removeChild(ta);

    if (ok) {
      onSuccess();
    } else {
      /* Last resort: prompt the user to copy manually */
      window.prompt('Tekan Ctrl+C / Cmd+C untuk salin:', full);
    }
  }

  /* Try modern API first (works on HTTPS), fall back otherwise */
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(full).then(onSuccess).catch(fallbackCopy);
  } else {
    fallbackCopy();
  }
}

/* ══════════════════════════════════════════════════
   INIT — show first quote on load
══════════════════════════════════════════════════ */
(function init() {
  displayQuote(randomIndex(quotes[currentLang].length));
})();
