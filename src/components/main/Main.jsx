import React, { useContext, useEffect, useRef } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'

const Main = () => {
  const { onSent, recentPrompt, showResult, loading, resultData, setInput, input, chatHistory } = useContext(Context)
  const resultRef = useRef(null);

  useEffect(() => {
    if (!resultData) return;

    document.querySelectorAll(".result-data pre").forEach((pre) => {
      if (pre.querySelector(".code-block-header")) return;

      const code = pre.querySelector("code");
      const lang = [...(code?.classList ?? [])]
        .find((c) => c.startsWith("language-"))
        ?.replace("language-", "") || "code";

      const header = document.createElement("div");
      header.className = "code-block-header";

      const label = document.createElement("span");
      label.textContent = lang;

      const btn = document.createElement("button");
      btn.className = "copy-btn";
      btn.textContent = "Copy";
      btn.addEventListener("click", () => {
        navigator.clipboard.writeText(code?.innerText ?? "");
        btn.textContent = "Copied!";
        setTimeout(() => (btn.textContent = "Copy"), 2000);
      });

      header.appendChild(label);
      header.appendChild(btn);
      pre.insertBefore(header, pre.firstChild);
    });
  }, [resultData]);

  useEffect(() => {
    const textarea = document.querySelector(".search-box textarea");
    if (!textarea) return;
    textarea.style.height = "auto";
    const maxHeight = 200;
    textarea.style.height = Math.min(textarea.scrollHeight, maxHeight) + "px";
  }, [input]);

  useEffect(() => {
    if (resultRef.current) {
      resultRef.current.scrollTop = resultRef.current.scrollHeight;
    }
  }, [chatHistory, loading]);

  return (
    <div className='main'>
      <div className="nav">
        <p>GenX-Ai</p>
        <img src={assets.profile} alt="" />
      </div>
      <div className="main-container">

        {!showResult
          ? <>
            <div className="greet">
              <p><span>Hello, dev.!</span></p>
              <p>How can I help you today?</p>
            </div>

            {/* Cards hidden on mobile via CSS */}
            <div className="cards">
              <div className="card" onClick={() => onSent("Suggest beautiful place to see on an upcoming road trip")}>
                <p>Suggest beautiful place to see on an upcoming road trip</p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div className="card" onClick={() => onSent("Briefly summarize this concept: urban planning")}>
                <p>Briefly summarize this concept: urban planning</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div className="card" onClick={() => onSent("Brainstorm team bonding activities for our work retreat")}>
                <p>Brainstorm team bonding activities for our work retreat</p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div className="card" onClick={() => onSent("Tell me about React js and React native")}>
                <p>Tell me about React js and React native</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
          : <>
            <div className="result">
              {chatHistory.map((entry, index) => (
                <div key={index} className="chat-entry">
                  <div className="result-title">
                    <img src={assets.profile} alt="" />
                    <p>{entry.prompt}</p>
                  </div>
                  <div className="result-data">
                    <p dangerouslySetInnerHTML={{ __html: entry.response }}></p>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="chat-entry">
                  <div className="result-title">
                    <img src={assets.profile} alt="" />
                    <p>{recentPrompt}</p>
                  </div>
                  <div className="result-data">
                    <div className="loader">
                      <hr /><hr /><hr />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        }

        {/* ---- SEARCH BOX (always visible) ---- */}
        <div className="main-bottom">
          <div className="search-box">
            <textarea
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  onSent(input);
                }
              }}
              value={input}
              placeholder="Write a message..."
              rows={1}
            />
            <div className="search-box-icons">
              <div className="icons-left">
                <img src={assets.gallery_icon} />
              </div>
              <div className="icons-right">
                <img src={assets.mic_icon} alt="" />
                <img onClick={() => onSent(input)} src={assets.send_icon} alt="" />
              </div>
            </div>
          </div>

          <p className="bottom-info">
            GenX-ai may display inaccurate info, so double-check its responses.
          </p>
        </div>

      </div>
    </div>
  )
}

export default Main
