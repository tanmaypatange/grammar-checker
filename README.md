# Grammar Checker

A simple, real-time grammar checking web application powered by Google's Gemini AI model. This project provides an easy-to-use interface for correcting grammar in text snippets.

## Features

- Real-time grammar checking
- Clean, modern user interface
- Responsive design
- Loading state indicator
- Error handling
- CORS support
- Easy text input and output

## Live Demo

Visit the live application at: [https://tanmaypatange.github.io/grammar-checker/](https://tanmaypatange.github.io/grammar-checker/)

## Technologies Used

- HTML5
- CSS3
- JavaScript (Vanilla)
- Google Gemini API
- Cloudflare Workers (for backend proxy)

## Project Structure

```
grammar-checker/
│
├── index.html          # Main HTML file
├── style.css          # Styling
├── script.js          # Frontend JavaScript
└── worker.js          # Cloudflare Worker script (backend proxy)
```

## Setup and Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/tanmaypatange/grammar-checker.git
   cd grammar-checker
   ```

2. Replace the Gemini API key in `worker.js`:
   ```javascript
   const GEMINI_KEY = 'YOUR_API_KEY';
   ```

3. Deploy the Cloudflare Worker:
   - Create a Cloudflare Workers account
   - Deploy the `worker.js` script to your Cloudflare Workers instance
   - Update the `PROXY_URL` in `script.js` to match your Worker's URL

4. Serve the frontend:
   - You can use any static file server or GitHub Pages
   - For local development, you can use tools like `live-server`:
     ```bash
     npx live-server
     ```

## Usage

1. Visit the application in your web browser
2. Enter your text in the input textarea
3. Click "Check Grammar" or press Enter
4. Wait for the corrected text to appear in the output area

## Features in Detail

### Frontend
- Responsive design that works on both desktop and mobile devices
- Real-time loading indicator
- Error handling with user-friendly messages
- Clean and intuitive interface
- Textarea with automatic vertical resize

### Backend (Cloudflare Worker)
- Acts as a proxy to the Gemini API
- Handles CORS
- Error handling and response formatting
- Request validation

## Security

- API key is secured in the Cloudflare Worker
- CORS headers are properly configured
- Input validation is implemented
- Error handling prevents exposure of sensitive information

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Google Gemini API for providing the grammar checking capability
- Cloudflare Workers for the backend infrastructure
