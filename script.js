const PROXY_URL = 'https://grammar-checker-proxy.tanmay-patange.workers.dev';
const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
const checkButton = document.getElementById('checkButton');
const spinner = document.querySelector('.spinner');

async function checkGrammar() {
    const text = inputText.value.trim();
    
    if (!text) {
        outputText.value = "Please enter some text first";
        return;
    }

    try {
        checkButton.disabled = true;
        spinner.style.display = 'inline-block';
        
        const response = await fetch(PROXY_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain' },
            body: text
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const corrected = await response.text();
        outputText.value = corrected;

    } catch (error) {
        console.error('Error:', error);
        outputText.value = "Error: Could not check grammar. Please try again.";
    } finally {
        checkButton.disabled = false;
        spinner.style.display = 'none';
    }
}

checkButton.addEventListener('click', checkGrammar);
