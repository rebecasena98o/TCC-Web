import Message from './Message/Message.jsx'
import '../../../../../Style/Librarian/StyleMessageList.css'

function MessageList({ messages }) {
    return (
        <div className="messageList">
            {messages.map((msg, index) => (<Message key={index} message={msg} />))}
        </div>
    )
}

export default MessageList