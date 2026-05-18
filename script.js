const database = {
    ms: {
        tagline: "kata-kata bermakna",
        nextLabel: "Seterusnya",
        copyLabel: "Salin",
        copiedLabel: "Disalin!",
        toastLabel: "Petikan disalin ✓",
        copyright: "&copy; 2026 kataJal. Segala hak terpelihara.",
        quotes: [
            { text: "“Sabar itu subur, ikhlas itu luas.”", author: "Anonim" },
            { text: "“Masa depan adalah milik mereka yang percaya pada keindahan impian mereka.”", author: "Eleanor Roosevelt" },
            { text: "“Cara terbaik untuk meramal masa depan adalah dengan menciptanya.”", author: "Peter Drucker" },
            { text: "“Bahasa menunjukkan bangsa, sastera membina jiwa.”", author: "Pendeta Za'ba" },
            { text: "“Bukanlah lubuk yang dalam itu yang ditakuti, melainkan buaya yang tenang.”", author: "Peribahasa Melayu" }
        ]
    },
    en: {
        tagline: "meaningful words",
        nextLabel: "Next Quote",
        copyLabel: "Copy",
        copiedLabel: "Copied!",
        toastLabel: "Quote copied ✓",
        copyright: "&copy; 2026 kataJal. All rights reserved.",
        quotes: [
            { text: "“Patience is fertile, sincerity is boundlessly vast.”", author: "Anonymous" },
            { text: "“The future belongs to those who believe in the beauty of their dreams.”", author: "Eleanor Roosevelt" },
            { text: "“The best way to predict the future is to create it.”", author: "Peter Drucker" },
            { text: "“Language defines the nation, literature builds the soul.”", author: "Pendeta Za'ba" },
            { text: "“It is not the deep water that is feared, but the silent crocodile.”", author: "Malay Proverb" }
        ]
    }
};

let currentLanguage = 'ms';
let lastQuoteIndex = -1;
let toastTimeout = null;
let typingInterval = null;

function toggleLanguage() {
    currentLanguage = (currentLanguage === 'ms') ? 'en' : 'ms';
    
    document.getElementById('btnMs').classList.toggle('active', currentLanguage === 'ms');
    document.getElementById('btnEn').classList.toggle('active', currentLanguage === 'en');
    
    document.getElementById('brandTagline').innerText = database[currentLanguage].tagline;
    document.getElementById('nextBtnLabel').innerText = database[currentLanguage].nextLabel;
    document.getElementById('copyBtnLabel').innerText = database[currentLanguage].copyLabel;
    document.querySelector('footer').innerHTML = database[currentLanguage].copyright;

    lastQuoteIndex = -1;
    generateRandomQuote();
}

// ── Real-Time Pencil Writing Engine ──
function generateRandomQuote() {
    // Clear any typing loop currently running to avoid text overlap glitches
    clearInterval(typingInterval);

    const textElement = document.getElementById('quoteText');
    const authorElement = document.getElementById('quoteAuthor');
    const pencilElement = document.getElementById('pencilCursor');
    const collection = database[currentLanguage].quotes;
    
    if (collection.length <= 1) return;

    let nextIndex;
    do {
        nextIndex = Math.floor(Math.random() * collection.length);
    } while (nextIndex === lastQuoteIndex);

    lastQuoteIndex = nextIndex;
    const targetQuote = collection[nextIndex];
    
    const fullText = targetQuote.text;
    let currentIdx = 0;

    // Reset layout states before typing starts
    textElement.innerText = "";
    authorElement.innerText = `— ${targetQuote.author}`;
    authorElement.classList.remove('visible');
    
    // Unhide pencil and activate dynamic vibration CSS styles
    pencilElement.classList.add('writing');

    // Run writing loop calculations
    typingInterval = setInterval(() => {
        if (currentIdx < fullText.length) {
            textElement.innerText += fullText.charAt(currentIdx);
            currentIdx++;
        } else {
            // Typing complete: shut down loop engine
            clearInterval(typingInterval);
            pencilElement.classList.remove('writing');
            
            // Bring author signature up cleanly
            authorElement.classList.add('visible');
            resetCopyButtonState();
        }
    }, 25); // Adjust writing speed delivery here (lower numbers mean faster writing)
}

function copyToClipboard() {
    const textToCopy = document.getElementById('quoteText').innerText;
    const authorToCopy = document.getElementById('quoteAuthor').innerText;
    const fullOutput = `${textToCopy} ${authorToCopy}`;

    if (!navigator.clipboard) {
        fallbackCopyToClipboard(fullOutput);
        return;
    }

    navigator.clipboard.writeText(fullOutput).then(() => {
        triggerToastAlert();
        triggerCopyButtonSuccess();
    }).catch(err => {
        fallbackCopyToClipboard(fullOutput);
    });
}

function fallbackCopyToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        document.execCommand('copy');
        triggerToastAlert();
        triggerCopyButtonSuccess();
    } catch (err) {
        console.error('Fallback layout execution break: ', err);
    }
    document.body.removeChild(textArea);
}

function triggerToastAlert() {
    const toast = document.getElementById('toastNotice');
    toast.innerText = database[currentLanguage].toastLabel;
    
    clearTimeout(toastTimeout);
    toast.classList.add('visible');

    toastTimeout = setTimeout(() => {
        toast.classList.remove('visible');
        resetCopyButtonState();
    }, 2200);
}

function triggerCopyButtonSuccess() {
    const copyBtn = document.getElementById('copyBtn');
    const copyLabel = document.getElementById('copyBtnLabel');
    if (copyBtn) copyBtn.classList.add('success-state');
    if (copyLabel) copyLabel.innerText = database[currentLanguage].copiedLabel;
}

function resetCopyButtonState() {
    const copyBtn = document.getElementById('copyBtn');
    const copyLabel = document.getElementById('copyBtnLabel');
    if (copyBtn) copyBtn.classList.remove('success-state');
    if (copyLabel) copyLabel.innerText = database[currentLanguage].copyLabel;
}

window.addEventListener('DOMContentLoaded', () => {
    generateRandomQuote();
});