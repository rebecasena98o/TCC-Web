import '../../../../Style/Librarian/StyleWorkOption.css'

function WorkOption({ selected, onSelect, chatCount = 0 }) {
    return (
        <div className="workOption">
            <button
                className={`workOptionBtn ${selected === 'revisao' ? 'workOptionSelected' : ''}`}
                onClick={() => onSelect('revisao')}
            >
                Revisão
            </button>
            <button
                className={`workOptionBtn ${selected === 'chat' ? 'workOptionSelected' : ''}`}
                onClick={() => onSelect('chat')}
            >
                Chat
                {chatCount > 0 && (
                    <span className="workOptionBadge">{chatCount}</span>
                )}
            </button>
        </div>
    )
}

export default WorkOption