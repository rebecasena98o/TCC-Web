import '../../Style/Librarian/StyleLibrarianQueue.css'
import Header from  '../../Components/Header.jsx'
import QuickStatsList from './QuickStatsList/QuickStatsList.jsx'
import WorkQueue from './LibrarianMain/WorkQueue/WorkQueue.jsx'
import TccAnalysis from './LibrarianMain/TccAnalysis/TccAnalysis.jsx'
import LibrarianMain from './LibrarianMain/LibrarianMain.jsx'

function LibrarianQueue() {

    const userInfo = {
        name: "testeName",
        email: "admin@email.com"
    }

    const cardInfos = [
        {
            name: "Pendentes",
            value: 1,
            svg: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z"/></svg>,
            color: "#888"
        },
        {
            name: "Em Correção",
            value: 1,
            svg: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M320-440h320v-80H320v80Zm0 120h320v-80H320v80Zm0 120h200v-80H320v80ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z"/></svg>,
            color: "#2196F3"
        },
        {
            name: "Ajustes Necessários",
            value: 1,
            svg: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M508.5-291.5Q520-303 520-320t-11.5-28.5Q497-360 480-360t-28.5 11.5Q440-337 440-320t11.5 28.5Q463-280 480-280t28.5-11.5ZM440-440h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>,
            color: "#FFC107"
        },
        {
            name: "Aprovados",
            value: 1,
            svg: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>,
            color: "#4CAF50"
        },
    ]

    const tickets = [
        {
            user: "Maria Silva",
            title: "Análise de Sistemas de Informação na Gestão Empresarial",
            version: 2,
            sentDate: "2026-04-15",
            type: "AJUSTES"
        },
        {
            user: "João Santos",
            title: "Impactos da Inteligência Artificial no Mercado de Trabalho",
            version: 1,
            sentDate: "2026-04-28",
            type: "PENDENTE"
        },
        {
            user: "Ana Costa",
            title: "Sustentabilidade e Responsabilidade Social Corporativa",
            version: 1,
            sentDate: "2026-04-27",
            type: "CORRECAO"
        },
        {
            user: "Pedro Oliveira",
            title: "Marketing Digital e Comportamento do Consumidor",
            version: 3,
            sentDate: "2026-04-10",
            type: "APROVADO"
        }
    ]

    const testTicket = {
        user: "Maria Silva",
        title: "Análise de Sistemas de Informação na Gestão Empresarial",
        type: "Ajustes Necessários",
        version: 2
    }

    return (
        <div className="librarianQueue">
        <Header user={userInfo}/>
        {/* <QuickStatsList cardInfos={cardInfos}/> */}
        <LibrarianMain tickets={tickets} />
        </div>
    )
}

export default LibrarianQueue