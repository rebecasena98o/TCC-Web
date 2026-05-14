import { useState } from 'react'
import WorkCard from './WorkCard/WorkCard.jsx'
import '../../../../Style/Librarian/StyleWorkQueue.css'

const typeMap = {
    "PENDENTE":  "Pendente",
    "CORRECAO":  "Em Correção",
    "AJUSTES":   "Ajustes Necessários",
    "APROVADO":  "Aprovado",
}

const filterOptions = ["Todos", "Pendente", "Em Correção", "Ajustes Necessários", "Aprovado"]

function WorkQueue({ tickets, onSelect, selectedTicket }) {
    const [filter, setFilter] = useState("Todos")

    const filtered = tickets.filter(t =>
        filter === "Todos" ? true : typeMap[t.type] === filter
    )

    return (
        <div className="workQueue">
            <h2 className="workQueueTitle">Fila de Trabalho</h2>
            <select className="workQueueSelect" value={filter} onChange={e => setFilter(e.target.value)}>
                {filterOptions.map(opt => (<option key={opt} value={opt}>{opt}</option>))}
            </select>
            <div className="workQueueList">
                {filtered.map((ticket, index) => (
                    <WorkCard
                        key={index}
                        ticket={{ ...ticket, type: typeMap[ticket.type] }}
                        onSelect={onSelect}
                        isSelected={selectedTicket?.user === ticket.user && selectedTicket?.title === ticket.title}
                    />
                ))}
            </div>
        </div>
    )
}

export default WorkQueue