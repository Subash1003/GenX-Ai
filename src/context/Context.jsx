import { createContext, useState } from "react";
import runChat from "../config/GenX.js";

export const Context = createContext();

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

  marked.use({
    gfm: true,
    renderer: {
      link({ href, title, text }) {
        const isYouTube =
          href.includes("youtube.com") || href.includes("youtu.be");
        const titleAttr = title ? ` title="${title}"` : "";

        if (isYouTube) {
          const videoIdMatch = href.match(
            /(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/
          );
          const videoId = videoIdMatch ? videoIdMatch[1] : null;

          if (videoId) {
            return `
              <a href="${href}" target="_blank" rel="noopener noreferrer"
                 class="yt-card"${titleAttr}>
                <img
                  src="https://img.youtube.com/vi/${videoId}/hqdefault.jpg"
                  alt="${text}"
                  class="yt-thumb"
                />
                <span class="yt-label">▶ ${text || "Watch on YouTube"}</span>
              </a>`;
          }
        }

        return `<a href="${href}" target="_blank" rel="noopener noreferrer"
                   class="inline-link"${titleAttr}>${text}</a>`;
      },
    },
  });

  markedInstance = marked;
  return markedInstance;
};

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  // NEW: chatHistory is now a list of SESSIONS, not flat messages
  const [chatHistory, setChatHistory] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);

  const onSent = async (prompt) => {
    const query = prompt;
    setInput("");
    if (!query.trim()) return;

    setResultData("");
    setLoading(true);
    setShowResult(true);
    setRecentPrompt(query);

    // If there's no active session, create one now (first message of a new chat)
    let activeId = currentChatId;
    let activeConvHistory = [];

    if (!activeId) {
      activeId = Date.now().toString();
      activeConvHistory = [];
      setChatHistory(prev => [
        { id: activeId, title: query.slice(0, 30), messages: [], conversationHistory: [] },
        ...prev,
      ]);
      setCurrentChatId(activeId);
    } else {
      // pull the existing session's conversation history for context
      const session = chatHistory.find(s => s.id === activeId);
      activeConvHistory = session ? session.conversationHistory : [];
    }

    try {
      const marked = await getMarked();
      const response = await runChat(query, activeConvHistory);
      const html = marked(response);
      setResultData(html);

      const newConvHistory = [
        ...activeConvHistory,
        { role: "user", content: query },
        { role: "assistant", content: response },
      ];

      // Append this exchange to the CORRECT session only
      setChatHistory(prev =>
        prev.map(session =>
          session.id === activeId
            ? {
                ...session,
                messages: [...session.messages, { prompt: query, response: html }],
                conversationHistory: newConvHistory,
              }
            : session
        )
      );
    } catch (error) {
      setResultData("Something went wrong. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Switch to a previously saved session
  const loadHistory = (session) => {
    setCurrentChatId(session.id);
    if (session.messages.length > 0) {
      const last = session.messages[session.messages.length - 1];
      setRecentPrompt(last.prompt);
      setResultData(last.response);
    } else {
      setRecentPrompt("");
      setResultData("");
    }
    setShowResult(true);
  };

  // Actually start a fresh session container
  const newChat = () => {
    setShowResult(false);
    setResultData("");
    setRecentPrompt("");
    setInput("");
    setCurrentChatId(null); // next onSent() call will create a new session
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
    currentChatId,
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