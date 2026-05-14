import StatsCards from './StatsCards/StatsCards.jsx'
import '../../../Style/Librarian/StyleQuickStats.css'

function QuickStatsList({cardInfos}) {
    return (
        <div className="quickStatsList">
            {cardInfos.map((card, index) => (
                <StatsCards key={index} info={card} />
            ))}
        </div>
    )
}

export default QuickStatsList