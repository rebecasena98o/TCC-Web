import '../../../../../../Style/Librarian/StyleMessage.css'

function Message({ message }) {
    return (
        <div className={`message ${message.fromMe ? 'messageRight' : 'messageLeft'}`}>
            <div className="messageBubble">
                <span className="messageText">{message.text}</span>
                <span className="messageTime">{message.time}</span>
            </div>
        </div>
    )
}

export default Message