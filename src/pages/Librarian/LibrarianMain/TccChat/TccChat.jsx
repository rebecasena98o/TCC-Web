import { useState } from 'react'
import MessageList from './MessageList/MessageList.jsx'
import '../../../../Style/Librarian/StyleTccChat.css'

function TccChat({ messages, onSend }) {
    const [input, setInput] = useState('')

    const handleSend = () => {
        if (!input.trim()) return
        onSend(input.trim())
        setInput('')
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSend()
    }

    return (
        <div className="tccChat">
            <div className="tccChatMessages">
                <MessageList messages={messages} />
            </div>
            <div className="tccChatInput">
                <input
                    type="text"
                    placeholder="Digite sua mensagem..."
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button onClick={handleSend}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                        <path d="M240-400h320v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z"/>
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default TccChat