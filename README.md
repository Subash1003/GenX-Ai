# 🤖 Gen-X AI

A conversational AI web application powered by an LLM API — capable of answering questions, generating text, translating content, and summarizing information through a fast, responsive chat interface.

🔗 **Live Demo:** [gen-x-ai-two.vercel.app](https://gen-x-ai-two.vercel.app/)

## 📌 Overview

Gen-X AI is a web-based conversational assistant that lets users interact naturally with a large language model. Beyond simple Q&A, it supports text generation, translation, and summarization — all wrapped in a clean, responsive chat UI optimized for performance.

## ✨ Features

- 💬 **Conversational Q&A** — Ask questions and get intelligent, context-aware responses
- ✍️ **Text Generation** — Generate content on demand using an LLM API
- 🌐 **Translation** — Translate text across languages within the chat
- 📝 **Summarization** — Summarize long-form content into concise output
- 📱 **Responsive Chat UI** — Smooth, intuitive interface across devices

## 🛠️ Tech Stack

- **Frontend:** React.js
- **State Management:** React Context API
- **Styling:** CSS
- **AI Integration:** LLM API (e.g., OpenAI / Anthropic / similar)
- **Build Tool:** Vite
- **Deployment:** Vercel

## 📂 Project Structure

```
gen-X/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── main/
│   │   └── sidebar/
│   │       ├── Sidebar.css
│   │       └── Sidebar.jsx
│   ├── config/
│   │   └── GenX.js        # LLM API configuration
│   ├── context/
│   │   └── Context.jsx    # Global app/chat context
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env
├── .gitignore
├── index.html
├── package.json
├── vercel.json
└── vite.config.js
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- API key for your chosen LLM provider

### Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/gen-x-ai.git
cd gen-x-ai
```

2. Install dependencies
```bash
npm install
```

3. Add your API key to a `.env` file
```
VITE_LLM_API_KEY=your_api_key_here
```

4. Start the development server
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

### Build for Production
```bash
npm run build
```

## 🎯 Usage

1. Type a question, prompt, or piece of text into the chat input
2. Choose the type of task — ask a question, generate content, translate, or summarize
3. View the AI-generated response instantly in the chat window
4. Continue the conversation with follow-up prompts

## 🔮 Future Enhancements

- Voice input and text-to-speech responses
- Chat history persistence
- User authentication
- Support for multiple LLM providers
- Dark mode

## 🌐 Deployment

This project is configured for deployment on [Vercel](https://vercel.com). Simply connect your GitHub repository to Vercel and add your environment variables (`VITE_LLM_API_KEY`) in the project settings.

## 🤝 Contributing

Contributions are welcome! Feel free to fork this repository, make changes, and submit a pull request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Subash**
GitHub: [@Subash1003](https://github.com/Subash1003)
