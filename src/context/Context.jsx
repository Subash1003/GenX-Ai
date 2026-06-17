import { createContext, useState } from "react";
import runChat from "../config/GenX.js";

export const Context = createContext();

// ✅ These load only on first message, not on app startup
let markedInstance = null;
const getMarked = async () => {
  if (markedInstance) return markedInstance;
  const { marked } = await import("marked");
  const { markedHighlight } = await import("marked-highlight");
  const { default: hljs } = await import("highlight.js");

  marked.use(
    markedHighlight({
      langPrefix: "hljs language-",
      highlight(code, lang) {
        const language = hljs.getLanguage(lang) ? lang : "plaintext";
        return hljs.highlight(code, { language }).value;
      },
    })
  );
  markedInstance = marked;
  return markedInstance;
};

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [conversationHistory, setConversationHistory] = useState([]);

  const onSent = async (prompt) => {
    const query = prompt;
    setInput("");
    if (!query.trim()) return;

    setResultData("");
    setLoading(true);
    setShowResult(true);
    setRecentPrompt(query);

    try {
      // ✅ marked loads here — only when user sends first message
      const marked = await getMarked();
      const response = await runChat(query, conversationHistory);
      const html = marked(response);
      setResultData(html);

      setConversationHistory(prev => [
        ...prev,
        { role: "user", content: query },
        { role: "assistant", content: response },
      ]);

      setChatHistory(prev => [...prev, { prompt: query, response: html }]);

    } catch (error) {
      setResultData("Something went wrong. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // ... rest of your code stays exactly the same
  const loadHistory = (entry) => {
    setRecentPrompt(entry.prompt);
    setResultData(entry.response);
    setShowResult(true);
  };

  const newChat = () => {
    setShowResult(false);
    setResultData("");
    setRecentPrompt("");
    setInput("");
    setConversationHistory([]);
  };

  const contextValue = {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    chatHistory,
    loadHistory,
    newChat,
  };

  return (
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;