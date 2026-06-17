import React, { useState, useContext } from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'

const Sidebar = () => {
  const [extended, setExtended] = useState(false)
  const { chatHistory, loadHistory, newChat } = useContext(Context)

  return (
    <div className='sidebar'>
      <div className='top'>
        <img
          onClick={() => setExtended(prev => !prev)}
          className='menu'
          src={assets.menu_icon}
          alt="menu icon"
        />

        {/* New Chat button now wired to context */}
        <div className='new-chat' onClick={newChat}>
          <img src={assets.plus_icon} alt="new chat" />
          {extended ? <p>New Chat</p> : null}
        </div>

        {extended && (
          <div className="recent-container">
            <div className="recent">
              <div className='recent-title'>
                <img src={assets.message_icon} alt="" />
                <p>Recent</p>
              </div>

              {chatHistory.length === 0 && (
                <p className="no-history">No recent chats</p>
              )}

              {chatHistory.map((entry, index) => (
                <div
                  key={index}
                  className="recent-entry"
                  onClick={() => loadHistory(entry)}
                  title={entry.prompt}   // full text on hover
                >
                  {/* Truncate long prompts to ~25 chars */}
                  <p>{entry.prompt.length > 25
                      ? entry.prompt.slice(0, 25) + "..."
                      : entry.prompt}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className='bottom'>
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="" />
          {extended ? <p>Help</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="" />
          {extended ? <p>Activity</p> : null}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="" />
          {extended ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
