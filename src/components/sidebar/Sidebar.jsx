import React, { useState, useEffect, useContext } from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'

const Sidebar = () => {
  const [extended, setExtended] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const { chatHistory, currentChatId, loadHistory, newChat } = useContext(Context)

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      if (!mobile) setExtended(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const closeSidebar = () => setExtended(false)
  const toggleSidebar = () => setExtended(prev => !prev)

  return (
    <>
      {isMobile && extended && (
        <div className="sidebar-overlay" onClick={closeSidebar} />
      )}

      {isMobile && !extended && (
        <button
          className="sidebar-hamburger"
          onClick={toggleSidebar}
          aria-label="Open sidebar"
        >
          <img src={assets.menu_icon} alt="" />
        </button>
      )}

      <div className={`sidebar ${extended ? 'sidebar-open' : ''} ${isMobile ? 'sidebar-mobile' : ''}`}>
        <div className='top'>
          <img
            onClick={toggleSidebar}
            className='menu'
            src={assets.menu_icon}
            alt="toggle sidebar"
          />

          <div className='new-chat' onClick={newChat}>
            <img src={assets.plus_icon} alt="new chat" />
            {extended && <p>New Chat</p>}
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

                {chatHistory.map((session) => (
                  <div
                    key={session.id}
                    className={`recent-entry ${session.id === currentChatId ? 'active' : ''}`}
                    onClick={() => loadHistory(session)}
                    title={session.title}
                  >
                    <p>{session.title.length > 25
                        ? session.title.slice(0, 25) + '...'
                        : session.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className='bottom'>
          <div className="bottom-item recent-entry">
            <img src={assets.question_icon} alt="help" />
            {extended && <p>Help</p>}
          </div>
          <div className="bottom-item recent-entry">
            <img src={assets.history_icon} alt="activity" />
            {extended && <p>Activity</p>}
          </div>
          <div className="bottom-item recent-entry">
            <img src={assets.setting_icon} alt="settings" />
            {extended && <p>Settings</p>}
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar