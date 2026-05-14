import { useState } from 'react'
import WorkQueue from './WorkQueue/WorkQueue.jsx'
import TccAnalysis from './TccAnalysis/TccAnalysis.jsx'
import '../../../Style/Librarian/StyleLibrarianMain.css'

function LibrarianMain({ tickets }) {
    const [selectedTicket, setSelectedTicket] = useState(null)

    return (
        <div className="librarianMain">
            <WorkQueue tickets={tickets} onSelect={setSelectedTicket} selectedTicket={selectedTicket} />
            {selectedTicket && (
                <TccAnalysis ticket={selectedTicket} />
            )}
        </div>
    )
}

export default LibrarianMain