// Configuration
const PROXY_URL = 'YOUR_CLOUDFLARE_WORKER_URL'; // REPLACE WITH YOUR URL
const MAX_TEXT_LENGTH = 1000;

// DOM Elements
const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
const checkButton = document.getElementById('checkButton');
const spinner = document.querySelector('.spinner');
const statusBar = document.getElementById('status');

// Event Listeners
checkButton.addEventListener('click', handleGrammarCheck);

async function handleGrammarCheck() {
    const text = inputText.value.trim();
    
    // Validation
    if (!text) {
        showStatus('Please enter some text', 'error');
        return;
    }
    
    if (text.length > MAX_TEXT_LENGTH) {
        showStatus(`Text exceeds ${MAX_TEXT_LENGTH} characters`, 'error');
        return;
    }

    try {
        startLoading();
        
        const response = await fetch(PROXY_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain' },
            body: text
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        const corrected = await response.text();
        outputText.value = corrected;
        showStatus('Grammar check completed', 'success');

    } catch (error) {
        console.error('Error:', error);
        showStatus(error.message, 'error');
    } finally {
        stopLoading();
    }
}

function startLoading() {
    checkButton.disabled = true;
    spinner.hidden = false;
    outputText.value = '';
    statusBar.textContent = '';
}

function stopLoading() {
    checkButton.disabled = false;
    spinner.hidden = true;
}

function showStatus(message, type = 'info') {
    statusBar.textContent = message;
    statusBar.style.color = {
        error: 'var(--error)',
        success: 'var(--success)',
        info: '#666'
    }[type];
}
