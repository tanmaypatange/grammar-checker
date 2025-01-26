const PROXY_URL = 'https://grammar-checker-proxy.tanmay-patange.workers.dev';
const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
const checkButton = document.getElementById('checkButton');
const loader = document.querySelector('.loader');

async function checkGrammar() {
    const text = inputText.value.trim();
    
    if (!text) {
        outputText.value = "Please enter some text first";
        outputText.style.color = '#e74c3c';
        return;
    }

    try {
        checkButton.disabled = true;
        loader.hidden = false;
        outputText.style.color = 'inherit';
        outputText.value = "Analyzing text...";

        const response = await fetch(PROXY_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain' },
            body: text
        });

        if (!response.ok) {
            throw new Error(`Server responded with ${response.status}`);
        }

        const corrected = await response.text();
        outputText.value = corrected;

    } catch (error) {
        console.error('Error:', error);
        outputText.value = "Error: " + error.message;
        outputText.style.color = '#e74c3c';
    } finally {
        checkButton.disabled = false;
        loader.hidden = true;
    }
}

checkButton.addEventListener('click', checkGrammar);
