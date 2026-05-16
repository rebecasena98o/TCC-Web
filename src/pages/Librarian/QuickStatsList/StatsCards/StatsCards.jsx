import '../../../../Style/Librarian/StyleStatsCards.css'

function StatsCards({info}){
    return(
        <>
        <div className="containerCard">
            <div className="textValueCollumn">
                <div className="textStats">
                    {info.name}
                </div>
                <div className="valueStats">
                    {info.value}
                </div>
            </div>
            <div className="svg-icon-container" style={{ color: info.color }}>
                {info.svg}
            </div>
        </div>
        </>
    )
}

export default StatsCards;
