let database = null;
let currentLanguage = 'ms';
let lastQuoteIndex = -1;
let toastTimeout = null;
let typingInterval = null;

// Load JSON data asynchronously on startup
async function loadDatabase() {
    try {
        const response = await fetch('data/quotes.json');
        database = await response.json();
        generateRandomQuote(); 
    } catch (err) {
        console.error('Failed to stream JSON data profile:', err);
    }
}

// Real-Time Pencil Writing Engine
function generateRandomQuote() {
    if (!database) return;
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

    textElement.innerText = "";
    authorElement.innerText = `— ${targetQuote.author}`;
    authorElement.classList.remove('visible');
    pencilElement.classList.add('writing');

    typingInterval = setInterval(() => {
        if (currentIdx < fullText.length) {
            textElement.innerText += fullText.charAt(currentIdx);
            currentIdx++;
        } else {
            clearInterval(typingInterval);
            pencilElement.classList.remove('writing');
            authorElement.classList.add('visible');
            resetCopyButtonState();
        }
    }, 15); // Blazing fast writing speed adjustment
}

// Core Language Switch Interface
function toggleLanguage() {
    if (!database) return;
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

// Clipboard Safe Copy Controllers
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
    }).catch(() => fallbackCopyToClipboard(fullOutput));
}

function fallbackCopyToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        document.execCommand('copy');
        triggerToastAlert();
        triggerCopyButtonSuccess();
    } catch (err) {
        console.error('Fallback sandbox failure: ', err);
    }
    document.body.removeChild(textArea);
}

// Dynamic System Notifications
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
    document.getElementById('copyBtn').classList.add('success-state');
    document.getElementById('copyBtnLabel').innerText = database[currentLanguage].copiedLabel;
}

function resetCopyButtonState() {
    document.getElementById('copyBtn').classList.remove('success-state');
    document.getElementById('copyBtnLabel').innerText = database[currentLanguage].copyLabel;
}

window.addEventListener('DOMContentLoaded', loadDatabase);