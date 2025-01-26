const PROXY_URL = 'https://grammar-checker-proxy.tanmay-patange.workers.dev';

// UI Elements
const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
const checkButton = document.querySelector('button');

async function checkGrammar() {
    const text = inputText.value.trim();
    
    if (!text) {
        alert('Please enter some text to check');
        inputText.focus();
        return;
    }

    try {
        checkButton.disabled = true;
        checkButton.textContent = 'Checking...';
        outputText.value = 'Processing...';

        const response = await fetch(PROXY_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain' },
            body: text
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const result = await response.json();
        
        // Extract corrected text safely
        const correctedText = result?.candidates?.[0]?.content?.parts?.[0]?.text || 
            "No corrections found";
        
        outputText.value = correctedText;

    } catch (error) {
        console.error('Error:', error);
        outputText.value = `Error: ${error.message || 'Failed to check grammar'}`;
    } finally {
        checkButton.disabled = false;
        checkButton.textContent = 'Check Grammar →';
    }
}
