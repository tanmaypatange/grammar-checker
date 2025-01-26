const PROXY_URL = 'YOUR_CLOUDFLARE_WORKER_URL'; // Replace with your URL
const MAX_RETRIES = 2;
const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
const checkBtn = document.getElementById('checkBtn');
const loader = document.querySelector('.loader');

async function handleGrammarCheck(retries = MAX_RETRIES) {
    const text = inputText.value.trim();
    
    if (!text) {
        showError('Please enter some text');
        inputText.focus();
        return;
    }

    try {
        toggleLoading(true);
        
        const response = await fetch(PROXY_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain' },
            body: text
        });

        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
        
        const corrected = await response.text();
        outputText.value = corrected;
        clearError();

    } catch (error) {
        console.error('Check failed:', error);
        if (retries > 0) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            return handleGrammarCheck(retries - 1);
        }
        showError('Failed to check grammar. Please try later.');
    } finally {
        toggleLoading(false);
    }
}

function toggleLoading(isLoading) {
    checkBtn.disabled = isLoading;
    loader.hidden = !isLoading;
    document.querySelector('.btn-text').textContent = 
        isLoading ? 'Checking...' : 'Check Grammar';
}

function showError(message) {
    outputText.value = message;
    outputText.style.borderColor = 'var(--error)';
}

function clearError() {
    outputText.style.borderColor = '#ddd';
}

checkBtn.addEventListener('click', handleGrammarCheck);
