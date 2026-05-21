import { useState } from 'react'
import WorkOption from '../WorkOption/WorkOption.jsx'
import '../../../../Style/Librarian/StyleTccAnalysis.css'
import TccChat from '../TccChat/TccChat.jsx'

const statusConfig = {
    "Pendente":{
        color: "#fff", 
        bg: "rgb(106, 113, 129)",
        svg: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z"/></svg>
    },
    "Em Correção":{
        color: "#fff",
        bg: "rgb(44, 126, 254)",
        svg: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M320-440h320v-80H320v80Zm0 120h320v-80H320v80Zm0 120h200v-80H320v80ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z"/></svg>
    },
    "Ajustes Necessários":{
        color: "#fff",
        bg: "rgb(240, 177, 1)",
        svg: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M508.5-291.5Q520-303 520-320t-11.5-28.5Q497-360 480-360t-28.5 11.5Q440-337 440-320t11.5 28.5Q463-280 480-280t28.5-11.5ZM440-440h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
    },
    "Aprovado":{
        color: "#fff",
        bg: "rgb(0, 201, 79)",
        svg: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
    },
}

const typeMap = {
    "PENDENTE": "Pendente",
    "CORRECAO": "Em Correção",
    "AJUSTES":  "Ajustes Necessários",
    "APROVADO": "Aprovado",
}

const statusKeys = ["Pendente", "Em Correção", "Ajustes Necessários", "Aprovado"]

function TccAnalysis({ ticket }) {
    const [option, setOption] = useState('revisao')
    const [currentStatus, setCurrentStatus] = useState(typeMap[ticket.type])
    const [feedback, setFeedback] = useState('')
    const [messages, setMessages] = useState([
        {
            text: "Exemplo de Mensagem",
            time: new Date().toLocaleString('pt-BR'),
            fromMe: true
        }
    ])
    
    const handleSend = (text) => {
        setMessages(prev => [...prev, {
            text,
            time: new Date().toLocaleString('pt-BR'),
            fromMe: true
        }])
    }

    const status = statusConfig[currentStatus]

    return (
        <div className="tccAnalysis">
            <WorkOption selected={option} onSelect={setOption} chatCount={messages.length}/>

            {option === 'revisao' && (
                <div className="tccAnalysisContent">
                    <div className="tccAnalysisUser">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                            <path d="M40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm720 0v-120q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v120H760ZM247-527q-47-47-47-113t47-113q47-47 113-47t113 47q47 47 47 113t-47 113q-47 47-113 47t-113-47Zm466 0q-47 47-113 47-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81q0-42-14.5-81T544-792q14-5 28-6.5t28-1.5q66 0 113 47t47 113q0 66-47 113ZM120-240h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm296.5-343.5Q440-607 440-640t-23.5-56.5Q393-720 360-720t-56.5 23.5Q280-673 280-640t23.5 56.5Q327-560 360-560t56.5-23.5ZM360-240Zm0-400Z"/>
                        </svg>
                        <span>{ticket.user}</span>
                    </div>

                    <h2 className="tccAnalysisTitle">{ticket.title}</h2>
                    <p className="tccAnalysisMeta">Versão {ticket.version} • Enviado em {ticket.sentDate}</p>

                    <h4 className="tccAnalysisSectionTitle">Alterar Status</h4>
                    <div className="tccAnalysisStatusList">
                        {statusKeys.map(key => {
                            const s = statusConfig[key]
                            const isSelected = currentStatus === key
                            return (
                                <button
                                    key={key}
                                    className={`tccStatusBtn ${isSelected ? 'tccStatusBtnActive' : ''}`}
                                    onClick={() => setCurrentStatus(key)}
                                    style={isSelected ? { backgroundColor: s.bg, color: s.color, borderColor: s.bg } : {}}
                                >
                                    <span className="tccStatusBtnSvg">{s.svg}</span>
                                    {key}
                                </button>
                            )
                        })}
                    </div>

                    <h4 className="tccAnalysisSectionTitle">Feedback para o Aluno</h4>
                    <textarea
                        className="tccAnalysisTextarea"
                        placeholder="Digite aqui os comentários e orientações para o aluno..."
                        value={feedback}
                        onChange={e => setFeedback(e.target.value)}
                    />

                    <button className="tccBtnSave">Salvar Feedback</button>

                        <div className="tccAnalysisBtnRow">
                            <button className="tccBtnDownload">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"/></svg>
                                Baixar TCC Original
                            </button>
                            <button className="tccBtnUpload">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M440-320v-326L336-542l-56-58 200-200 200 200-56 58-104-104v326h-80ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"/></svg>
                                Enviar Versão Corrigida
                            </button>
                            <button className="tccBtnIa">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                                    <path d="M160-360q-50 0-85-35t-35-85q0-50 35-85t85-35v-80q0-33 23.5-56.5T240-760h120q0-50 35-85t85-35q50 0 85 35t35 85h120q33 0 56.5 23.5T800-680v80q50 0 85 35t35 85q0 50-35 85t-85 35v160q0 33-23.5 56.5T720-120H240q-33 0-56.5-23.5T160-200v-160Zm242.5-97.5Q420-475 420-500t-17.5-42.5Q385-560 360-560t-42.5 17.5Q300-525 300-500t17.5 42.5Q335-440 360-440t42.5-17.5Zm240 0Q660-475 660-500t-17.5-42.5Q625-560 600-560t-42.5 17.5Q540-525 540-500t17.5 42.5Q575-440 600-440t42.5-17.5ZM320-280h320v-80H320v80Zm-80 80h480v-480H240v480Zm240-240Z"/>
                                </svg>
                                Auxilio IA
                            </button>
                        </div>
                    </div>
            )}

            {option === 'chat' && (
                <div className="tccAnalysisContent">
                        <TccChat messages={messages} onSend={handleSend} />
                </div>
            )}
        </div>
    )
}

export default TccAnalysis