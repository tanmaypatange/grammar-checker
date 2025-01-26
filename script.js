const PROXY_URL = 'https://grammar-checker-proxy.tanmay-patange.workers.dev'; // Remove trailing slash

// Connect UI elements
const inputText = document.getElementById('inputText');
const resultDiv = document.getElementById('result');
const checkButton = document.querySelector('button');

async function checkGrammar() {
  const text = inputText.value.trim();
  
  if (!text) {
    resultDiv.textContent = "Please enter some text";
    return;
  }

  try {
    checkButton.disabled = true;
    resultDiv.textContent = "Checking...";
    
    const response = await fetch(PROXY_URL, {
      method: 'POST',
      headers: {'Content-Type': 'text/plain'},
      body: text
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    
    // Safely handle API response structure
    if (result?.candidates?.[0]?.content?.parts?.[0]?.text) {
      resultDiv.textContent = result.candidates[0].content.parts[0].text;
    } else {
      resultDiv.textContent = "No suggestions found";
    }
  } catch (error) {
    console.error('Error:', error);
    resultDiv.textContent = "Grammar check failed. Please try again.";
  } finally {
    checkButton.disabled = false;
  }
}
